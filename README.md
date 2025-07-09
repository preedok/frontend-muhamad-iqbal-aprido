# 🌐 Frontend Developer Test - Sistem Ekspor-Impor Pelabuhan Pelindo

Aplikasi frontend interaktif untuk manajemen produk ekspor-impor Pelabuhan. Dibangun dengan ReactJS, Zustand, TailwindCSS (Shadcn UI), dan Vite. Data diambil dari REST API LoopBack.

---

## 🚀 Fitur Utama

- Pemilihan bertahap: Negara → Pelabuhan → Produk  
- Otomatis memilih pelabuhan atau produk jika hanya ada satu pilihan  
- Menampilkan detail produk secara otomatis saat produk dipilih  
- Hitung harga total dengan diskon secara real-time  
- Indikator langkah (step) interaktif untuk panduan proses  
- Manajemen state global menggunakan Zustand yang ringan dan efisien  

---

## 🧱 Teknologi

- **ReactJS** — UI library  
- **Zustand** — State management global  
- **Shadcn UI** — UI components modern berbasis Radix UI  
- **TailwindCSS** — Utility-first CSS framework  
- **Vite** — Build tool dan dev server cepat  

---

## 📁 Struktur Proyek
src/
├── components/
│ ├── common/ # Komponen StepIndicator, dll
│ ├── selectors/ # Komponen pemilih Negara, Pelabuhan, Produk
│ └── details/ # Komponen detail produk
├── stores/ # Zustand store global
├── service/ # Konfigurasi API
├── App.jsx # Root component aplikasi
├── main.jsx # Entry point aplikasi
└── index.css # Styling global Tailwind

## 📁 .env
VITE_API_BASE_URL=http://202.157.176.100:3001

## 📁 Install dependencies
npm install
# atau
yarn install

## 📁 Clone repository
git clone https://github.com/preedok/frontend-muhamad-iqbal-aprido
#
cd frontend-muhamad-iqbal-aprido

## 📁 Jalankan aplikasi dalam mode development
npm run dev
# atau
yarn dev

## 📁  Buka aplikasi di browser
http://localhost:5173
