import requests
url = 'http://localhost:8080/'
r = requests.post(url,json={'exp':1.8,})
print(r.json())