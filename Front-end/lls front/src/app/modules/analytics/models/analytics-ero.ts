export interface AnalyticDetailsGetResponse {
  data: any;
  loaded: boolean;
  status: boolean;
  responceTime: string;
}
export interface AnalyticDetailsResponse {
  [key: string]: AnalyticDetailsGetResponse;
}
