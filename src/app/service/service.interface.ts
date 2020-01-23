export interface Service {
  _id: string;
  serviceName: string;
  endpoints: Endpoints[];
}

export interface Endpoints {
  path: string;
  id: string;
  statusCode: string;
}
