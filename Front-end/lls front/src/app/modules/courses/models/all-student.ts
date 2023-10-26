export interface AllStudentGetResponse {
    data: AllStudentResonse;
    status: boolean;
    responceTime: string;
  }
  export interface AllStudentResonse {
    result: AllStudent[];
    count: number;
    next: string | null;
    pervious: string | null;
  }
  export interface AllStudent {
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
  export interface AllStudents {
    [key: string | number]: {
      [key: number]: AllStudentGetResponse;
      currentPage: number;
      message: string;
    };
  }
  