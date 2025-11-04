
# 🅿️ Mall Parking QR System

A modern, full-stack **parking ticket management system** that generates and scans QR codes to calculate parking fees automatically.  
Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**, this app offers a seamless experience for both parking operators and customers.

---

## 🚀 Features

- 🧾 **Dynamic QR Generation** using Python (`qrcode`)
- 🔒 **Secure Encoded Data** (Base64 payloads prevent manual tampering)
- ⏱️ **Real-Time Fee Calculation** based on entry and exit time
- 🕒 **AM/PM + Date Aware** duration computation
- 💰 **Auto Fee Scaling** — ₹25 for ≤ 1 hour, ₹25/hr increment thereafter
- 📱 **Responsive Design** built with Tailwind CSS
- 📤 **QR Download Option** for user record or print
- 🌐 **Fully Deployed** at [parking-ticket-management.vercel.app](https://parking-ticket-management.vercel.app)

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **QR Handling** | `qrcode` (JS), `qrcode` (Python) |
| **Deployment** | Vercel (Turbopack) |
| **Language Support** | English (UTF-8) |

---

## 🧩 Workflow

1. **Generate a QR** using the Python script:
   ```bash
   python qr_generator.py


* Prompts for the vehicle number
* Automatically embeds the current date and time
* Encodes data into a Base64 payload
* Generates a QR that opens:

  ```
  https://parking-ticket-management.vercel.app/?data=ENCODED_STRING
  ```

2. **Scan the QR**

   * Opens the deployed app
   * Decodes the data securely
   * Displays entry/exit details, duration, and calculated parking fee
   * Option to download the same QR as an image

---

## ⚙️ Local Development

```bash
# Clone the repository
git clone https://github.com/Pepperjack-svg/Parking-ticket-management.git
cd Parking-ticket-management

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧰 Build for Production

```bash
npm run build
npm start
```

The app will automatically optimize using **Turbopack** and **React Server Components**.

---

## 📦 Python QR Generator Setup

```bash
pip install qrcode[pil]
python qr_generator.py
```

Generates QR images in the current directory (`qr_<VEHICLE>.png`).

---

## 🧾 Example

**Input:**

```
Vehicle No: TN66AM1232
```

**Output (QR Encoded):**

```
https://parking-ticket-management.vercel.app/?data=eyJ2ZWhpY2xlIjoiVE42NkFNM...
```

**Displayed on Web:**

* Vehicle: TN66AM1232
* Entry Date: 2025-11-04
* Entry Time: 04:15:25 PM
* Exit Time: 05:40:00 PM
* Duration: 1h 25m
* Parking Fee: ₹50

---

## 🧑‍💻 Author

**Kishore**
Developer & Designer — Smart Infrastructure Automation Systems
📍 [parking-ticket-management.vercel.app](https://parking-ticket-management.vercel.app)

---

## 🛠️ License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

```

Would you like me to add **a QR image + demo screenshot section** (with Markdown image placeholders for GitHub)?
```