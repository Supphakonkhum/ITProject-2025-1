import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  
  // ข้อมูล trainers เดียวกับใน trainer.component.ts
  trainers: Trainer[] = [
    { 
      id: 1,
      name: 'John Smith', 
      specialty: 'Weight Training', 
      experience: 5,
      age: 28,
      certification: ['NASM-CPT', 'CSCS', 'Precision Nutrition Level 1'],
      bio: 'John เป็นเทรนเนอร์ด้านการยกน้ำหนักที่มีประสบการณ์กว่า 5 ปี เชี่ยวชาญในการสร้างกล้ามเนื้อและการเพิ่มความแข็งแรง มีความเชี่ยวชาญในการออกแบบโปรแกรมการออกกำลังกายที่เหมาะสมกับแต่ละคน John เริ่มต้นการทำงานในวงการฟิตเนสตั้งแต่ปี 2019 และได้รับการรับรองจากหลายสถาบันชั้นนำ',
      image: '',
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
      name: 'Jane Doe', 
      specialty: 'Yoga', 
      experience: 3,
      age: 25,
      certification: ['RYT-200', 'Yin Yoga Certificate', 'Meditation Instructor'],
      bio: 'Jane เป็นครูโยคะที่มีความเชี่ยวชาญในการสอนโยคะทุกระดับ จากผู้เริ่มต้นจนถึงระดับขั้นสูง มีความเชี่ยวชาญพิเศษในด้าน Vinyasa Flow และ Yin Yoga Jane เชื่อในพลังของโยคะที่สามารถเปลี่ยนแปลงชีวิตทั้งร่างกายและจิตใจ',
      image: '',
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
      name: 'Mike Johnson', 
      specialty: 'Cardio', 
      experience: 7,
      age: 32,
      certification: ['ACSM-CPT', 'Spinning Instructor', 'HIIT Specialist'],
      bio: 'Mike เป็นผู้เชี่ยวชาญด้านการออกกำลังกายแบบคาร์ดิโอ มีประสบการณ์ในการสอน HIIT และ Spinning Mike เป็นนักกีฬาระดับแนวหน้าที่หันมาเป็นเทรนเนอร์ เพื่อแบ่งปันความรู้และประสบการณ์ให้กับผู้ที่ต้องการปรับปรุงสุขภาพ',
      image: '',
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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    if (this.trainer) {
      alert(`กำลังจองเซสชั่นกับ ${this.trainer.name}\nเราจะติดต่อกลับภายใน 24 ชั่วโมง`);
    }
  }

  contactTrainer(): void {
    if (this.trainer) {
      alert(`ติดต่อ ${this.trainer.name}\nEmail: ${this.trainer.contactInfo.email}\nPhone: ${this.trainer.contactInfo.phone}`);
    }
  }
}
