export interface CompletedExperimentGetResponse {
  data: CompletedExperiment;
  status: boolean;
  responceTime: string;
}
export interface CompletedExperimentOnePage {
  [key: number]: CompletedExperimentGetResponse;
  currentPage: number;
}
export interface CompletedExperiment {
  courseName: string;
  grade: number;
  idd: string;
  name: string;
  submitedAt: string;
  feedBack: string;
  status: string;
}
export interface CompletedExperiment {
  result: CompletedExperiment[];
  next: string | null;
  pervious: string | null;
  count: number;
}
