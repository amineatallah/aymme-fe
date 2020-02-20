import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceFormDialogComponent } from './experience-form-dialog.component';

describe('ExperienceFormDialogComponent', () => {
  let component: ExperienceFormDialogComponent;
  let fixture: ComponentFixture<ExperienceFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
