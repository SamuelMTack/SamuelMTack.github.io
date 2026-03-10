from PIL import Image

src_path = r"C:\Users\samue\.gemini\antigravity\brain\35a17d74-b99b-45a3-a4b6-9a60a12d406d\simple_notes_app_icon_final.png"
dst_path = r"C:\Users\samue\.gemini\antigravity\brain\24190b37-a8fc-4052-8107-4cfee34a4246\simple_notes_icon_512.png"

try:
    img = Image.open(src_path)
    img = img.resize((512, 512), Image.Resampling.LANCZOS)
    img.save(dst_path)
    print(f"Success! Resized and saved to {dst_path}")
except Exception as e:
    print(f"Error: {e}")
