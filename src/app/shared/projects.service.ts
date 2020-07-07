import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(`${this.url}/projects`);
  }

  createProject(projectData) {
    return this.http.post(`${this.url}/projects`, projectData);
  }

  deleteProject(projectName) {
    return this.http.delete(`${this.url}/projects/${projectName}`);
  }

  updateProjectConfig({projectName, data}) {
    return this.http.post(`${this.url}/projects/${projectName}/updateProjectConfig`, data);
  }
}
