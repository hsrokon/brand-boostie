# Brand Boostie

**Live Website:** [brandboostie.com](https://brandboostie.com)

Brand Boostie is a robust, full-featured business growth platform offering a suite of professional services to elevate brand presence and digital marketing success. Built with React, Tailwind CSS, Firebase Authentication, and MongoDB (Express server hosted on Vercel), it features dynamic pricing, case studies, blogs, payment claim management, and a secure admin dashboard.

---

## 🚀 Features

### 🏠 Public Pages

* **Home** – Overview with hero, services, testimonials, and newsletter subscription.
* **Services** – Dynamically rendered service plans with deep-linking and plan-specific navigation.
* **Pricing** – Fully responsive, interactive pricing cards, old/new pricing with discounts, and detailed feature comparison.
* **Case Studies** – Insightful client success stories with route-based detail pages.
* **Blogs** – Informative articles with blog detail routing and admin posting.
* **Contact** – Contact form with potential integration.
* **About** – Team and brand story.

### 🔐 Authentication

* Firebase Authentication

  * Email/password signup, login
  * Password reset
  * Email verification

### 📦 Dynamic Content

* **Pricing Plans** – Stored in MongoDB and displayed using a custom pricing card component.
* **Blog Posts / Case Studies** – Created from Admin Dashboard.
* **Testimonials** – User-submitted via authenticated routes.

### 💳 Payment & Claim

* Manual claim system

  * Choose plan → Pay via bKash/Nagad → Submit transaction ID
  * Confirmation via **EmailJS** + storage in **MongoDB**

### 🛠 Admin Dashboard

* Protected routes via PrivateRoute
* Post blogs, case studies
* Manage pricing plans and pricing card data
* View subscribers and payment claims

### 📲 Responsive UI

* Fully mobile-optimized
* `scroll-mt` applied with responsiveness to ensure accurate scroll-to-view
* Dynamic routing with smooth scroll on ID match (Pricing cards)

---

## ⚙️ Tech Stack

| Technology               | Purpose                                               |
| ------------------------ | ----------------------------------------------------- |
| **React.js**             | Frontend UI                                           |
| **Tailwind CSS**         | Utility-first styling                                 |
| **React Router DOM**     | Client-side routing                                   |
| **Firebase Auth**        | Authentication & email verification                   |
| **MongoDB + Express.js** | Backend API & database (Vercel serverless deployment) |
| **EmailJS**              | Email sending on payment claim                        |
| **SweetAlert2**          | Alert modals                                          |

---

## 📁 Project Structure

```
/src
  ├── components
  │   ├── pricing/
  │   ├── adminDashboard/
  │   ├── blogs/
  │   └── ...
  ├── pages
  │   ├── Home.jsx
  │   ├── Services.jsx
  │   ├── Pricing.jsx
  │   ├── CaseStudies.jsx
  │   └── ...
  ├── layout
  │   └── Layout.jsx
  ├── routes
  │   ├── PrivateRoute.jsx
  │   └── router.jsx
  └── providers
      └── AuthProvider.jsx
```

---

## 🛡 Security

* All admin functionalities are protected via route guards.
* Email verification enforced before accessing protected features.
* Payment claims validated both in EmailJS and backend before saving.

---

## 🌐 Deployment

* **Frontend**: Deployed on Firebase Hosting with custom domain `brandboostie.com`
* **Backend**: Deployed on Vercel using `serverless-http`

---

## 🔧 Setup Instructions

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/brand-boostie.git
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Configure `.env` file:

   ```bash
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_USER_ID=...
   ```
4. Run the dev server:

   ```bash
   npm run dev
   ```

---

## ✍️ Author

**See Nothing** – Full-stack developer and designer of Brand Boostie

> For suggestions, contributions, or collaborations, feel free to reach out via the contact section on the live website.

---

## 📜 License

This project is licensed for educational and portfolio use. For commercial usage, contact the developer.
