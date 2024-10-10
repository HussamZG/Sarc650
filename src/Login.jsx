import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // تحقق من اسم المستخدم وكلمة المرور
        if (username === 'Shtayer'||"Roka" && password === 'shtayer650'|| 'roka650') {
            // إذا كانت المعلومات صحيحة، انتقل إلى الصفحة التالية
            navigate('/DataBase'); // استبدل '/next-page' بالمسار الذي تريد الانتقال إليه
        } else {
            alert('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    };

    return (
        <div className="max-w-screen-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
            <h1 className="text-3xl font-bold mb-5 text-blue-600 text-center">صفحة تسجيل الدخول</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">اسم المستخدم:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        placeholder="ادخل اسم المستخدم هنا"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">كلمة المرور:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        placeholder="ادخل كلمة المرور هنا"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                    تسجيل الدخول
                </button>
            </form>
        </div>
    );
};

export default Login;
