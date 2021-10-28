import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryCreationComponent } from './entry-creation.component';

describe('EntryCreationComponent', () => {
  let component: EntryCreationComponent;
  let fixture: ComponentFixture<EntryCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
