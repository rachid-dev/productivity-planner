import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSmartComponent } from './navbar.smart.component';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('NavbarSmartComponent', () => {
  let component: NavbarSmartComponent;
  let fixture: ComponentFixture<NavbarSmartComponent>;

  let navbarTitle: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSmartComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    navbarTitle = fixture.debugElement.query(
      By.css('[data-testid="navbar-title"]'),
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    expect(navbarTitle.nativeElement.textContent).toContain(
      'Productivity Planner',
    );
  });
});
