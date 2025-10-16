
import React from 'react';
import type { FormValues } from '../types';
import { CalculatorIcon, RefreshIcon } from './icons';

interface InputFormProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{
    id: keyof FormValues;
    label: string;
    placeholder: string;
    unit: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, label, placeholder, unit, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label}
        </label>
        <div className="relative">
            <input
                type="number"
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                placeholder={placeholder}
                min="0"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 dark:text-slate-400 text-sm">{unit}</span>
        </div>
    </div>
);


const InputForm: React.FC<InputFormProps> = ({ formValues, setFormValues, onSubmit, onReset, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
            id="kh"
            label="ค่า kh ของมิเตอร์"
            placeholder="เช่น 1200"
            unit="rev/kWh"
            value={formValues.kh}
            onChange={handleChange}
        />
         <InputField
            id="setPower"
            label="กำลังไฟฟ้าที่ตั้งค่า"
            placeholder="เช่น 1000"
            unit="วัตต์"
            value={formValues.setPower}
            onChange={handleChange}
        />
        <InputField
            id="rotations"
            label="จำนวนรอบที่จับเวลา"
            placeholder="เช่น 5"
            unit="รอบ"
            value={formValues.rotations}
            onChange={handleChange}
        />
        <InputField
            id="time"
            label="เวลาที่ใช้"
            placeholder="เช่น 60"
            unit="วินาที"
            value={formValues.time}
            onChange={handleChange}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 disabled:cursor-not-allowed transition-all"
        >
          <CalculatorIcon className="w-5 h-5"/>
          {isLoading ? 'กำลังคำนวณ...' : 'คำนวณและวิเคราะห์'}
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
        >
          <RefreshIcon className="w-5 h-5"/>
          ล้างข้อมูล
        </button>
      </div>
    </form>
  );
};

export default InputForm;
