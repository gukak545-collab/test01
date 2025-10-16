import React from 'react';
import type { ResultData } from '../types';
import { BrainIcon, LightningIcon } from './icons';

const ResultCard: React.FC<{ title: string; value: string; colorClass: string; }> = ({ title, value, colorClass }) => (
    <div className={`flex-1 p-4 rounded-lg bg-opacity-10 dark:bg-opacity-20 ${colorClass}`}>
        <p className="text-sm text-slate-600 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-800 dark:text-white">{value} <span className="text-base font-normal">วัตต์</span></p>
    </div>
);

const ResultDisplay: React.FC<{ result: ResultData }> = ({ result }) => {
    const { calculatedPower, setPower, analysis } = result;

    return (
        <div className="mt-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4">
                <ResultCard title="กำลังไฟฟ้าที่คำนวณได้" value={calculatedPower.toFixed(2)} colorClass="bg-green-500" />
                <ResultCard title="กำลังไฟฟ้าที่ตั้งค่า" value={setPower.toFixed(2)} colorClass="bg-blue-500" />
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                    <BrainIcon className="w-6 h-6 text-sky-500" />
                    ผลการวิเคราะห์จาก AI
                </h3>
                <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {analysis}
                    </p>
                </div>
            </div>
            {/* Fix: Replaced non-standard `style jsx` with a standard `style` tag to resolve the TypeScript error. */}
            <style>{`
              @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in {
                animation: fade-in 0.5s ease-out forwards;
              }
            `}</style>
        </div>
    );
};

export default ResultDisplay;