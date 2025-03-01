// src/hooks/queries.ts
import { useQuery } from "@tanstack/react-query";
import { getTeacherById } from "../service";
import { Teacher } from "../types";

export function useTeacherById(teacherId: string | undefined) {
  return useQuery<Teacher, Error>({
    queryKey: ["teacher", teacherId], // Query key’ni "Teacher" o‘rniga "teacher" deb o‘zgartirdim, an‘cha oddiy
    queryFn: () => getTeacherById(teacherId!), // TypeScript uchun ! bilan null emasligini ta’minlash
    enabled: !!teacherId, // Faqat teacherId mavjud bo‘lganda so‘rov yubor
  });
}