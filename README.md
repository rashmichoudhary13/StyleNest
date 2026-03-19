# StyleNest ( Clothing E-commerce Website )
A modern e-commerce platform for browsing, selecting, and purchasing clothes seamlessly.
This project includes a dynamic product listings, cart management, authentication, admin dasboard and a responsive shopping experience.

🔗 Live Demo: https://stylenest-htgu.onrender.com/

# Feature
## User Feature
- Browse clothing products with images, sizes, prices & details.
- Search & filter products.
- Add to Cart / Remove from Cart.
- Smooth checkout experience.
- User authentication (Login / Signup)
- Order history

## Admin Feature
| Section | Capabilities |
| ------- | ------------ |
| **🧍‍♂️ User Management** | - View all Users <br> - Change user role (Customer or Admin) |
| **🛍️ Product Management** | - View all Products <br> - Add new Products <br> - Edit or Delete existing products |
| **📦 Order Management** | - View all Orders <br> - Update Order Status (Pending/Shipped/Delivered) |

# ⚙️ Tech Stack
- **Frontend:** Vite + React, Tailwind CSS, Redux (State Management), Swiper, Axios <br>
- **Backend:** Node.js, Express.js
- **Database:** Mongodb
- **Authentication:** Clerk <br>
- **Payment Integration:** Paypal <br>
- **Other Tools/Services:** Cloudinary

## 🔌 API Endpoints

The backend follows a RESTful architecture with structured routes for public users, authenticated customers, and administrators.

### **🛍️ Public Product Routes**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Fetch all products (includes filtering & sorting) |
| `GET` | `/api/products/:id` | Get detailed information for a single product |
| `GET` | `/api/products/best-seller` | Retrieve the highest-rated product |
| `GET` | `/api/products/new-arrivals` | Get the latest 20 products added to the store |
| `GET` | `/api/products/similar/:id` | Fetch similar products based on category/gender |

### **🛒 Cart & Checkout (Guest & User)**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/cart` | Fetch current cart (supports `userId` or `guestId`) |
| `POST` | `/api/cart` | Add a product to the cart |
| `PUT` | `/api/cart` | Update product quantity or variant in cart |
| `DELETE` | `/api/cart` | Remove an item from the cart |
| `POST` | `/api/cart/merge` | **[Auth]** Merge guest cart into user account on login |
| `POST` | `/api/checkout` | **[Auth]** Initialize a new checkout session |
| `POST` | `/api/checkout/:id/finalize` | **[Auth]** Convert a paid checkout into a final Order |

### **📦 User Orders**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/orders/my-orders` | **[Auth]** List all orders for the logged-in user |
| `GET` | `/api/orders/:id` | **[Auth]** View specific order details and status |

### **🛡️ Admin Panel (Admin Only)**
> All routes below require `requireAuth` and `requireAdmin` middleware.

| Category | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Products** | `GET` | `/api/admin/products` | View all products in the database |
| | `POST` | `/api/products` | Create a new product entry |
| | `PUT` | `/api/products/:id` | Update product details or stock |
| | `DELETE` | `/api/products/:id` | Permanently delete a product |
| **Orders** | `GET` | `/api/admin/orders` | View every order placed on the platform |
| | `PUT` | `/api/admin/orders/:id` | Update order status (e.g., "Delivered") |
| | `DELETE` | `/api/admin/orders/:id` | Remove an order record |
| **Users** | `GET` | `/api/admin/users` | View all registered users |
| | `PUT` | `/api/admin/users/:id` | Update user roles or information |

# 📷 Screenshot

- ## Home Page
<img width="1919" height="1025" alt="image" src="https://github.com/user-attachments/assets/d3963601-e2d2-4fcc-8cae-073eed52b8b1" />

- ## Product Page
<img width="1919" height="1028" alt="image" src="https://github.com/user-attachments/assets/dacd3193-50b9-42ae-82ab-65aa1ec3b8ce" />
<img width="1919" height="1030" alt="image" src="https://github.com/user-attachments/assets/9235ea98-caf8-4ddc-89ac-67ec10336b1a" />

- ## Product Detail Page
<img width="1919" height="1026" alt="image" src="https://github.com/user-attachments/assets/0ce8eee1-41a9-48fc-953f-0c80bc9ac613" />

- ## Checkout Page
<img width="1919" height="1031" alt="image" src="https://github.com/user-attachments/assets/b2770664-138b-4090-8b28-04c3fc52192a" />

- ## Order Page
<img width="1919" height="1023" alt="image" src="https://github.com/user-attachments/assets/6a80aa5f-e753-458e-aee7-348b914b7c13" />

- ## Admin Page
<img width="1919" height="1031" alt="image" src="https://github.com/user-attachments/assets/9435bbbc-2467-4e96-83e3-4b821145c446" />








