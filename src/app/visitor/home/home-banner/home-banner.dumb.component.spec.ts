import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerDumbComponent } from './home-banner.dumb.component';
import { By } from '@angular/platform-browser';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';

describe('HomeBannerDumbComponent', () => {
  let component: HomeBannerDumbComponent;
  let fixture: ComponentFixture<HomeBannerDumbComponent>;
  let debugElement: DebugElement;

  let title: DebugElement;
  let description: DebugElement;
  let button: DebugElement;

  const expectedTitle = 'expectedTitle';
  const expectedDescription = 'expectedDescription';
  const expectedButton = 'expectedButton';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBannerDumbComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeBannerDumbComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.componentRef.setInput('title', 'expectedTitle');
    fixture.componentRef.setInput('description', 'expectedDescription');
    fixture.componentRef.setInput('button', 'expectedButton');
    fixture.detectChanges();
  });

  beforeEach(() => {
    title = debugElement.query(By.css('[data-test-id=banner-title]'));
    description = debugElement.query(
      By.css('[data-test-id=banner-description]'),
    );
    button = debugElement.query(By.css('[data-test-id=banner-button]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    expect(title.nativeElement.textContent).toContain(expectedTitle);
  });

  it('should display description', () => {
    expect(description.nativeElement.textContent).toContain(
      expectedDescription,
    );
  });

  it('should display button', () => {
    expect(button.nativeElement.textContent).toContain(expectedButton);
  });

  it('should trigger event on button click', () => {
    jest.spyOn(component.clicked, 'emit');

    button.nativeElement.click();

    expect(component.clicked.emit).toHaveBeenNthCalledWith(1);
  });
});
