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

def main():
    port = 3000
    
    # Start the server if it's not already running
    if not is_port_in_use(port):
        t = threading.Thread(target=start_local_server, args=(port,))
        t.daemon = True
        t.start()
        time.sleep(0.5)  # Give the server a split second to bind
        
    print(f"Launching desktop app wrapper pointing to: http://localhost:{port}")
    
    # Create the native desktop window pointing to the localhost server
    window = webview.create_window(
        title='FinSight AI — Desktop App',
        url=f'http://localhost:{port}',
        width=1280,
        height=800,
        min_size=(960, 600),
        resizable=True
    )
    
    # Start the webview loop
    webview.start()

if __name__ == '__main__':
    main()
