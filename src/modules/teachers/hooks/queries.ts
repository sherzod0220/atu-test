import { useQuery } from "@tanstack/react-query"
import { getTeachers } from "../service"
// import { ParamsType } from "@types"
export function useGetTeachers(id:number){
    return useQuery({
        queryKey: ["teachers", id],
        queryFn: () => getTeachers(id),
    })
}