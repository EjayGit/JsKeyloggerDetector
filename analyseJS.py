from bs4 import BeautifulSoup
import requests
from urllib.parse import urljoin

# Identify website for analysis.
url = 'https://erikjclark.co.uk'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'lxml')
# Extract the JS/JSX file using bs4.
scripts = soup.find_all('script')
for script in scripts:
    print(script)
    if script.get('src'):
        src = urljoin(url,script['src'])
        print(src)
        
# Parse the JS/JSX file.

# Find keywords such as 'keyup' and 'keydown', or letters encapsulated by ''.
