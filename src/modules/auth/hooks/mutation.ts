import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeacher } from "../service";
import { CreateTeacher } from "../types";


//===== Create Teacher =====

export function useCreateTeacherMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:CreateTeacher) => createTeacher(data),
        onSuccess(response: any) {
            console.log(response?.message,"success");  
        },
        onSettled: async(_, error) =>{
            if (error) {
                console.log(error?.message , "errorrr");
                
            } else {
                await queryClient.invalidateQueries({queryKey: ["teacher"]})
            }
        }
    })
}