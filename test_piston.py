import requests
urls = [
    "https://emkc.org/api/v2/piston/execute",
    "https://piston.codes/api/v2/execute",
    "https://api.piston.rs/execute",
    "https://piston.pterodactyl.io/api/v2/execute",
    "https://piston.godbolt.org/api/v2/execute",
    "https://emkc.org/api/v2/piston/execute",
    "http://piston.pydis.com/api/v2/execute",
]
for url in urls:
    try:
        r = requests.post(url, json={"language": "python", "version": "3.10.0", "files": [{"content": "print(1)"}]}, timeout=3)
        print(url, r.status_code, r.text[:50])
    except Exception as e:
        print(url, "failed")
