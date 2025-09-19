import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceComponent } from './service.component';
import { By } from '@angular/platform-browser';

describe('ServiceComponent', () => {
  let component: ServiceComponent;
  let fixture: ComponentFixture<ServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // เรียก ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load services on init', () => {
    expect(component.services.length).toBeGreaterThan(0);
  });

  it('should display all service titles in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.services.forEach(service => {
      expect(compiled.textContent).toContain(service.title);
    });
  });

  it('should render correct number of service cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.service-card'));
    expect(cards.length).toBe(component.services.length);
  });
});