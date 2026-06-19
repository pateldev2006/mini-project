import os
import sys
import webview

def main():
    # Resolve absolute path to index.html in the same folder as this script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    html_path = os.path.join(current_dir, 'index.html')
    
    # Check if index.html exists
    if not os.path.exists(html_path):
        print(f"Error: Could not find index.html at {html_path}", file=sys.stderr)
        sys.exit(1)
        
    print(f"Launching desktop app wrapper from: {html_path}")
    
    # Create the native desktop window
    window = webview.create_window(
        title='FinSight AI — Desktop App',
        url=html_path,
        width=1280,
        height=800,
        min_size=(960, 600),
        resizable=True
    )
    
    # Start the webview loop
    webview.start()

if __name__ == '__main__':
    main()
