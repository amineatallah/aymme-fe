import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  body: any;
  data: any;
  portals: any;
  selectedPortal: any;
  portalForm: FormGroup;
  pagesForm: FormGroup;
  private editorHolder: ElementRef;
  public options = new JsonEditorOptions;
  @ViewChildren(JsonEditorComponent) editor: QueryList<JsonEditorComponent>
  constructor(private modalService: NgbModal, private service: HomeService) { }

  ngOnInit() {
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = true;

    this.portalForm = new FormGroup({
      portalName: new FormControl(''),
      portalUrl: new FormControl(''),
      loginUrl: new FormControl('')
    });

    this.pagesForm = new FormGroup({
      activePage: new FormControl('')
    });

    this.service.getPortals().subscribe((portals: any) => {
      this.portals = portals;
      this.selectedPortal = portals[0];
      this.body = this.selectedPortal.pages.find(page => page.name === this.selectedPortal.activePage); 
      this.pagesForm.get('activePage').setValue(this.body.name);
    });


  }
  changePortal($event) {
    this.selectedPortal = this.portals.find(portal => portal.name === $event.target.value);
    this.body = this.selectedPortal.pages[0];
  }

  changePage($event) {
    let page = this.selectedPortal.pages.find(page => page.name === this.pagesForm.get('activePage').value);
    this.body = page.children[0];
  }

  syncModel() {
    this.service.syncModel({ portalName: this.selectedPortal.name, portalUrl: this.selectedPortal.host, loginUrl: this.selectedPortal.loginUrl }).subscribe((val: any) => {
    })
  }

  createPortal(){
    this.service.syncModel(this.portalForm.value).subscribe();
  }
  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {}, (reason) => {
    });
  }

  updateModel(){
    let editorData: any = this.editor.first.get();
    let pages = this.selectedPortal.pages.map(page => {
      if(page.id === editorData.id){
        return editorData;
      } else {
        return page;
      }
    })

    this.service.updateModel(this.selectedPortal.name, {activePage: this.pagesForm.get('activePage').value, pages: JSON.stringify(pages)}).subscribe();
  }
}
