import uvicorn
import os
import sys
import webbrowser
import time
import threading

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))

def open_browser():
    time.sleep(1.5)
    print("Opening CampusPulse in your web browser...")
    webbrowser.open("http://127.0.0.1:8000")

if __name__ == "__main__":
    print("=" * 60)
    print("  CAMPUSPULSE – COLLEGE EVENT MANAGEMENT SYSTEM")
    print("  Starting FastAPI Backend & Single-Page Application...")
    print("=" * 60)
    
    # Launch browser in a background thread
    threading.Thread(target=open_browser, daemon=True).start()
    
    # Start Uvicorn Server
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True, app_dir="backend")

