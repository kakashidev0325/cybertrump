import pathlib
root = pathlib.Path(r"E:\pack\solana\mouse cat")
for name in ["index.html", "assets/index-AdguHs_O.js"]:
    text = (root / name).read_text(encoding="utf-8")
    i = text.find("styles-DqN936aP.css")
    print(name, i, text[i-80:i+40])
