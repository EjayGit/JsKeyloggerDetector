from bs4 import BeautifulSoup
import requests
from urllib.parse import urljoin
import re

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
jsResponse = requests.get(src)
# print(jsResponse.text)

# Find keywords such as 'keyup' and 'keydown', or letters encapsulated by ''.
# test = 'fetc the "w"ater"'
pattern = r'(keyDown|keyUp|keyPress|fetch|endpoint|((\'|\")[a-zA-Z](\'|\")))'
if re.search(pattern, test):
    print('Match')
else:
    print('No match')
