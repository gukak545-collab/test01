
import React from 'react';
import { MeterIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <MeterIcon className="w-12 h-12 text-sky-500"/>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white tracking-tight">
          เครื่องคำนวณกำลังไฟฟ้ามิเตอร์
        </h1>
      </div>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
        ป้อนข้อมูลการหมุนของมิเตอร์เพื่อคำนวณกำลังไฟฟ้าที่ใช้จริง และเปรียบเทียบกับค่าที่ตั้งไว้พร้อมรับคำวิเคราะห์จาก AI
      </p>
    </header>
  );
};

export default Header;
