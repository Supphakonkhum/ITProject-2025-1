import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: number;
  level: string;
  image: string;
  tags: string[];
}

interface EnrollmentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions: string;
  experience: string;
  goals: string;
  paymentMethod: string;
  agreeTerms: boolean;
}

@Component({
  selector: 'app-course-enrollment',
  templateUrl: './course-enrollment.component.html',
  styleUrls: ['./course-enrollment.component.css']
})
export class CourseEnrollmentComponent implements OnInit {
  enrollmentForm: FormGroup;
  course: Course | null = null;
  isSubmitting = false;
  showSuccessMessage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.enrollmentForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['courseData']) {
        try {
          this.course = JSON.parse(decodeURIComponent(params['courseData']));
        } catch (error) {
          console.error('Error parsing course data:', error);
          this.router.navigate(['/course']);
        }
      } else {
        this.router.navigate(['/course']);
      }
    });
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      medicalConditions: [''],
      experience: ['', Validators.required],
      goals: ['', [Validators.required, Validators.minLength(10)]],
      paymentMethod: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.enrollmentForm.valid && this.course) {
      this.isSubmitting = true;
      
      const enrollmentData = {
        ...this.enrollmentForm.value,
        courseId: this.course.id,
        courseTitle: this.course.title,
        coursePrice: this.course.price,
        enrollmentDate: new Date().toISOString()
      };

      // Simulate API call
      setTimeout(() => {
        console.log('Enrollment Data:', enrollmentData);
        
        // Save to localStorage (in real app, send to backend)
        const existingEnrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
        existingEnrollments.push(enrollmentData);
        localStorage.setItem('courseEnrollments', JSON.stringify(existingEnrollments));
        
        // Save to registration history
        if (this.course) {
          const registrationHistoryData = {
            id: Date.now(),
            userId: 1, // In real app, get from auth service
            courseId: this.course.id,
            courseName: this.course.title,
            registrationDate: new Date(),
            status: 'active',
            price: this.course.price,
            studentName: `${enrollmentData.firstName} ${enrollmentData.lastName}`,
            email: enrollmentData.email,
            phone: enrollmentData.phone,
            paymentMethod: enrollmentData.paymentMethod
          };
          
          const existingHistory = JSON.parse(localStorage.getItem('registrationHistory') || '[]');
          existingHistory.push(registrationHistoryData);
          localStorage.setItem('registrationHistory', JSON.stringify(existingHistory));
        }
        
        this.isSubmitting = false;
        this.showSuccessMessage = true;
        
        // Redirect to registration history after success
        setTimeout(() => {
          this.router.navigate(['/registration-history']);
        }, 3000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.enrollmentForm.controls).forEach(key => {
      const control = this.enrollmentForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.enrollmentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.enrollmentForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} จำเป็นต้องกรอก`;
      if (field.errors['email']) return 'รูปแบบอีเมลไม่ถูกต้อง';
      if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} ต้องมีอย่างน้อย ${field.errors['minlength'].requiredLength} ตัวอักษร`;
      if (field.errors['pattern']) return 'รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง (10 หลัก)';
      if (field.errors['requiredTrue']) return 'กรุณายอมรับข้อกำหนดและเงื่อนไข';
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'ชื่อ',
      lastName: 'นามสกุล',
      email: 'อีเมล',
      phone: 'เบอร์โทรศัพท์',
      experience: 'ระดับประสบการณ์',
      goals: 'เป้าหมายในการเรียน',
      paymentMethod: 'วิธีการชำระเงิน'
    };
    return labels[fieldName] || fieldName;
  }

  goBack(): void {
    this.router.navigate(['/course']);
  }
}