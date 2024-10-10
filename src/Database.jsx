import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';





// قائمة المدربين
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
const DataDisplay = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRank, setSelectedRank] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedTrainer, setSelectedTrainer] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/paramedics');
                console.log(response.data);
                setData(response.data.data);
                setFilteredData(response.data.data);
            } catch (err) {
                setError('حدث خطأ أثناء جلب البيانات');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilter = () => {
        let filtered = data;

        // تطبيق البحث
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.ParamedicName.includes(searchTerm) ||
                item.Rank.includes(searchTerm) ||
                item.Trainer.includes(searchTerm) ||
                item.Date.includes(searchTerm) ||
                item.StatusCode.includes(searchTerm) ||
                item.CaseDetails.includes(searchTerm)
            );
        }

        // تطبيق الفلترة حسب الرتبة
        if (selectedRank) {
            filtered = filtered.filter(item => item.Rank === selectedRank);
        }

        // تطبيق الفلترة حسب الحالة
        if (selectedStatus) {
            filtered = filtered.filter(item => item.StatusCode === selectedStatus);
        }

        // تطبيق الفلترة حسب المدرب
        if (selectedTrainer) {
            filtered = filtered.filter(item => item.Trainer === selectedTrainer);
        }

        setFilteredData(filtered);
    };

    const handleRankChange = (e) => {
        setSelectedRank(e.target.value);
        handleFilter();
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        handleFilter();
    };

    const handleTrainerChange = (e) => {
        setSelectedTrainer(e.target.value);
        handleFilter();
    };

    // دالة لتحميل البيانات كملف Excel
    const handleExportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData); // تحويل البيانات إلى ورقة عمل
        const wb = XLSX.utils.book_new(); // إنشاء كتاب جديد
        XLSX.utils.book_append_sheet(wb, ws, 'Paramedics'); // إضافة ورقة العمل إلى الكتاب
        XLSX.writeFile(wb, 'paramedics_data.xlsx'); // تحميل الملف
    };

    if (loading) {
        return <div className="text-center text-xl mt-10">جاري التحميل...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }


    return (
        <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-gray-100 to-white shadow-lg rounded-xl mt-10">
            <h1 className="text-4xl font-bold mb-5 text-blue-600 text-center">البيانات</h1>

            {/* حقل البحث */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="ابحث عن اسم المسعف أو الرتبة..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={handleFilter}
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-200"
                >
                    بحث
                </button>
            </div>

            {/* نظام الفلترة حسب الرتبة والحالة والمدرب */}
            <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-10">
                <select
                    value={selectedRank}
                    onChange={handleRankChange}
                    className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg mb-4 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="">كل الرتب</option>
                    <option value="قائد">قائد</option>
                    <option value="كشاف">كشاف</option>
                    {/* أضف المزيد من الرتب حسب الحاجة */}
                </select>

                <select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg mb-4 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="">كل الحالات</option>
                    <option value="أحمر">أحمر</option>
                    <option value="أصفر">أصفر</option>

                    {/* أضف المزيد من الحالات حسب الحاجة */}
                </select>

                <select
                    value={selectedTrainer}
                    onChange={handleTrainerChange}
                    className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="">كل المدربين</option>
                    {trainers.map(trainer => (
                        <option key={trainer.value} value={trainer.value}>
                            {trainer.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* زر تحميل البيانات كملف Excel */}
            <button
                onClick={handleExportToExcel}
                className="mb-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition duration-200"
            >
                تحميل البيانات كملف Excel
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item) => (
                    <div key={item.id}
                         className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
                         dir="rtl">
                        <h2 className="text-2xl font-semibold mb-2">{item.ParamedicName}</h2>
                        <p className="text-gray-700">
                            <strong>رتبة المسعف:</strong> {item.Rank}
                        </p>
                        <p className="text-gray-700">
                            <strong>المدرب:</strong> {item.Trainer}
                        </p>
                        <p className="text-gray-700">
                            <strong>التاريخ:</strong> {new Date(item.Date).toLocaleDateString('ar-EG')}
                        </p>
                        <p className="text-gray-700">
                            <strong>كود الحالة:</strong> {item.StatusCode}
                        </p>
                        <p className="text-gray-700">
                            <strong>تفاصيل الحالة:</strong> {item.CaseDetails}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataDisplay;
