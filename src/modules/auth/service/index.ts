import axiosInstance from "@api";
import { CreateTeacher } from "../types";

// ===== Teacher Create =====

export const  createTeacher = async (data:CreateTeacher)=> {
    const response = await axiosInstance.post("teachers/create", data);
    return response?.data
}


// ===== Face Register for Login =====
export const registerFace = async (teacherId: string, faceImage: File) => {
    const formData = new FormData();
    formData.append("file", faceImage); // `curl` da "file" deb nomlangan field
  
    try {
      const response = await axiosInstance.post(
        `v1/teacher/face/register?teacherId=${teacherId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "accept": "*/*", // `curl` dagi "accept: */*" ni qo‘shish
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Server xatosi:", error.response?.data || error.message);
      throw error;
    }
  };
