import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  age: number;
  certification: string[];
  bio: string;
  image: string;
  achievements: string[];
  schedule: string[];
  rating: number;
  reviewCount: number;
  contactInfo: {
    email: string;
    phone: string;
  };
}

@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.component.html',
  styleUrls: ['./trainer-detail.component.css']
})
export class TrainerDetailComponent implements OnInit {
  trainer: Trainer | null = null;
  showBookingModal = false;
  bookingForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.bookingForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      sessionDate: ['', Validators.required],
      sessionTime: ['', Validators.required],
      sessionType: ['', Validators.required],
      goals: [''],
      notes: ['']
    });
  }
  
  // ข้อมูล trainers เดียวกับใน trainer.component.ts
  trainers: Trainer[] = [
    { 
      id: 1,
      name: 'Pranthep Roongpromma', 
      specialty: 'Weight Training', 
      experience: 5,
      age: 28,
      certification: ['NASM-CPT', 'CSCS', 'Precision Nutrition Level 1'],
      bio: 'Pranthep Roongpromma เป็นเทรนเนอร์ด้านการยกน้ำหนักที่มีประสบการณ์กว่า 5 ปี เชี่ยวชาญในการสร้างกล้ามเนื้อและการเพิ่มความแข็งแรง มีความเชี่ยวชาญในการออกแบบโปรแกรมการออกกำลังกายที่เหมาะสมกับแต่ละคน Pranthep เริ่มต้นการทำงานในวงการฟิตเนสตั้งแต่ปี 2019 และได้รับการรับรองจากหลายสถาบันชั้นนำ',
      image: 'https://bestkru-thumbs.s3-ap-southeast-1.amazonaws.com/112772',
      achievements: [
        'เหรียญทองการแข่งขันเพาะกาย 2022',
        'Best Trainer Award 2023',
        'ช่วยลูกค้ากว่า 200 คนบรรลุเป้าหมาย',
        'Transformation Coach of the Year 2023'
      ],
      schedule: ['จันทร์-ศุกร์ 6:00-20:00', 'เสาร์-อาทิตย์ 8:00-18:00'],
      rating: 4.8,
      reviewCount: 150,
      contactInfo: {
        email: 'john.smith@fitness.com',
        phone: '02-123-4567'
      }
    },
    { 
      id: 2,
      name: 'Kru ZomO', 
      specialty: 'Yoga', 
      experience: 3,
      age: 25,
      certification: ['RYT-200', 'Yin Yoga Certificate', 'Meditation Instructor'],
      bio: 'Kru ZomO เป็นครูโยคะที่มีความเชี่ยวชาญในการสอนโยคะทุกระดับ จากผู้เริ่มต้นจนถึงระดับขั้นสูง มีความเชี่ยวชาญพิเศษในด้าน Vinyasa Flow และ Yin Yoga Kru ZomO เชื่อในพลังของโยคะที่สามารถเปลี่ยนแปลงชีวิตทั้งร่างกายและจิตใจ',
      image: 'https://bestkru-thumbs.s3-ap-southeast-1.amazonaws.com/97443',
      achievements: [
        'Certified Yoga Alliance 500 Hours', 
        'Mindfulness Training Certificate',
        'สอนโยคะมากว่า 1,000 ชั่วโมง',
        'Yoga Teacher of the Month 2023'
      ],
      schedule: ['จันทร์-ศุกร์ 7:00-19:00', 'เสาร์-อาทิตย์ 9:00-17:00'],
      rating: 4.9,
      reviewCount: 98,
      contactInfo: {
        email: 'jane.doe@fitness.com',
        phone: '02-234-5678'
      }
    },
    { 
      id: 3,
      name: 'Kru ae', 
      specialty: 'Cardio', 
      experience: 7,
      age: 32,
      certification: ['ACSM-CPT', 'Spinning Instructor', 'HIIT Specialist'],
      bio: 'Kru ae เป็นผู้เชี่ยวชาญด้านการออกกำลังกายแบบคาร์ดิโอ มีประสบการณ์ในการสอน HIIT และ Spinning Kru ae เป็นนักกีฬาระดับแนวหน้าที่หันมาเป็นเทรนเนอร์ เพื่อแบ่งปันความรู้และประสบการณ์ให้กับผู้ที่ต้องการปรับปรุงสุขภาพ',
      image: 'https://bestkru-thumbs.s3-ap-southeast-1.amazonaws.com/203647',
      achievements: [
        'Marathon Finisher 2021, 2022, 2023',
        'Triathlon Bronze Medal 2022',
        'ผู้ก่อตั้งโปรแกรม HIIT ยอดนิยม',
        'Cardio Specialist Award 2023'
      ],
      schedule: ['จันทร์-ศุกร์ 5:30-21:00', 'เสาร์-อาทิตย์ 7:00-19:00'],
      rating: 4.7,
      reviewCount: 203,
      contactInfo: {
        email: 'mike.johnson@fitness.com',
        phone: '02-345-6789'
      }
    }
  ];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.trainer = this.trainers.find(t => t.id === id) || null;
    
    if (!this.trainer) {
      this.router.navigate(['/trainer']);
    }
  }

  goBack(): void {
    this.router.navigate(['/trainer']);
  }

  getStarRating(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('☆');
      } else {
        stars.push('☆');
      }
    }
    
    return stars;
  }

  bookSession(): void {
    this.showBookingModal = true;
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
    this.bookingForm.reset();
  }

  onSubmitBooking(): void {
    if (this.bookingForm.valid && this.trainer) {
      const bookingData = {
        trainerId: this.trainer.id,
        trainerName: this.trainer.name,
        trainerSpecialty: this.trainer.specialty,
        ...this.bookingForm.value,
        bookingDate: new Date().toISOString(),
        status: 'pending'
      };

      // บันทึกข้อมูลการจองใน localStorage
      const existingBookings = JSON.parse(localStorage.getItem('trainerBookings') || '[]');
      existingBookings.push(bookingData);
      localStorage.setItem('trainerBookings', JSON.stringify(existingBookings));

      alert(`จองเซสชั่นกับ ${this.trainer.name} เรียบร้อยแล้ว!\nเราจะติดต่อกลับภายใน 24 ชั่วโมง`);
      this.closeBookingModal();
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }

  getFormError(fieldName: string): string {
    const field = this.bookingForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return 'กรุณากรอกข้อมูลนี้';
      if (field.errors['email']) return 'รูปแบบอีเมลไม่ถูกต้อง';
      if (field.errors['minlength']) return 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร';
      if (field.errors['pattern']) return 'เบอร์โทรต้องเป็นตัวเลข 10 หลัก';
    }
    return '';
  }

  contactTrainer(): void {
    if (this.trainer) {
      alert(`ติดต่อ ${this.trainer.name}\nEmail: ${this.trainer.contactInfo.email}\nPhone: ${this.trainer.contactInfo.phone}`);
    }
  }
}
