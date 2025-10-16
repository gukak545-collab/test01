
import React, { useState, useCallback } from 'react';
import type { FormValues, ResultData } from './types';
import { getPowerAnalysis } from './services/geminiService';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    kh: '',
    rotations: '',
    time: '',
    setPower: '',
  });
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(async () => {
    setError(null);
    setResult(null);

    const { kh, rotations, time, setPower } = formValues;
    const khNum = parseFloat(kh);
    const rotationsNum = parseFloat(rotations);
    const timeNum = parseFloat(time);
    const setPowerNum = parseFloat(setPower);

    if (isNaN(khNum) || isNaN(rotationsNum) || isNaN(timeNum) || isNaN(setPowerNum) || khNum <= 0 || rotationsNum <= 0 || timeNum <= 0 || setPowerNum < 0) {
      setError('กรุณากรอกข้อมูลให้ถูกต้อง ค่าทั้งหมดต้องเป็นตัวเลขและมากกว่า 0');
      return;
    }

    setLoading(true);

    try {
      // Power (W) = (n * 3600 * 1000) / (kh * t)
      const calculatedPower = (rotationsNum * 3600 * 1000) / (khNum * timeNum);
      
      const analysis = await getPowerAnalysis(calculatedPower, setPowerNum);
      
      setResult({
        calculatedPower: calculatedPower,
        setPower: setPowerNum,
        analysis: analysis
      });

    } catch (e) {
      console.error(e);
      setError('เกิดข้อผิดพลาดในการเรียก Gemini API กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  }, [formValues]);

  const handleReset = () => {
    setFormValues({ kh: '', rotations: '', time: '', setPower: '' });
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <Header />
        <div className="w-full bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 md:p-8 mt-8 transition-shadow duration-300">
          <InputForm
            formValues={formValues}
            setFormValues={setFormValues}
            onSubmit={handleCalculate}
            onReset={handleReset}
            isLoading={loading}
          />
          {loading && (
             <div className="mt-8 flex flex-col items-center justify-center text-center">
                <LoadingSpinner />
                <p className="mt-4 text-lg font-medium text-sky-600 dark:text-sky-400">กำลังคำนวณและวิเคราะห์ข้อมูล...</p>
             </div>
          )}
          {error && <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 rounded-lg text-center">{error}</div>}
          {result && !loading && (
            <ResultDisplay result={result} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
