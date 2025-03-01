export interface Teacher {
  id?: number | string; // Number yoki string bo‘lishi mumkin
  firstName: string;
  lastName: string;
  phone: string;
  pinfl: string;
  degree: string;
  position: string;
}

// ======= Update Teacher
export interface UpdateTeacher {
  id?: number | string;
  firstName: string,
  lastName: string,
  phone: string,
  pinfl: string,
  degree: string,
  position: string
}