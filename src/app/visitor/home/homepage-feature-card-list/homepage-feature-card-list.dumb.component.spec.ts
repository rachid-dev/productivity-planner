import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageFeatureCardListDumbComponent } from './homepage-feature-card-list.dumb.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FeatureCardList } from './homepage-feature-card-list.interface';

describe('HomepageFeatureCardListDumbComponent', () => {
  let component: HomepageFeatureCardListDumbComponent;
  let fixture: ComponentFixture<HomepageFeatureCardListDumbComponent>;

  let cardList: DebugElement[];
  let cardTitleList: DebugElement[];
  let cardDescriptionList: DebugElement[];
  let cardIconList: DebugElement[];

  const featureCardList: FeatureCardList = [
    { name: 'Feature 1', description: 'Description 1', icon: 'star' },
    { name: 'Feature 2', description: 'Description 2', icon: 'heart' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageFeatureCardListDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageFeatureCardListDumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("featureCardList", featureCardList)
    fixture.detectChanges();
  });

  beforeEach(() => {
    cardList = fixture.debugElement.queryAll(
      By.css('[data-testid="feature-card"]')
    );

    cardTitleList = fixture.debugElement.queryAll(
      By.css('[data-testid="feature-card-title"]')
    );

    cardDescriptionList = fixture.debugElement.queryAll(
      By.css('[data-testid="feature-card-description"]')
    );

    cardIconList = fixture.debugElement.queryAll(
      By.css('[data-testid="feature-card-icon"]')
    );
    
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of feature cards',() => {
    expect(cardList).toHaveLength(2);
  })

  it('should display nothing if feature list is empty',()=>{
    fixture.componentRef.setInput("featureCardList", []);
    fixture.detectChanges();

    cardList = fixture.debugElement.queryAll(
      By.css('[data-testid="feature-card"]')
    );

    expect(cardList).toHaveLength(0);
  })

  it('should display the correct title in each card',()=>{
    cardTitleList.forEach((cardTitle, index)=>{
      expect(cardTitle.nativeElement.textContent).toContain(featureCardList[index].name);
    })
  })

  it('should display the correct icon in each card',()=>{
    cardIconList.forEach((cardIcon, index) => {
      expect(cardIcon.nativeElement.classList).toContain(`bi`);
      expect(cardIcon.nativeElement.classList).toContain(`bi-${featureCardList[index].icon}`);
    })
  })

  it('should display the correct description in each card',()=>{
    cardDescriptionList.forEach((cardDescription, index) =>{
      expect(cardDescription.nativeElement.textContent).toContain(featureCardList[index].description);
    })
  })
});
