import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get(`${this.url}/services`);
  }

  getServiceEndpoints(serviceName: string) {
    return this.http.get(`${this.url}/services/` + serviceName);
  }

  getEndpoint(id: string) {
    return this.http.get(`${this.url}/endpoints/` + id);
  }

  updateEndpoint(id: string, data: any) {
    return this.http.post(`${this.url}/endpoints/` + id, data, {});
  }

  updateMocks(data: any) {
    return this.http.post(`${this.url}/mocks`, data, {});
  }

  deleteSpecs(id: string) {
    return this.http.delete(`${this.url}/specs/` + id);
  }

  findMocks(id) {
    return this.http.get(`${this.url}/findmocks/` + id);
  }

  createSpec(data: any) {
    return this.http.post(`${this.url}/createspec`, data);
  }

  getSpecs() {
    return this.http.get(`${this.url}/specs`);
  }

  deleteService(serviceName: string) {
    return this.http.delete(`${this.url}/services/` + serviceName);
  }

  deleteEndpointById(id: string) {
    return this.http.delete(`${this.url}/endpoints/` + id);
  }


  uploadFile(id, files: Array<File>) {
    const formData: FormData = new FormData();
    for (var prop in files) {
      if (Object.prototype.hasOwnProperty.call(files, prop)) {
        formData.append('files[]', files[prop], files[prop].name);
      }
    }

    return this.http.post(`${this.url}/upload/` + id, formData, {})
  }

  getPortals(){
    return this.http.get(`${this.url}/getportals`);
  }

  deleteExperience(experienceName) {
    return this.http.delete(`${this.url}/portal/` + experienceName);
  }

  syncModel(data) {
    return this.http.post(`${this.url}/syncmodel`, data);
  }

  updateModel(portalName, data){
    return this.http.post(`${this.url}/updatemodel/` + portalName, data);
  }
}
