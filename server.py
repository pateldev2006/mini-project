import sys
import json
import urllib.request
import urllib.parse
import gzip
import re
from http.server import SimpleHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

class CustomRequestHandler(SimpleHTTPRequestHandler):
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
        else:
            # Fallback to serving static files
            super().do_GET()

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
