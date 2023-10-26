import { Experiment } from './show-experiment';
export interface ExperimentDetailsGetResponse {
  data: Experiment;
  loaded: boolean;
  status: boolean;
  responceTime: string;
}
export interface ExperimentDetailsResponse {
  [key: string]: ExperimentDetailsGetResponse;
}
