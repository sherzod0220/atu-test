import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeacher } from "../service";
import { CreateTeacher } from "../types";
import { Notification } from "@notification";
import { useNavigate } from "react-router-dom";

import { registerFace } from "../service";
import Cookies from "js-cookie";

//===== Create Teacher =====

interface CreateTeacherResponse {
    id: string; // O‘qituvchi ID’si
    message: string; // Muvaffaqiyat xabari
}

export function useCreateTeacherMutation() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<CreateTeacherResponse, Error, CreateTeacher>({
      mutationFn: (data: CreateTeacher) => createTeacher(data),
      onSuccess(response) {
        console.log(response?.message, "success");
        // ID’ni Cookie’ga saqlash
        Cookies.set("teacherId", response.id, { expires: 7 }); // 7 kun davomida saqlash
        Notification({
            type: "success",
            message: "Account created successfully"
          })
          navigate("/");
      },
      onSettled: async (_, error) => {
        if (error) {
          console.log(error?.message, "errorrr");
        } else {
          await queryClient.invalidateQueries({ queryKey: ["teacher"] });
        }
      },
    });
  }




// ===== Face Register Mutation for Login =====


interface RegisterFaceResponse {
    message: string; // Serverdan qaytadigan javob (masalan, "Success")
  }
  
  interface RegisterFaceData {
    teacherId: string;
    faceImage: File;
  }
  
  export function useRegisterFaceMutation() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  
    return useMutation<RegisterFaceResponse, Error, RegisterFaceData>({
      mutationFn: ({ teacherId, faceImage }) => registerFace(teacherId, faceImage),
      onSuccess(response, variables) { // `variables` parametrini qo‘shish
        console.log(response?.message, "Face ID muvaffaqiyatli ro‘yxatdan o‘tdi");
        Cookies.set("teacherId", variables.teacherId, { expires: 7 }); // `variables` dan `teacherId` ni olish
        Notification({
          type: "success",
          message: "Login muvaffaqiyatli!",
        });
        navigate("/main"); // Login muvaffaqiyatli bo‘lganda layout’ga o‘tish
      },
      onError(error: any) {
        console.log("Xatolik ma’lumotlari:", error);
        console.log("Xatolik xabari:", error?.message);
        console.log("Xatolik statusi:", error?.response?.status);
        console.log("Xatolik detallari:", error?.response?.data);
        Notification({
          type: "error",
          message: "Login xatolik yuz berdi! Qayta urinib ko‘ring.",
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(["teacher"]);
      },
    });
  }