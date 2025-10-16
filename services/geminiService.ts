
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getPowerAnalysis = async (calculatedPower: number, setPower: number): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not set");
  }

  const difference = calculatedPower - setPower;
  const prompt = `
    คุณคือผู้เชี่ยวชาญด้านการใช้พลังงานไฟฟ้า โปรดวิเคราะห์ผลการเปรียบเทียบกำลังไฟฟ้าที่วัดได้จากมิเตอร์กับการกำลังไฟฟ้าของอุปกรณ์ที่ผู้ใช้กำหนด
    
    ข้อมูลที่ได้รับ:
    - กำลังไฟฟ้าที่คำนวณได้จากมิเตอร์: ${calculatedPower.toFixed(2)} วัตต์
    - กำลังไฟฟ้าของอุปกรณ์ที่ตั้งค่าไว้: ${setPower.toFixed(2)} วัตต์
    - ผลต่าง: ${difference.toFixed(2)} วัตต์
    
    โปรดให้คำอธิบายและวิเคราะห์ผลลัพธ์นี้อย่างกระชับ ไม่เกิน 3-4 ประโยค โดยพิจารณาตามแนวทางต่อไปนี้:
    1.  เริ่มต้นด้วยการสรุปผลการเปรียบเทียบอย่างชัดเจน
    2.  หากค่าที่วัดได้สูงกว่าค่าที่ตั้งไว้ ให้สันนิษฐานสาเหตุที่เป็นไปได้ เช่น อาจมีอุปกรณ์ไฟฟ้าอื่น ๆ ทำงานอยู่เบื้องหลัง, ประสิทธิภาพของอุปกรณ์หลักลดลงตามอายุการใช้งาน, หรือมิเตอร์อาจมีความคลาดเคลื่อนเล็กน้อย
    3.  หากค่าที่วัดได้ต่ำกว่าค่าที่ตั้งไว้ ให้สันนิษฐานสาเหตุ เช่น อุปกรณ์อาจกำลังทำงานในโหมดประหยัดพลังงานหรือไม่ทำงานเต็มกำลัง
    4.  หากค่าใกล้เคียงกัน (ผลต่างไม่เกิน 10%) ให้ระบุว่าเป็นเรื่องปกติและยอมรับได้
    5.  ใช้ภาษาที่เป็นมิตร เข้าใจง่าย และตอบเป็นภาษาไทยเท่านั้น
    `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("ไม่สามารถรับการวิเคราะห์จาก AI ได้");
  }
};
