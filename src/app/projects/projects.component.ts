import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectForm: FormGroup;
  @Input() projects: [] | undefined;
  constructor(private modalService: NgbModal, private projectsService: ProjectsService) {}

  ngOnInit(): void {

    this.projectForm = new FormGroup({
      projectName: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  createProject() {
    this.projectsService.createProject(this.projectForm.value).subscribe(val => {
    });
  }

  deleteProject(projectName: string) {
    this.projectsService.deleteProject(projectName).subscribe();
  }
}
