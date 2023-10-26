export interface LabsGetResponse {
  data: Labs;
  status: boolean;
  responceTime: string;
}
export interface LabOnePage {
  [key: number]: LabsGetResponse;
  currentPage: number;
}
export interface Lab {
  email: string;
  id: string;
  progress: number;
  startedAt: string;
  status: string;
  name: string;
  experimentName: string;
  courseName: string;
  academicYear: string;
}
export interface Labs {
  result: Lab[];
  next: string | null;
  pervious: string | null;
  count: number;
}
export interface LabPayload {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  academicYear: string;
  city: string;
  gender: string;
  role: string;
  password?: string;
}
export interface LabOneGetResponse {
  data: LabPayload;
  message: string;
  responceTime: string;
  status: boolean;
}

export interface LabsUpdatePayload extends LabPayload {
  id: number;
  index: number;
}
