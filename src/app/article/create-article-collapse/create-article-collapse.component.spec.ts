import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticleCollapseComponent } from './create-article-collapse.component';

describe('CreateArticleCollapseComponent', () => {
  let component: CreateArticleCollapseComponent;
  let fixture: ComponentFixture<CreateArticleCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateArticleCollapseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
