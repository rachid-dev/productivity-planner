import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getEmptyTask } from '../workday.page.store';
import { TaskReadonlyDumbComponent } from './task-readonly.dumb.component';

describe('TaskReadonlyDumbComponent', () => {
  let component: TaskReadonlyDumbComponent;
  let fixture: ComponentFixture<TaskReadonlyDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskReadonlyDumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskReadonlyDumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', getEmptyTask());
    fixture.componentRef.setInput('index', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
