export interface RoleDetailsGetResponse {
  data: RoleDetails;
  loaded: boolean;
  status: boolean;
  responceTime: string;
}
export interface RoleDetailsResponse {
  [key: string]: RoleDetailsGetResponse;
}
export interface RoleDetails {
  name: string;
  permissions: [];
}
