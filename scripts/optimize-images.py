"""Create responsive WebP derivatives of the original photos used by the site.

Originals in docs/source-audit/assets/images are never modified. Run with:
    npm run images
"""
import csv
import hashlib
import io
import json
import os

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "docs", "source-audit")
OUT = os.path.join(ROOT, "public", "images")
MANIFEST = os.path.join(ROOT, "lib", "images.json")
WIDTHS = [480, 960, 1600]
QUALITY = 74

# Images that never display large (or never small) only get the sizes browsers
# actually pick for them, measured across 320-1920px viewports at 1x-3x density.
WIDTH_OVERRIDES = {
    "aseman-shelter": [960, 1600],
    "two-friends": [960, 1600],
    "hero-poodle-hug": [480],
    **{key: [480, 960] for key in [
        "first-hello", "hero-white-puppy", "jungle-cuddle", "namaste", "nap-together",
        "puppy-bw", "puppy-kisses", "puppy-on-face", "savasana",
    ]},
}

# key: (manifest row index, alt text)
PHOTOS = {
    "hero-laugh": (3, "A guest laughing as a puppy climbs onto her head during a session"),
    "hero-white-puppy": (51, "A fluffy white rescue puppy looking up at the camera"),
    "hero-poodle-hug": (95, "A guest holding a curly-haired puppy against her cheek by the pool"),
    "pool-pack": (89, "A guest kneeling by the pool, surrounded by playful rescue puppies"),
    "aseman-shelter": (37, "Dogs resting under a wooden pavilion at the Aseman Bali Dog Association shelter"),
    "puppy-bw": (1, "A black and white puppy resting its chin on a cushion"),
    "canggu-stretch": (4, "A guest stretching beside the pool in Canggu while puppies wander around her mat"),
    "ubud-shala": (105, "A guest on her mat in the open-air jungle yoga shala in Ubud with puppies nearby"),
    "ubud-lunge": (26, "A guest in a low lunge in the Ubud shala, two puppies playing on the floor"),
    "ubud-play": (16, "A guest reaching toward a puppy on the wooden floor of the Ubud shala"),
    "puppy-on-face": (46, "A guest lying on her back, laughing, with a puppy resting on her forehead"),
    "golden-puppy": (72, "A guest raising her arms while a golden puppy walks across her mat"),
    "jungle-cuddle": (93, "A guest cheering with a puppy in her arms among tropical plants"),
    "nap-together": (57, "A guest resting her head next to a sleepy puppy on a yoga mat"),
    "first-hello": (0, "A guest greeting a small puppy that is reaching up from her lap"),
    "namaste": (35, "A smiling guest with her hands together while a puppy sits on her mat"),
    "two-friends": (63, "Two friends each cuddling a puppy"),
    "pool-hug": (15, "A guest hugging a puppy wearing a little bandana beside the pool"),
    "puppy-kisses": (82, "A guest lying on her mat getting kisses from two puppies"),
    "savasana": (14, "A guest lying on her mat with a puppy curled up next to her face"),
    "pool-flow": (60, "A small group practising by a long pool in the garden"),
    "garden-pair": (48, "Two guests by the pool, one holding two puppies in her lap"),
}


def main():
    rows = list(csv.DictReader(open(os.path.join(SRC, "04-assets-manifest.csv"), encoding="utf-8-sig")))
    os.makedirs(OUT, exist_ok=True)
    manifest = {}
    for key, (idx, alt) in PHOTOS.items():
        row = rows[idx]
        im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, "assets", "images", row["local_filename"]))).convert("RGB")
        variants = []
        for w in WIDTH_OVERRIDES.get(key, WIDTHS):
            target = min(w, im.width)
            if variants and target == variants[-1]["w"]:
                continue
            h = round(im.height * target / im.width)
            buf = io.BytesIO()
            im.resize((target, h), Image.LANCZOS).save(buf, "WEBP", quality=QUALITY, method=6)
            data = buf.getvalue()
            # Content hash in the name lets the CDN and browsers cache the file forever.
            name = f"{key}-{target}.{hashlib.sha1(data).hexdigest()[:8]}.webp"
            with open(os.path.join(OUT, name), "wb") as f:
                f.write(data)
            variants.append({"w": target, "src": f"/images/{name}"})
        manifest[key] = {"width": im.width, "height": im.height, "alt": alt, "variants": variants, "source": row["original_url"]}
        print(key, im.size, [v["w"] for v in variants])
    # Drop derivatives that are no longer referenced by the manifest.
    keep = {os.path.basename(v["src"]) for m in manifest.values() for v in m["variants"]}
    for name in os.listdir(OUT):
        if name.endswith(".webp") and name not in keep:
            os.remove(os.path.join(OUT, name))
            print("removed", name)
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=1)


if __name__ == "__main__":
    main()
