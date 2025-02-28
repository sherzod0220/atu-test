import axiosInstance from "@api";
import { CreateTeacher } from "../types";

// ===== Teacher Create =====

export const  createTeacher = async (data:CreateTeacher)=> {
    const response = await axiosInstance.post("teachers/create", data);
    return response?.data
}


