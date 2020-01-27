import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { HomeService } from '../home/home.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as servicesSelectors from '../service/state/services.selectors';
import * as servicesActions from "../service/state/services.actions";
import { tap, catchError } from 'rxjs/operators';
import { Service } from '../service/service.interface';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  readonly services$: Observable<any> = this.store.pipe(select(servicesSelectors.getServices));


  deleteService$: Observable<any>;

  constructor(
    private store: Store<any>,
    private homeService: HomeService,
    private toastr: ToastrService,
    private router: Router) {

      this.dataSource.data = TREE_DATA;
    }

  ngOnInit() {
    this.store.dispatch(new servicesActions.LoadServices());
  }

  deleteService(serviceName: string) {
    this.deleteService$ = this.homeService.deleteService(serviceName).pipe(
      tap(() => {
        this.store.dispatch(new servicesActions.DeleteServiceSuccess(serviceName));

        this.toastr.success('Deleted successfully!', serviceName);
      }),
      catchError ((errorResponse) => {
        this.store.dispatch(new servicesActions.DeleteServiceFailure(errorResponse));
        this.toastr.error('Could not delete the service.', errorResponse );
        return errorResponse;
      })
    );
  }

  setSelectedService(service: Service) {
    this.store.dispatch(new servicesActions.SetSelectedService(service));
    this.router.navigate(['/services', service.serviceName]);
  }

}
