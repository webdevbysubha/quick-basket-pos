# 🛒 Quick Basket POS

![Quick Basket POS](https://img.shields.io/badge/Status-Active-brightgreen.svg)
![React](https://img.shields.io/badge/Frontend-React.js-blue.svg)
![Python](https://img.shields.io/badge/Backend-Flask_Python-yellow.svg)
![Tailwind](https://img.shields.io/badge/CSS-Tailwind-38B2AC.svg)

**Quick Basket** is a modern, responsive, and visually stunning Point of Sale (POS) web application designed to bring a premium, retail-grade dashboard experience to independent stores and small businesses. 

## ✨ Features

- **📷 Live Cloud Scanner**: Instantly scan barcodes using your device's camera via the live viewfinder, featuring an animated scanning HUD and pause/resume functionality.
- **⚡ Super-Fast Checkout**: Quick manual barcode search and an intuitive visual cart with instant quantity updates and total calculations (including modular tax percentages).
- **🖨️ Thermal Receipts**: Instantly generate realistic PDF thermal receipts ready for direct thermal printing or digital download.
- **📊 Admin Dashboard**: A clean, auto-refreshing admin panel providing a live look at your active Product Inventory and complete Sales History logs.
- **🎨 Modern Retail Aesthetic**: Built from the ground up to look beautiful. Features soft shadows, glassmorphic blur effects, vivid gradient call-to-actions, and incredibly snappy micro-animations.
- **🛡️ State Management & Data Retention**: Your receipt history permanently logs the exact item name and sold price, ensuring completely accurate records even if a product is deleted from the active inventory later.

---

## 🛠️ Technology Stack

**Frontend**
- **React.js** (via Vite for lightning-fast HMR)
- **Tailwind CSS v3** (Utility-first styling, highly customized theme tokens)
- **react-qr-barcode-scanner** (Live camera feed integration)
- **jsPDF** (Receipt vector generation)
- **Lucide React** (Beautiful standardized iconography)
- **React Toastify** (Non-blocking notification system)

**Backend**
- **Python 3.x**
- **Flask** (Lightweight scalable REST API architecture)
- **Flask-SQLAlchemy** (ORM handling complex SQL relationships natively)
- **SQLite** (Bundled, cross-platform database; effortlessly up-gradable to PostgreSQL/MySQL)

---

## 🚀 How to Run Locally

Follow these quick steps to get the POS running natively on your local machine.

### 1. Requirements
Ensure you have the following installed on your machine:
- **Node.js** (v16.0 or higher)
- **Python** (v3.9 or higher)

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd POS
```

### 3. Setup the Python Backend
Open a terminal and navigate to the backend directory to set up the Python environment:

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install the necessary dependencies
pip install -r requirements.txt

# (Optional) Seed the database with some sample products
python seed.py

# Start the Flask API server
python app.py
```
*The backend should now rapidly spin up on `http://localhost:5000`.*

### 4. Setup the React Frontend
Open a **new** terminal window, keeping the backend terminal running open in the background.

```bash
cd frontend

# Install the Node packages
npm install

# Start the Vite development server
npm run dev
```

*The frontend should now jump to life on `http://localhost:5173`. Open this URL in your web browser!*

---

## 📸 Core Views

### 1. The Terminal (POS Register)
The main checkout UI. Scan items using your webcam or type the barcode in the quick registration bar. Monitor the active cart on the right and hit **Confirm & Pay** to instantly finalize the transaction.

### 2. The Admin Dashboard
Navigate to the Admin switch in the top header. 
- **Products Tab**: Add new inventory, adjust pricing, manage categories, or delete discontinued items.
- **Sales History Tab**: View a robust, chronologically accurate log of all settled receipts, complete with itemized breakdowns and localized exact timestamps.

---

## 👨‍💻 Development & Formatting

- **Database Management**: Modify `models/database.py` for new schema rules. If altering tables, ensure you write a brief migration script or clear `pos.db`.
- **Styling Changes**: Global theme colors (primary, accent, card hues) can be edited instantly in `frontend/tailwind.config.js`.

*Thank you for exploring Quick Basket!*
