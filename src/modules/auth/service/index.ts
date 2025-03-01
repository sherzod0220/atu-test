// src/service/index.ts
import axiosInstance from "@api";
import { CreateTeacher } from "../types";

// ===== Teacher Create =====
export const createTeacher = async (data: CreateTeacher) => {
  const response = await axiosInstance.post("teachers/create", data);
  return response?.data;
};

// ===== Face Register for Login =====
export const registerFace = async (teacherId: string, faceImage: File) => {
  const formData = new FormData();
  formData.append("file", faceImage); // `curl` va Swagger’da "file" deb nomlangan

  console.log("Yuborilayotgan rasm ma’lumotlari:", {
    name: faceImage.name,
    type: faceImage.type, // Masalan, "image/jpeg" yoki "image/png"
    size: faceImage.size, // Bytes da hajm
  });

  try {
    const response = await axiosInstance.post(
      `v1/teacher/face/register?teacherId=${teacherId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "accept": "*/*",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Server xatosi:", error.response?.data || error.message);
    throw error;
  }
};


// ===== Get Teacher by ID =====
export const getTeacherById = async (teacherId: string) => {
    try {
      const response = await axiosInstance.get(
        `teachers/one/${teacherId}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Teacher olishda xatolik:", error.response?.data || error.message);
      throw error;
    }
  };