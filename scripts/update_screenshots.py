import os
import shutil
from PIL import Image, ImageDraw, ImageFont

base_dir = 'e:/GlobPayFlow/gpf-landing-page/public/images'
logo_path = f'{base_dir}/globpayflow_logo.png'
logo_orig = Image.open(logo_path).convert('RGBA')

font_bold_path = os.path.join(os.environ.get('WINDIR', 'C:/Windows'), 'Fonts', 'segoeuib.ttf')
if not os.path.exists(font_bold_path):
    font_bold_path = os.path.join(os.environ.get('WINDIR', 'C:/Windows'), 'Fonts', 'arialbd.ttf')

# Backup original files if not backed up
for fname in ['shot-wallet.png', 'shot-deposit.png', 'shot-withdraw.png', 'shot-transactions.png', 'shot-whitelist.png']:
    orig_path = f'{base_dir}/{fname}'
    bak_path = f'{base_dir}/{fname}.bak'
    if not os.path.exists(bak_path):
        shutil.copyfile(orig_path, bak_path)
        print(f'Backed up {fname}')

def make_branding_patch(width, height, bg_color, logo_size, font_size, dark_mode=False):
    patch = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(patch)
    
    # Resize logo
    resized_logo = logo_orig.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Center vertically
    logo_y = (height - logo_size) // 2
    logo_x = 0
    patch.paste(resized_logo, (logo_x, logo_y), resized_logo)
    
    # Text
    font = ImageFont.truetype(font_bold_path, font_size)
    text_x = logo_x + logo_size + 8
    
    # Measure text height to center vertically
    bbox_g = font.getbbox('Glob')
    th = bbox_g[3] - bbox_g[1]
    text_y = (height - th) // 2 - bbox_g[1]
    
    glob_color = (255, 255, 255) if dark_mode else (15, 23, 42)
    payflow_color = (196, 181, 253) if dark_mode else (124, 58, 237)
    
    draw.text((text_x, text_y), 'Glob', font=font, fill=glob_color)
    glob_w = font.getbbox('Glob')[2] - font.getbbox('Glob')[0]
    draw.text((text_x + glob_w, text_y), 'PayFlow', font=font, fill=payflow_color)
    
    return patch

# 1. Update shot-wallet.png
# Old target: x: 100 to 320, y: 105 to 155 (PaySphere Merchant)
img_wallet = Image.open(f'{base_dir}/shot-wallet.png.bak')
patch_wallet = make_branding_patch(width=230, height=48, bg_color=(255, 255, 255), logo_size=38, font_size=24)
img_wallet.paste(patch_wallet, (100, 105))
img_wallet.save(f'{base_dir}/shot-wallet.png')
print('Updated shot-wallet.png')

# 2. Update shot-deposit.png
# Old target: x: 80 to 330, y: 65 to 135 (KriptoPay Dashboard)
img_deposit = Image.open(f'{base_dir}/shot-deposit.png.bak')
# Let's clean the rect first with the exact background color (255, 255, 255)
patch_deposit = make_branding_patch(width=240, height=52, bg_color=(255, 255, 255), logo_size=38, font_size=24)
# Cover old KriptoPay and Dashboard subtitle
draw_dep = ImageDraw.Draw(img_deposit)
draw_dep.rectangle([80, 65, 330, 135], fill=(255, 255, 255))
img_deposit.paste(patch_deposit, (85, 75))
img_deposit.save(f'{base_dir}/shot-deposit.png')
print('Updated shot-deposit.png')

# 3. Update shot-withdraw.png
# Old target: x: 10 to 180, y: 10 to 65 (SaaS)
img_withdraw = Image.open(f'{base_dir}/shot-withdraw.png.bak')
patch_withdraw = make_branding_patch(width=190, height=45, bg_color=(115, 120, 123), logo_size=32, font_size=20, dark_mode=True)
img_withdraw.paste(patch_withdraw, (15, 15))
img_withdraw.save(f'{base_dir}/shot-withdraw.png')
print('Updated shot-withdraw.png')

# 4. Update shot-transactions.png
# Old target: x: 70 to 330, y: 15 to 70 (CRYPTOFLOW)
img_tx = Image.open(f'{base_dir}/shot-transactions.png.bak')
draw_tx = ImageDraw.Draw(img_tx)
draw_tx.rectangle([65, 15, 340, 70], fill=(255, 255, 255))
patch_tx = make_branding_patch(width=240, height=48, bg_color=(255, 255, 255), logo_size=36, font_size=24)
img_tx.paste(patch_tx, (70, 18))
img_tx.save(f'{base_dir}/shot-transactions.png')
print('Updated shot-transactions.png')

# 5. Update shot-whitelist.png
# Old target: x: 10 to 180, y: 15 to 75 (Black S icon)
img_wl = Image.open(f'{base_dir}/shot-whitelist.png.bak')
draw_wl = ImageDraw.Draw(img_wl)
draw_wl.rectangle([10, 15, 180, 75], fill=(255, 255, 255))
patch_wl = make_branding_patch(width=200, height=48, bg_color=(255, 255, 255), logo_size=36, font_size=22)
img_wl.paste(patch_wl, (20, 20))
img_wl.save(f'{base_dir}/shot-whitelist.png')
print('Updated shot-whitelist.png')

print('ALL 5 SCREENSHOTS UPDATED WITH REAL GLOBPAYFLOW BRANDING!')
