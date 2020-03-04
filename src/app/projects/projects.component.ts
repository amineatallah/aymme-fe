import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../shared/modal.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() projects: [] | undefined;
  constructor(private modalService: ModalService, private store: Store<any>) {}

  ngOnInit(): void {
  }

  openCreateProjectModal() {
    this.modalService.projectFormModal();
  }


  deleteProject(projectName: string, event) {
    //this.store.deleteProject(projectName).subscribe();
    event.stopPropagation();
  }
}
