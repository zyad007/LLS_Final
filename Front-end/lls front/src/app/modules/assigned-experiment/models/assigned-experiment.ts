export interface AssignedExperimentGetResponse {
  data: AssignedExperiment;
  status: boolean;
  responceTime: string;
}
export interface AssignedExperimentOnePage {
  [key: number]: AssignedExperimentGetResponse;
  currentPage: number;
}
export interface AssignedExperiment {
  courseName: string;
  idd: string;
  isAvailable: boolean;
  name: string;
  reservedAt: string;
  status: string;
}
export interface AssignedExperimentDetails {
  description: string;
  endDate: string;
  idd: string;
  name: string;
  startDate: string;
}
export interface AssignedExperiment {
  result: AssignedExperiment[];
  next: string | null;
  pervious: string | null;
  count: number;
}
