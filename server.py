import sys
import json
import urllib.request
import urllib.parse
import gzip
import re
import os
from http.server import SimpleHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn

def load_env():
    env_data = {}
    for path in ['.env', '../.env', '../../.env']:
        if os.path.exists(path):
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    for line in f:
                        if '=' in line and not line.strip().startswith('#'):
                            k, v = line.strip().split('=', 1)
                            env_data[k.strip()] = v.strip()
            except Exception as e:
                print(f"Error loading env from {path}: {e}")
            break
    return env_data

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

class CustomRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path == '/api/stock':
            query_params = urllib.parse.parse_qs(parsed_url.query)
            symbol = query_params.get('symbol', ['AAPL'])[0].upper()
            
            try:
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                    'Accept-Encoding': 'gzip, deflate',
                }
                
                # 1. Fetch chart data (contains Price, 52W High/Low, Volume, Currency, Company Name, and History)
                chart_url = f"https://query2.finance.yahoo.com/v8/finance/chart/{symbol}?range=1mo&interval=1d"
                chart_data = {}
                try:
                    chart_req = urllib.request.Request(chart_url, headers=headers)
                    with urllib.request.urlopen(chart_req) as response:
                        data = response.read()
                        if response.info().get('Content-Encoding') == 'gzip' or data.startswith(b'\x1f\x8b'):
                            data = gzip.decompress(data)
                        chart_data = json.loads(data.decode('utf-8'))
                except Exception as e:
                    raise Exception(f"Failed to fetch stock metadata: {str(e)}")
                
                result = {
                    'symbol': symbol,
                    'companyName': None,
                    'price': None,
                    'marketCap': None,
                    'volume': None,
                    'high52': None,
                    'low52': None,
                    'peRatio': None,
                    'currency': 'USD',
                    'history': []
                }
                
                # Parse Chart Response
                if chart_data.get('chart', {}).get('result'):
                    c = chart_data['chart']['result'][0]
                    meta = c.get('meta', {})
                    result['companyName'] = meta.get('longName') or meta.get('shortName') or symbol
                    result['price'] = meta.get('regularMarketPrice')
                    result['volume'] = meta.get('regularMarketVolume')
                    result['high52'] = meta.get('fiftyTwoWeekHigh')
                    result['low52'] = meta.get('fiftyTwoWeekLow')
                    result['currency'] = meta.get('currency', 'USD')
                    
                    closes = c.get('indicators', {}).get('quote', [{}])[0].get('close', [])
                    # Filter out null values from closing prices
                    result['history'] = [x for x in closes if x is not None]
                else:
                    err_msg = chart_data.get('chart', {}).get('error', {}).get('description') or "Symbol not found"
                    raise Exception(err_msg)
                
                # 2. Fetch HTML page to scrape remaining fields (Market Cap, P/E Ratio)
                try:
                    html_url = f"https://finance.yahoo.com/quote/{symbol}"
                    html_req = urllib.request.Request(html_url, headers=headers)
                    with urllib.request.urlopen(html_req) as response:
                        data = response.read()
                        if response.info().get('Content-Encoding') == 'gzip' or data.startswith(b'\x1f\x8b'):
                            data = gzip.decompress(data)
                        html_data = data.decode('utf-8')
                    
                    # Scrape Market Cap
                    m_cap = re.search(r'"marketCap"[^>]*>([^<]+)', html_data)
                    if m_cap:
                        result['marketCap'] = m_cap.group(1).strip()
                    
                    # Scrape P/E Ratio
                    m_pe = re.search(r'"trailingPE"[^>]*>([^<]+)', html_data)
                    if m_pe:
                        pe_val = m_pe.group(1).strip()
                        if pe_val != '--':
                            try:
                                result['peRatio'] = float(pe_val.replace(',', ''))
                            except ValueError:
                                result['peRatio'] = pe_val
                except Exception as e:
                    # Non-fatal if HTML scraper fails, we will return what we got from the chart API
                    print(f"Scraper error for {symbol}: {e}")
                
                if result['price'] is None:
                    raise Exception("Could not retrieve stock price")
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(result).encode('utf-8'))
                
            except Exception as e:
                import traceback
                traceback.print_exc()
                self.send_response(404)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                error_response = json.dumps({'error': str(e)}).encode('utf-8')
                self.wfile.write(error_response)
        elif parsed_url.path == '/api/search':
            query_params = urllib.parse.parse_qs(parsed_url.query)
            q = query_params.get('q', [''])[0]
            
            try:
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                    'Accept-Encoding': 'gzip, deflate',
                }
                
                search_url = f"https://query2.finance.yahoo.com/v1/finance/search?q={urllib.parse.quote(q)}"
                search_req = urllib.request.Request(search_url, headers=headers)
                with urllib.request.urlopen(search_req) as response:
                    data = response.read()
                    if response.info().get('Content-Encoding') == 'gzip' or data.startswith(b'\x1f\x8b'):
                        data = gzip.decompress(data)
                    search_res = json.loads(data.decode('utf-8'))
                
                suggestions = []
                for quote in search_res.get('quotes', []):
                    symbol = quote.get('symbol')
                    name = quote.get('longname') or quote.get('shortname') or symbol
                    exch = quote.get('exchange')
                    quote_type = quote.get('quoteType')
                    if symbol and quote_type in ['EQUITY', 'ETF']:
                        suggestions.append({
                            'symbol': symbol,
                            'name': name,
                            'exchange': exch
                        })
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(suggestions).encode('utf-8'))
                
            except Exception as e:
                import traceback
                traceback.print_exc()
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                error_response = json.dumps({'error': str(e)}).encode('utf-8')
                self.wfile.write(error_response)
        else:
            # Fallback to serving static files
            super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path == '/api/chat':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                req_body = json.loads(post_data.decode('utf-8'))
                prompt = req_body.get('prompt', '')
                context = req_body.get('context', {})
                
                # Check Authorization header for client-provided API key
                auth_header = self.headers.get('Authorization', '')
                api_key = None
                if auth_header.startswith('Bearer '):
                    api_key = auth_header.split(' ', 1)[1].strip()
                
                if not api_key:
                    # Fallback to server env
                    env_vars = load_env()
                    api_key = env_vars.get('GEMINI_API_KEY') or os.environ.get('GEMINI_API_KEY')
                
                if not api_key:
                    # Return error showing key is missing, so client can prompt for it
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        'reply': "### 🔑 Google Gemini API Key Required\nTo unlock the full potential of your AI Advisor and receive real-time personalized analysis of stocks and funds, please add your Google Gemini API key.\n\n**How to obtain a key:**\n1. Go to [Google AI Studio](https://aistudio.google.com/) and create a free API key.\n2. Click the **🔑 Configure API Key** button in the top right of this chat to save it instantly.",
                        'key_missing': True
                    }).encode('utf-8'))
                    return
                
                # Build context strings
                savings_items = context.get('savings', [])
                savings_str = ", ".join([f"{s.get('name')}: ₹{s.get('balance'):,.2f} (Yield: {s.get('returnRate')}%" + (f", Progress: {s.get('progress')}%" if s.get('progress') else "") + ")" for s in savings_items])
                
                budget_items = context.get('budgets', [])
                budgets_str = ", ".join([f"{b.get('label')}: Spent ₹{b.get('spent'):,.2f} of ₹{b.get('limit'):,.2f} cap" for b in budget_items])
                
                tx_items = context.get('transactions', [])
                recent_txs = "\n".join([f"- {t.get('date')}: {t.get('description')} ({t.get('category')}) {t.get('amount')} {t.get('type')}" for t in tx_items[:12]])
                
                full_prompt = f"""You are FinSight Advisor, an advanced institutional-grade AI financial assistant.
The user's current financial portfolio metrics are:
- Linked Accounts / Savings Products: {savings_str or 'None'}
- Category Budgets: {budgets_str or 'None'}
- Recent Transaction History:
{recent_txs or 'None'}

User Question: {prompt}

Provide a detailed, accurate, and professional response. 
- If the user asks about stocks, mutual funds, SIPs, or exchange rates, provide analytical recommendations, risk management advice, and explain key metrics (like P/E, 52W range, growth projections).
- Format your response beautifully using markdown (lists, bold headers, code snippets, or tables where appropriate).
- Always use Indian Rupees (₹) for values if most transactions are in rupees.
- Give a strategic recommendation at the end of your analysis.
"""
                
                # Call Gemini API
                gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                gemini_payload = {
                    "contents": [{
                        "parts": [{"text": full_prompt}]
                    }]
                }
                
                headers = {"Content-Type": "application/json"}
                gemini_req = urllib.request.Request(
                    gemini_url,
                    data=json.dumps(gemini_payload).encode('utf-8'),
                    headers=headers,
                    method='POST'
                )
                
                with urllib.request.urlopen(gemini_req) as response:
                    resp_bytes = response.read()
                    resp_json = json.loads(resp_bytes.decode('utf-8'))
                    
                    # Extract text reply
                    reply = ""
                    if resp_json.get('candidates') and len(resp_json['candidates']) > 0:
                        candidate = resp_json['candidates'][0]
                        if candidate.get('content') and candidate['content'].get('parts'):
                            parts = candidate['content']['parts']
                            reply = "".join([p.get('text', '') for p in parts])
                    
                    if not reply:
                        reply = "I parsed the response but could not retrieve a text answer. Please try again."
                        
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'reply': reply}).encode('utf-8'))
                    
            except Exception as e:
                import traceback
                traceback.print_exc()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'reply': f"### ❌ AI Integration Error\nFailed to connect to Gemini API. Details: `{str(e)}`"}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    port = 3000
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    
    server = ThreadedHTTPServer(('0.0.0.0', port), CustomRequestHandler)
    print(f"Starting multi-threaded server with API proxy on port {port}...")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        server.server_close()
