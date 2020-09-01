import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecatComponent } from './homecat.component';

describe('HomecatComponent', () => {
  let component: HomecatComponent;
  let fixture: ComponentFixture<HomecatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
