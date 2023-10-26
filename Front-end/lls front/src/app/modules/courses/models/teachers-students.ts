export interface TeachersStudentsGetResponse {
    data: TeachersStudentsResonse;
    status: boolean;
    responceTime: string;
  }
  export interface TeachersStudentsResonse {
    result: TeacherStudent[];
    count: number;
    next: string | null;
    pervious: string | null;
  }
  export interface TeacherStudent {
    idd: string;
    firstName: string;
    lastname: string;
    email: string;
    role: string;
    phoneNumber: string;
    country: string;
    academicYear: string;
    city: string;
    gender: string;
  }
  export interface TeachersStudentss {
    [key: string | number]: {
      [key: number]: TeachersStudentsGetResponse;
      currentPage: number;
      message: string;
    };
  }
  