export interface Service {
  _id: string;
  serviceName: string;
  endpoints: Endpoint[];
}

export interface Endpoint {
  path: string;
  id: string;
  statusCode: string;
}
