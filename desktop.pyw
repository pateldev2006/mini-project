import os
import sys
import webview
import socket
import threading
import time

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

def start_local_server(port):
    # Change directory to the app's folder to serve files correctly
    current_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(current_dir)
    
    from server import ThreadedHTTPServer, CustomRequestHandler
    server = ThreadedHTTPServer(('127.0.0.1', port), CustomRequestHandler)
    print(f"Starting local background server on port {port}...")
    server.serve_forever()

def find_free_port(start_port=3000):
    port = start_port
    while port < 4000:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', port)) != 0:
                return port
        port += 1
    return start_port
def is_our_server(port):
    import urllib.request
    try:
        with urllib.request.urlopen(f'http://127.0.0.1:{port}/', timeout=1) as r:
            return r.status == 200
    except Exception:
        return False

def main():
    port = 3000
    start_server = True
    
    if is_port_in_use(port):
        if is_our_server(port):
            print(f"FinSight server is already running on port {port}. Reusing the active process.")
            start_server = False
        else:
            print(f"Port {port} is occupied by another application. Finding a free fallback port...")
            port = find_free_port(3001)
            
    if start_server:
        # Start the server on the discovered free port in a background thread
        t = threading.Thread(target=start_local_server, args=(port,))
        t.daemon = True
        t.start()
        
        # Wait up to 5 seconds for the server to start listening
        server_ready = False
        for _ in range(50):
            if is_port_in_use(port):
                server_ready = True
                time.sleep(0.8)  # Let the HTTP server fully stabilize before loading page
                break
            time.sleep(0.1)
            
        if not server_ready:
            print("[ERROR] Local background server failed to start in time.")
        
    print(f"Launching desktop app wrapper pointing to: http://127.0.0.1:{port}")
    
    # Create the native desktop window pointing to the localhost server
    window = webview.create_window(
        title='FinSight AI — Desktop App',
        url=f'http://127.0.0.1:{port}',
        width=1280,
        height=800,
        min_size=(960, 600),
        resizable=True
    )
    
    # Define a custom directory for user data in Windows APPDATA to persist localStorage
    appdata_dir = os.environ.get('APPDATA')
    if appdata_dir:
        storage_path = os.path.join(appdata_dir, 'FinSightAI')
    else:
        # Fallback to local directory if APPDATA is missing
        storage_path = os.path.abspath('user_data')

    # Prevent WebView2 "The requested resource is in use" (0x800700AA) lock conflicts
    lock_file = os.path.join(storage_path, 'EBWebView', 'lockfile')
    if os.path.exists(lock_file):
        try:
            os.remove(lock_file)
        except Exception:
            # If the lockfile is currently held by a zombie/other process, use a PID-specific UDF fallback
            storage_path = f"{storage_path}_{os.getpid()}"
            print(f"[INFO] Storage path locked. Falling back to dynamic profile: {storage_path}")

    # Start the webview loop with persistence and debug/loopback-bypass enabled
    webview.start(private_mode=False, storage_path=storage_path, debug=True)

if __name__ == '__main__':
    main()
