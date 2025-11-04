import qrcode
import base64
import json
from datetime import datetime

# Get vehicle number
vehicle_number = input("Enter vehicle number: ").strip().upper()

# Current datetime
now = datetime.now()
current_date = now.strftime("%Y-%m-%d")
current_time = now.strftime("%I:%M:%S %p")  # includes AM/PM

# Combine all data
payload = {
    "vehicle": vehicle_number,
    "date": current_date,
    "time": current_time
}

# Encode to Base64 string
encoded_data = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode()

# Generate target URL (localhost for dev)
url = f"https://parking-ticket-management.vercel.app/?data={encoded_data}"

# Create QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

# Save QR image
img = qr.make_image(fill_color="black", back_color="white")
filename = f"qr_{vehicle_number}.png"
img.save(filename)

print(f"✅ QR generated for {vehicle_number}")
print(f"📅 Date: {current_date}")
print(f"🕒 Time: {current_time}")
print(f"🌐 Encoded URL: {url}")
print(f"🖼️ Saved as: {filename}")
