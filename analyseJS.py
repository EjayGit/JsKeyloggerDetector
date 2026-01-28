from bs4 import BeautifulSoup
import requests
from urllib.parse import urljoin
import re

# Identify website for analysis.
url = 'https://week-08-iota.vercel.app/'
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

# Find keywords such as 'keyup' and 'keydown', or letters encapsulated by ''.
# test = 'fetc the "w"ater"'
pattern = r'(keyDown|keyUp|keyPress|onkeydown|onkeyup|onkeypress)'
matches = ''
matches = re.findall(pattern, jsResponse.text)
if matches:
    print(matches)
else:
    print('No match')
