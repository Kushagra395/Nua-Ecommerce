# 🛒 NUA E-Commerce — Mini E-Commerce SPA (React + Vite + Tailwind + shadcn/ui)

A fully functional **E-Commerce web app** built for the **SDE Developer Intern 2025 assignment**.  
The project covers **all mandatory requirements** mentioned in the assignment PDF and also includes several **extra UX/UI improvements**, a **theme system**, and polished real-world workflows.

🔗 **Live Demo:** https://nua-ecommerces.vercel.app/

---

## 🚀 Tech Stack

- **React + Vite**
- **React Router**
- **Tailwind CSS**
- **shadcn/ui**
- **Zustand (Global State Store)**
- **FakeStoreAPI**
- **Lucide Icons**
- **Deployed on Vercel**

---

# ✅ Features (Matches Assignment Requirements)

### **1. Product Listing Page ("/")**
- Responsive product grid
- Product image, title, and price
- Search box (filter by product title)
- Category filter (dropdown from API)
- Loading & Error UI
- Cached product list to avoid refetching

### **2. Product Details Page ("/product/:id")**
- Large product image
- Full description, title, price, rating
- Quantity selector (1–5)
- Add to Cart button
- Cached product details

### **3. Shopping Cart ("/cart")**
- Product thumbnail, title, price
- Quantity selector (1–10)
- Remove item option
- Auto subtotal + grand total calculation
- Proceed to Checkout button

### **4. Checkout ("/checkout")**
- Order summary showing all cart items
- Form fields: Name, Email, Address
- Basic validation for all fields
- Place Order → clears cart + shows confirmation screen

### **5. Data Caching**
- Cached list & product details using Zustand + localStorage fallback

### **6. State Management**
- Used **Zustand** (simple, scalable, more efficient than Redux for this scale)

### **7. Project Structure**
src/
├── components/
├── pages/
├── store/
├── hooks/
├── utils/
└── main.jsx / App.jsx

Clean, modular, readable code as expected in a SPA assignment.

---

# 🌟 Additional Features (Beyond Assignment Requirements)

### **1. Light/Dark Theme System**
- Fully implemented theme toggle
- Persistent theme (stored)
- Works with all Tailwind + shadcn components

### **2. Price Range Slider**
- Added a clean price filtering slider using shadcn's Slider component  
*(Not required in assignment — added for better UX.)*

### **3. "Clear Filters" Button**
- Resets search, slider, and categories instantly  
- Makes product browsing faster and more intuitive

### **4. Category Navigation in Navbar**
- Categories appear directly in navbar for quick access  
*(Assignment only asked for a dropdown — this is an upgraded UX.)*

### **5. Modern Clean UI / UX**
- Product cards with hover animations  
- Better spacing, grid alignment, shadows  
- Polished buttons, badges, and inputs  
- Empty state UI (no results / empty cart)
- Global consistent UI using shadcn

### **6. Fully Deployed**
- Hosted on **Vercel**
- Production optimized build
- Fast initial load + caching

### **7. Optimized API & Performance**
- Avoids re-fetching
- Global cached store
- Fast transitions between pages

---

# 📚 Libraries Used

| Library & Purpose |
|--------|---------|
| **React Router** | SPA routing |
| **Zustand** | Lightweight global store |
| **Tailwind CSS** | Styling framework |
| **shadcn/ui** | Accessible UI components |
| **Lucide Icons** | Modern icons |
| **FakeStoreAPI** | Product data |
| **Vercel** | Deployment |

---

# 🧠 Design Decisions

- **Zustand** chosen over Redux for cleaner & faster state management.
- **shadcn/ui** used for consistent, beautiful UI and accessibility.
- **React Router** for clean and scalable page routing.
- **Caching** ensures fast performance and smooth navigation.
- **Minimal but scalable folder structure** for easy future expansion.

---

# ▶️ Running Locally

```bash
npm install
npm run dev
