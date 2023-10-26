import { User } from './users';

export interface UserDetailsGetResponse {
  data: User;
  loaded: boolean;
  status: boolean;
  responceTime: string;
}
export interface UserDetailsResponse {
  [key: string]: UserDetailsGetResponse;
}
