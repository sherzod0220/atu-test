// src/service/index.ts
import axiosInstance from "@api";
import { Teacher,UpdateTeacher } from "../types";

// ===== Get Teacher by ID =====
export const getTeacherById = async (teacherId: string) => {
  const response = await axiosInstance.get(`teachers/one/${teacherId}`);
  return response.data as Teacher; // Serverdan qaytadigan ma’lumotlar Teacher tipiga mos
};

// ===== Delete Teacher by ID =====
export const deleteTeacher = async (teacherId: string) => {
    try {
      const response = await axiosInstance.delete(
        `teachers/delete/${teacherId}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Teacher o‘chirishda xatolik:", error.response?.data || error.message);
      throw error;
    }
  };
  
  // ===== Update Teacher by ID =====
export const updateTeacher = async (data: UpdateTeacher) => {
  try {
    const response = await axiosInstance.put(
      `teachers/update`,
      data,
      {
        headers: {
          "Content-Type": "application/json", // Swagger’da ko‘rsatilgan format
          "accept": "*/*",
        },
      }
    );
    return response.data as Teacher;
  } catch (error: any) {
    console.error("Teacher yangilashda xatolik:", error.response?.data || error.message);
    throw error;
  }
};