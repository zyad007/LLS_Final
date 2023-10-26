export interface AnalyticsGetResponse {
  data: Analytics;
  status: boolean;
  responceTime: string;
}
export interface AnalyticOnePage {
  [key: number]: AnalyticsGetResponse;
  currentPage: number;
}
export interface Analytice {
  authorName: string;
  idd: string;
  startDate: string;
  endDate: string;
  name: string;
  courseName: string;
}
export interface Analytics {
  result: Analytice[];
  next: string | null;
  pervious: string | null;
  count: number;
}
export interface AnalyticePayload {
  name: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
}
export interface AnalyticeOneGetResponse {
  data: AnalyticePayload;
  message: string;
  responceTime: string;
  status: boolean;
}

export interface AnalyticsUpdatePayload extends AnalyticePayload {
  id: number;
  index: number;
}
