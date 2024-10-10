import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // تأكد من مسار الملف
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login.jsx";
import Database from "./Database.jsx"; // إذا كان لديك ملف CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} /> {/* تأكد من استخدام </Route> بشكل صحيح */}
            <Route path="/login" element={<Login />} /> {/* إضافة مسار صفحة تسجيل الدخول */}
            <Route path="/Database" element={<Database />} /> {/* إضافة مسار صفحة تسجيل الدخول */}
        </Routes>
    </BrowserRouter>
);
