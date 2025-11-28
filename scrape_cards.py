import requests
from bs4 import BeautifulSoup
import re

url = "https://www.moneyhero.com.hk/zh/credit-card/best-deal"
headers = {"User-Agent": "Mozilla/5.0"}

try:
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all images
    images = soup.find_all('img')
    
    found_cards = []
    
    # Heuristic: Look for images with alt text matching card names or src containing card names
    keywords = {
        "visa-signature": "HSBC Visa Signature",
        "everymile": "HSBC EveryMile",
        "red": "HSBC Red",
        "mmpower": "MMPower",
        "wakuwaku": "Wakuwaku",
        "earmore": "EarnMORE",
        "smart": "SC Smart",
        "eminent": "DBS Eminent",
        "chill": "BOC Chill",
        "rewards": "Citi Rewards"
    }
    
    for img in images:
        src = img.get('src', '')
        alt = img.get('alt', '').lower()
        
        if not src.startswith('http'):
            continue
            
        for key, name in keywords.items():
            if key in src.lower() or key in alt:
                found_cards.append(f"{name}: {src}")
                
    for card in set(found_cards):
        print(card)
        
except Exception as e:
    print(f"Error: {e}")



