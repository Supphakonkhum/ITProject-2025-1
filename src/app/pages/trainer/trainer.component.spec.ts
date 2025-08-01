import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerComponent } from './trainer.component';
import { By } from '@angular/platform-browser';

describe('TrainerComponent', () => {
  let component: TrainerComponent;
  let fixture: ComponentFixture<TrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render trainer names', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Smith');
    expect(compiled.textContent).toContain('Jane Doe');
  });

  it('should render correct number of trainer cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.trainer-card'));
    expect(cards.length).toBe(component.trainers.length);
  });
});
