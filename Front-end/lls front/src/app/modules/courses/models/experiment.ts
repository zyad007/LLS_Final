export interface ExperimentGetResponse {
  data: ExperimentResonse;
  status: boolean;
  responceTime: string;
}
export interface ExperimentResonse {
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
  courseName: string;
  courseIdd: string;
  startDate: string;
  endDate: string;
  updateDate: string;
}

export interface Experiments {
  [key: string | number]: {
    [key: number]: ExperimentGetResponse;
    currentPage: number;
    // message: string;
  };
}
