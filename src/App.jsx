import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ClipLoader from 'react-spinners/ClipLoader';
import {Link} from "react-router-dom"; // استيراد مكون التحميل

    const trainers = [
        { value: 'رقية العبدالله', label: 'رقية العبدالله' },
        { value: 'ريهام الريشاني', label: 'ريهام الريشاني' },
        { value: 'جوهر ابو فخر', label: 'جوهر ابو فخر' },
        { value: 'اية المحيثاوي', label: 'اية المحيثاوي' },
        { value: 'غسان صالحة', label: 'غسان صالحة' },
        { value: 'عدي النداف', label: 'عدي النداف' },
        { value: 'رهف العمر', label: 'رهف العمر' },
        { value: 'غنوة مرشد', label: 'غنوة مرشد' },
        { value: 'غيث ابو الفضل', label: 'غيث ابو الفضل' },
        { value: 'وسام شلغين', label: 'وسام شلغين' },
        { value: 'دانيال الحميدي', label: 'دانيال الحميدي' },
        { value: 'أبي عصمان', label: 'أبي عصمان' },
        { value: 'سليمان سعيد', label: 'سليمان سعيد' },
        { value: 'يمامة ابو عمار', label: 'يمامة ابو عمار' },
        { value: 'عبير ابو راس', label: 'عبير ابو راس' },
        { value: 'هادي عواد', label: 'هادي عواد' },
        { value: 'رامي السمان', label: 'رامي السمان' }
    ];

    const ranks = [
        { value: 'قائد', label: 'قائد' },
        { value: 'كشاف', label: 'كشاف' },
        { value: 'مسعف', label: 'مسعف' }
    ];

    const statusCodes = [
        { value: 'أحمر', label: 'أحمر' },
        { value: 'أصفر', label: 'أصفر' }
    ];



const App = () => {
    const [paramedicName, setParamedicName] = useState('');
    const [rank, setRank] = useState(null);
    const [trainer, setTrainer] = useState(null);
    const [date, setDate] = useState(new Date());
    const [statusCode, setStatusCode] = useState(null);
    const [caseDetails, setCaseDetails] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            data: {  // قد يحتاج Strapi إلى تغليف البيانات في مفتاح 'data'
                ParamedicName: paramedicName,
                Rank: rank?.value,
                Trainer: trainer?.value,
                Date: date,
                StatusCode: statusCode?.value,
                CaseDetails: caseDetails
            }
        };

        try {
            // استبدل رابط الواجهة الخلفية (API) بـ URL المناسب
            await axios.post('http://localhost:1337/api/paramedics', formData, {
                headers: {
                    'Authorization': `b971a87219994a1b1dca026f9a4a05083a512684b512b64630b935f255d4193ffbab03b8ab8b2c0c2b8399e87d6bf07cab4bdd5c2b311fc7071c041f13c7946ee65e147ec08702ba0dd67d6b9e5944bb065ba762d1b97861db6fadad70dd5a578b15048b757c0659f00fa4a23a00b2ed0fcae40b05a94bbb9887276d6fa6e868` // استبدل بـ Bearer Token الصحيح
                }
            });

            setSuccessMessage('تم إرسال البيانات بنجاح!');
            setParamedicName('');
            setRank(null);
            setTrainer(null);
            setDate(new Date());
            setStatusCode(null);
            setCaseDetails('');
        } catch (error) {
            setErrorMessage(`حدث خطأ أثناء إرسال البيانات: ${error.message}`);
        } finally {
            setLoading(false);
        }

        setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
        }, 3000);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#red" loading={loading} size={50} />
            </div>
        );
    }

    return (

        /*max-w-screen-md mx-auto p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg rounded-xl mt-10 border border-red-200 mb-4*/
       <div >
           <div id={'all'} dir={'rtl'} className="max-w-screen-md mx-auto backdrop-opacity-10 p-6 bg-white shadow-lg rounded-xl mt-10 border border-red-200 mb-4">
               <div className="flex justify-between items-center mb-5">
                   <h1 className="text-3xl font-bold text-red-600">فورم تقييم حالات - Sarc-650</h1>
                   <Link
                       to={'/Login'}
                       className="bg-red-600 hover:bg-red-700 text-center text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                   >
                       تسجيل الدخول
                   </Link>
               </div>
               <form onSubmit={handleSubmit}>
                   <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-700">أسم المسعف :</label>
                       <input
                           type="text"
                           value={paramedicName}
                           onChange={(e) => setParamedicName(e.target.value)}
                           className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-red-300"
                           placeholder="ادخل أسم المسعف هنا"
                           required
                       />
                   </div>
                   <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-700">رتبة المسعف :</label>
                       <Select
                           options={ranks}
                           value={rank}
                           onChange={setRank}
                           className="mt-1"
                           required
                       />
                   </div>
                   <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-700">المدرب :</label>
                       <Select
                           options={trainers}
                           value={trainer}
                           onChange={setTrainer}
                           className="mt-1"
                           required
                       />
                   </div>
                   <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-700">التاريخ :</label>
                       <DatePicker
                           selected={date}
                           onChange={(date) => setDate(date)}
                           dateFormat="yyyy-MM-dd"
                           className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-red-300"
                       />
                   </div>
                   <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-700">كود الحالة :</label>
                       <Select
                           options={statusCodes}
                           value={statusCode}
                           onChange={setStatusCode}
                           className="mt-1"
                           required
                       />
                   </div>
                   <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-700">تفاصيل الحالة :</label>
                       <textarea
                           value={caseDetails}
                           onChange={(e) => setCaseDetails(e.target.value)}
                           className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-red-300"
                           placeholder="أدخل تفاصيل الحالة هنا"
                           rows={5}
                           required
                       />
                   </div>
                   <button
                       type="submit"
                       className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                   >
                       إرسال
                   </button>
               </form>









               {successMessage && <p className="mt-4 text-green-500 text-center">{successMessage}</p>}
               {errorMessage && <p className="mt-4 text-red-500 text-center">{errorMessage}</p>}
           </div>
       </div>
    );
};

export default App;
