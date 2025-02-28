import axiosInstance from "@api";
// import { ParamsType } from "@types";

// ===== Get Teachers =====

export async function getTeachers(id:number) {
    return await axiosInstance.get(`teachers/one/${id}`, {id});
}


