import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DryVisualComponent } from './dry-visual.component';

describe('DryVisualComponent', () => {
  let component: DryVisualComponent;
  let fixture: ComponentFixture<DryVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DryVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DryVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
