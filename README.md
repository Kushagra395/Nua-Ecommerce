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
