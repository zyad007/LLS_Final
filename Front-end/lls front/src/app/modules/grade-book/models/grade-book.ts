export interface GradeBookGetResponse {
  data: GradingBookResponse;
  status: boolean;
  responceTime: string;
}
export interface GradingBook {
  id: string;
  numberOfTials: number;
  email: string;
  feedback: string;
  finalGrade: string;
  name:string;
}
export interface GradingBookResponse {
  result: GradingBook[];
  count: number;
  next: string | null;
  pervious: string | null;
}
// export interface GradingOnePage {
//   [key: number]: GradeBookGetResponse;
//   currentPage: number;
// }

export interface GradingOnePage {
  [key: string | number]: {
    [key: number]: GradeBookGetResponse;
    currentPage: number;
  };
}
export interface Trial {
  id: string;
  isGraded: boolean;
  startedAt: string;
  status: string;
  submitedAt: string;
  totalTimeInMin: number;
}
