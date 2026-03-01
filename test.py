import requests
import time

url = "http://127.0.0.1:8000/api/v1/process"
data = {"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
print("Submitting to processing API...")
r = requests.post(url, data=data).json()
jid = r.get("job_id")
if not jid:
    print("Failed to get job ID:", r)
    exit(1)

print("Job ID:", jid)
status = "queued"
while status in ["queued", "downloading", "transcribing", "summarizing"]:
    time.sleep(3)
    status_res = requests.get(f"http://127.0.0.1:8000/api/v1/status/{jid}").json()
    status = status_res.get("status")
    print("Status:", status_res)

if status == "completed":
    print("DONE! Fetching result...")
    res = requests.get(f"http://127.0.0.1:8000/api/v1/result/{jid}").json()
    print("Short Summary:", res.get("summary_short"))
else:
    print("Job Failed!")
