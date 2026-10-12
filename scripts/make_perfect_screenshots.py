import os
import shutil
from PIL import Image, ImageDraw, ImageFont

base_dir = 'e:/GlobPayFlow/gpf-landing-page/public/images'
logo_orig = Image.open(f'{base_dir}/globpayflow_logo.png').convert('RGBA')

font_bold_path = os.path.join(os.environ.get('WINDIR', 'C:/Windows'), 'Fonts', 'segoeuib.ttf')
if not os.path.exists(font_bold_path):
    font_bold_path = os.path.join(os.environ.get('WINDIR', 'C:/Windows'), 'Fonts', 'arialbd.ttf')

font_reg_path = os.path.join(os.environ.get('WINDIR', 'C:/Windows'), 'Fonts', 'segoeui.ttf')
if not os.path.exists(font_reg_path):
    font_reg_path = font_bold_path

def create_brand_header(bg_color, width=240, height=44, logo_size=32, font_size=22, text_theme='light'):
    """
    Creates a seamless brand banner with GlobPayFlow logo and text.
    text_theme: 'light' (dark text on light bg) or 'dark' (light text on dark bg)
    """
    img = Image.new('RGBA', (width, height), bg_color + (255,))
    draw = ImageDraw.Draw(img)
    
    # Resize logo
    resized_logo = logo_orig.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Center vertically
    logo_y = (height - logo_size) // 2
    logo_x = 0
    img.paste(resized_logo, (logo_x, logo_y), resized_logo)
    
    font = ImageFont.truetype(font_bold_path, font_size)
    text_x = logo_x + logo_size + 10
    
    bbox = font.getbbox('Glob')
    text_y = (height - (bbox[3] - bbox[1])) // 2 - bbox[1]
    
    if text_theme == 'dark':
        draw.text((text_x, text_y), 'Glob', font=font, fill=(255, 255, 255))
        w = font.getbbox('Glob')[2] - font.getbbox('Glob')[0]
        draw.text((text_x + w, text_y), 'PayFlow', font=font, fill=(196, 181, 253))
    else:
        draw.text((text_x, text_y), 'Glob', font=font, fill=(15, 23, 42))
        w = font.getbbox('Glob')[2] - font.getbbox('Glob')[0]
        draw.text((text_x + w, text_y), 'PayFlow', font=font, fill=(124, 58, 237))
        
    return img.convert('RGB')

# 1. WALLET (shot-wallet.png)
img_wallet = Image.open(f'{base_dir}/shot-wallet.png').convert('RGB')
draw_w = ImageDraw.Draw(img_wallet)
# Clean area: top header is pure white (255, 255, 255)
draw_w.rectangle([95, 95, 340, 160], fill=(255, 255, 255))
brand_w = create_brand_header((255, 255, 255), width=230, height=48, logo_size=36, font_size=24, text_theme='light')
img_wallet.paste(brand_w, (100, 105))
img_wallet.save(f'{base_dir}/gpf-wallet.png')
img_wallet.save(f'{base_dir}/shot-wallet.png')
print("Processed gpf-wallet.png")

# 2. DEPOSIT (shot-deposit.png)
img_deposit = Image.open(f'{base_dir}/shot-deposit.png').convert('RGB')
draw_d = ImageDraw.Draw(img_deposit)
# In shot-deposit, the outer frame starts at x=105, bg is (245, 249, 250)
# First restore outer background if tainted
draw_d.rectangle([50, 60, 104, 150], fill=(227, 231, 234))
# Sidebar interior bg color: (245, 249, 250)
draw_d.rectangle([105, 60, 320, 150], fill=(245, 249, 250))
brand_d = create_brand_header((245, 249, 250), width=205, height=42, logo_size=30, font_size=20, text_theme='light')
img_deposit.paste(brand_d, (115, 78))
img_deposit.save(f'{base_dir}/gpf-deposit.png')
img_deposit.save(f'{base_dir}/shot-deposit.png')
print("Processed gpf-deposit.png")

# 3. WITHDRAW (shot-withdraw.png)
img_withdraw = Image.open(f'{base_dir}/shot-withdraw.png').convert('RGB')
draw_wd = ImageDraw.Draw(img_withdraw)
# Dark header bar bg color is (115, 120, 123) / (110, 115, 120)
# Sample actual color at (30, 35)
bg_color_wd = img_withdraw.getpixel((30, 35))
draw_wd.rectangle([10, 10, 220, 65], fill=bg_color_wd)
brand_wd = create_brand_header(bg_color_wd, width=200, height=44, logo_size=32, font_size=21, text_theme='dark')
img_withdraw.paste(brand_wd, (18, 16))

# Clean "Exchange Wallet" inside modal dropdown to "Corporate Wallet"
# x: 540 to 640, y: 330 to 350
font_small = ImageFont.truetype(font_reg_path, 14)
draw_wd.rectangle([540, 332, 642, 348], fill=(238, 242, 246))
draw_wd.text((541, 333), "Corporate Wallet", font=font_small, fill=(15, 23, 42))

img_withdraw.save(f'{base_dir}/gpf-withdraw.png')
img_withdraw.save(f'{base_dir}/shot-withdraw.png')
print("Processed gpf-withdraw.png")

# 4. TRANSACTIONS (shot-transactions.png)
img_tx = Image.open(f'{base_dir}/shot-transactions.png').convert('RGB')
draw_tx = ImageDraw.Draw(img_tx)
draw_tx.rectangle([50, 10, 340, 75], fill=(255, 255, 255))
brand_tx = create_brand_header((255, 255, 255), width=240, height=48, logo_size=36, font_size=24, text_theme='light')
img_tx.paste(brand_tx, (65, 18))
img_tx.save(f'{base_dir}/gpf-transactions.png')
img_tx.save(f'{base_dir}/shot-transactions.png')
print("Processed gpf-transactions.png")

# 5. WHITELIST (shot-whitelist.png)
img_wl = Image.open(f'{base_dir}/shot-whitelist.png').convert('RGB')
draw_wl = ImageDraw.Draw(img_wl)
# Sidebar bg is pure white
draw_wl.rectangle([10, 10, 180, 80], fill=(255, 255, 255))
brand_wl = create_brand_header((255, 255, 255), width=160, height=46, logo_size=32, font_size=20, text_theme='light')
img_wl.paste(brand_wl, (15, 20))

# Clean "Main Trading Wallet" -> "Main Treasury Wallet"
font_m = ImageFont.truetype(font_reg_path, 15)
draw_wl.rectangle([223, 440, 350, 465], fill=(255, 255, 255))
draw_wl.text((225, 442), "Main Treasury Wallet", font=font_m, fill=(15, 23, 42))

img_wl.save(f'{base_dir}/gpf-whitelist.png')
img_wl.save(f'{base_dir}/shot-whitelist.png')
print("Processed gpf-whitelist.png")

print("SUCCESS: All 5 images regenerated with pristine GlobPayFlow branding and cached versions created!")
