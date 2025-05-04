import sys
import json
from yt_dlp import YoutubeDL

def get_video_info(url):
    try:
        ydl_opts = {"quiet": True, "skip_download": True}
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            result = {
                "title": info.get("title"),
                "thumbnail": info.get("thumbnail"),
                "formats": [
                    {
                        "format_id": f["format_id"],
                        "ext": f["ext"],
                        "quality": f.get("format_note", ""),
                        "download_url": f["url"]
                    } for f in info["formats"] if f.get("url")
                ]
            }
            print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    url = sys.argv[1]
    get_video_info(url)
