export interface ShowExperimentGetResponse {
  data: Experiments;
  status: boolean;
  responceTime: string;
}
export interface Experiments {
  result: Experiment[];
  count: number;
  next: string | null;
  pervious: string | null;
}
export interface Experiment {
  idd: string;
  name: string;
  authorName: string;
  description: string;
  courseIdd: string;
  startDate: string;
  endDate: string;
  updateDate: string;
  hasLLO: boolean;
  relatedCourse: string;
}
export interface ExperimentOnePage {
  [key: number]: ShowExperimentGetResponse;
  currentPage: number;
}
export interface ExperimentPayload {
  name: string;
  description: string;
}
export interface AssignExperimentPayload {
  expIdd: string;
  startDate: string;
  endDate: string;
  numberOfTrials: number;
}
