// src/hooks/mutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher, updateTeacher } from "../service";
import Notification from "@notification";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Teacher,UpdateTeacher } from "../types"; // Teacher tipini import qilamiz

// ===== Delete Teacher Mutation =====
export function useDeleteTeacherMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (teacherId: string) => deleteTeacher(teacherId),
    onSuccess: () => {
      Notification({
        type: "success",
        title: "Hisob muvaffaqiyatli o‘chirildi!",
      });
      queryClient.invalidateQueries({ queryKey: ["teacher"] }); // Arrayni to'g'ri invalidatsiya qilish
      Cookies.remove("teacherId"); // Cookie’dan teacherId ni o‘chirish
      navigate("/"); // Login sahifasiga qaytish
    },
    onError: (error: unknown) => {
      console.error("Hisob o‘chirishda xatolik:", error);
      Notification({
        type: "error",
        title:
          error instanceof Error
            ? error.message
            : "Hisob o‘chirishda xatolik yuz berdi! Qayta urinib ko‘ring.",
      });
    },
  });
}


// ===== Update Teacher Mutation =====
export function useUpdateTeacherMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTeacher) => updateTeacher(data), // Endi Teacher tipi qabul qiladi
    onSuccess: (updatedTeacher: Teacher) => {
      Notification({
        type: "success",
        title: "Hisob muvaffaqiyatli yangilandi!",
      });
      queryClient.invalidateQueries({ queryKey: ["teacher", String(updatedTeacher.id)] });

      // Ma'lumotlarni optimistik ravishda yangilash
      queryClient.setQueryData(["teacher", String(updatedTeacher.id)], updatedTeacher);
    },
    onError: (error: any) => {
      console.error("Hisob yangilashda xatolik:", error.message);
      Notification({
        type: "error",
        title: "Hisob yangilashda xatolik yuz berdi! Qayta urinib ko‘ring.",
      });
    },
  });
}
