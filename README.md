# Course Feedback System - Frontend

🔗 **Live Link:** [https://fe-course-feedback.vercel.app/](https://fe-course-feedback.vercel.app/)

This is the **frontend application** of the Course Feedback System, built using **React, Tailwind CSS, and Recharts**.  
It allows students to view course details, submit feedback, and analyze ratings through interactive visualizations.

---

## 🚀 Tech Stack
- **React.js** (Vite for fast bundling)
- **Tailwind CSS** (UI styling)
- **Axios** (API calls)
- **React Router** (Routing)
- **Recharts** (Charts & Analytics)
- **React Loading Skeleton** (Loading state handling)
- **Toast Notifications** (User feedback)

---

## 📂 Project Structure

```
└── 📁FE-Course-Feedback
    └── 📁src
        └── 📁assets
        └── 📁axios
            ├── axiosInstance.js
        └── 📁components
            ├── CourseCard.jsx
            ├── footer.jsx
            ├── navbar.jsx
        └── 📁contexts
            ├── appContext.jsx
        └── 📁pages
            ├── CourseDetailsPage.jsx
            ├── HomePage.jsx
            ├── LoginPage.jsx
            ├── NotFoundPage.jsx
            ├── ProfilePage.jsx
            ├── SignupPage.jsx
        └── 📁utils
            ├── toastHelper.js
        ├── App.jsx
        ├── index.css
        ├── main.jsx
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── vercel.json
    └── vite.config.js
```