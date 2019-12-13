import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get('http://localhost:3000/api/services');
  }

  getServiceEndpoints(serviceName: string) {
    console.log('getservice', serviceName);
    return this.http.get('http://localhost:3000/api/services/' + serviceName);
  }

  getEndpoints() {
    return this.http.get('http://localhost:3000/api/endpoints');
  }

  getEndpoint(id: string) {
    return this.http.get('http://localhost:3000/api/endpoints/' + id);
  }

  updateData(id: string, data: any) {
    console.log('updateData', id, data);
    return this.http.post('http://localhost:3000/api/endpoints/' + id, data, {});
  }

  updateMocks(data: any) {
    return this.http.post('http://localhost:3000/api/mocks', data, {});
  }

  // getMocks() {
  //   return this.http.get('http://localhost:3000/api/mocks');
  // }

  deleteSpecs(id: string) {
    return this.http.delete('http://localhost:3000/api/specs/' + id);
  }

  findMocks(id) {
    return this.http.get('http://localhost:3000/api/findmocks/' + id);
  }

  createSpec(data: any) {
    // console.log('specname', name);
    return this.http.post('http://localhost:3000/api/createspec', data);
  }

  getSpecs() {
    return this.http.get('http://localhost:3000/api/specs');
  }

  deleteService(serviceName: string) {
    return this.http.delete('http://localhost:3000/api/services/' + serviceName);
  }

  deleteEndpointById(id: string) {
    return this.http.delete('http://localhost:3000/api/endpoints/' + id);
  }


  uploadFile(id, files: Array<File>) {
    const formData: FormData = new FormData();
    for (var prop in files) {
      if (Object.prototype.hasOwnProperty.call(files, prop)) {
        console.log('filesss', files[prop]);
        formData.append('files[]', files[prop], files[prop].name);
      }
    }

    return this.http
      .post('http://localhost:3000/api/upload/' + id, formData, {})
  }

  getPortals(){
    return this.http.get('http://localhost:3000/api/getportals');
  }

  getModel(portalName) {
    return this.http.get('http://localhost:3000/api/getmodel/' + portalName);
  }
  syncModel(data) {
    return this.http.post('http://localhost:3000/api/syncmodel', data);
  }

  updateModel(portalName, data){
    return this.http.post('http://localhost:3000/api/updatemodel/' + portalName, data);
  }
}