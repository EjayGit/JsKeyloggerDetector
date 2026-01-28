from bs4 import BeautifulSoup
import requests
from urllib.parse import urljoin
import re

def jsScanner(url):
    # Get website for analysis.
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'lxml')

    # Extract the JS/JSX file using bs4.
    scripts = soup.find_all('script')
    for script in scripts:
        # print(script)
        if script.get('src'):
            src = urljoin(url,script['src'])
            # print(src)
    jsResponse = requests.get(src)
    # print(jsResponse.text)

    # Find keywords such as 'keyup' and 'keydown'.
    pattern = r'(keyDown|keyUp|keyPress|onkeydown|onkeyup|onkeypress)'
    matches = ''
    matches = re.findall(pattern, jsResponse.text)
    if matches:
        print(matches)
    else:
        print('No match')

url = input('Enter the website you would like to be scanned: ')
jsScanner(url)
