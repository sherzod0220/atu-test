export interface CreateTeacher {
    id?: number;
    firstName: string,
    lastName: string,
    phone: string,
    pinfl: string,
    degree: string,
    position: string
}

export interface AddFace {
    teacherId: string,
    file: File
}
// export interface SignUp extends SignIn{
//     address: string;
//     email: string;
//     full_name: string;
//     phone_number: string;
// }

// export interface Verification {
//     email: string;
//     verifyToken: string;
// }