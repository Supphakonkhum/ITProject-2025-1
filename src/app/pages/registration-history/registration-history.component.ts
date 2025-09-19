import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegistrationHistory, User } from '../../services/auth.service';

@Component({
  selector: 'app-registration-history',
  templateUrl: './registration-history.component.html',
  styleUrls: ['./registration-history.component.css']
})
export class RegistrationHistoryComponent implements OnInit {
  currentUser: User | null = null;
  registrationHistory: RegistrationHistory[] = [];
  isLoading = true;
  showAddForm = false;

  newRegistration = {
    courseId: 0,
    courseName: '',
    price: 0,
    status: 'active' as 'active' | 'completed' | 'cancelled'
  };

  availableCourses = [
    { id: 1, name: 'โยคะเบื้องต้น', price: 1500 },
    { id: 2, name: 'พิลาทิส', price: 2000 },
    { id: 3, name: 'การออกกำลังกายด้วยน้ำหนัก', price: 2500 },
    { id: 4, name: 'แอโรบิก', price: 1800 },
    { id: 5, name: 'การฝึกกล้ามเนื้อ', price: 3000 },
    { id: 6, name: 'ว่ายน้ำ', price: 2200 },
    { id: 7, name: 'มวยไทย', price: 2800 },
    { id: 8, name: 'ฟิตเนสแบบครบวงจร', price: 3500 }
  ];

  statusOptions = [
    { value: 'active', label: 'กำลังเรียน', color: '#28a745' },
    { value: 'completed', label: 'เรียนจบแล้ว', color: '#17a2b8' },
    { value: 'cancelled', label: 'ยกเลิก', color: '#dc3545' }
  ];

  isAddingRegistration = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadRegistrationHistory();
  }

  loadRegistrationHistory(): void {
    if (!this.currentUser) return;

    this.authService.getRegistrationHistory(this.currentUser.id).subscribe({
      next: (history) => {
        this.registrationHistory = history.sort((a, b) => 
          new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
        );
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'เกิดข้อผิดพลาดในการโหลดข้อมูล';
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
    this.successMessage = '';
    this.errorMessage = '';
  }

  resetForm(): void {
    this.newRegistration = {
      courseId: 0,
      courseName: '',
      price: 0,
      status: 'active'
    };
  }

  onCourseChange(): void {
    const selectedCourse = this.availableCourses.find(c => c.id === +this.newRegistration.courseId);
    if (selectedCourse) {
      this.newRegistration.courseName = selectedCourse.name;
      this.newRegistration.price = selectedCourse.price;
    }
  }

  addRegistration(): void {
    if (!this.currentUser || !this.newRegistration.courseId) {
      this.errorMessage = 'กรุณาเลือกคอร์สเรียน';
      return;
    }

    this.isAddingRegistration = true;
    this.successMessage = '';
    this.errorMessage = '';

    const registrationData = {
      userId: this.currentUser.id,
      courseId: this.newRegistration.courseId,
      courseName: this.newRegistration.courseName,
      registrationDate: new Date(),
      status: this.newRegistration.status,
      price: this.newRegistration.price
    };

    this.authService.addRegistration(registrationData).subscribe({
      next: (success) => {
        this.isAddingRegistration = false;
        if (success) {
          this.successMessage = 'บันทึกการสมัครเรียบร้อยแล้ว';
          this.resetForm();
          this.showAddForm = false;
          this.loadRegistrationHistory();
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
        }
      },
      error: () => {
        this.isAddingRegistration = false;
        this.errorMessage = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('th-TH');
  }

  getStatusLabel(status: string): string {
    const statusOption = this.statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.label : status;
  }

  getStatusColor(status: string): string {
    const statusOption = this.statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.color : '#6c757d';
  }

  getTotalRegistrations(): number {
    return this.registrationHistory.length;
  }

  getActiveRegistrations(): number {
    return this.registrationHistory.filter(r => r.status === 'active').length;
  }

  getCompletedRegistrations(): number {
    return this.registrationHistory.filter(r => r.status === 'completed').length;
  }

  getTotalSpent(): number {
    return this.registrationHistory
      .filter(r => r.status !== 'cancelled')
      .reduce((total, reg) => total + reg.price, 0);
  }

  getRegistrationsByYear(): { [key: string]: RegistrationHistory[] } {
    const grouped: { [key: string]: RegistrationHistory[] } = {};
    
    this.registrationHistory.forEach(registration => {
      const year = new Date(registration.registrationDate).getFullYear().toString();
      
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(registration);
    });
    
    return grouped;
  }

  getYearKeys(): string[] {
    return Object.keys(this.getRegistrationsByYear()).sort((a, b) => +b - +a);
  }
}
