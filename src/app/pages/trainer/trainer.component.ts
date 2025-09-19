import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  trainers: Trainer[] = [
    { 
      id: 1,
      name: 'John Smith', 
      specialty: 'Weight Training', 
      experience: 5,
      age: 28,
      certification: ['NASM-CPT', 'CSCS', 'Precision Nutrition Level 1'],
      bio: 'John เป็นเทรนเนอร์ด้านการยกน้ำหนักที่มีประสบการณ์กว่า 5 ปี เชี่ยวชาญในการสร้างกล้ามเนื้อและการเพิ่มความแข็งแรง',
      image: '',
      achievements: [
        'เหรียญทองการแข่งขันเพาะกาย 2022',
        'Best Trainer Award 2023',
        'ช่วยลูกค้ากว่า 200 คนบรรลุเป้าหมาย'
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
      bio: 'Jane เป็นครูโยคะที่มีความเชี่ยวชาญในการสอนโยคะทุกระดับ จากผู้เริ่มต้นจนถึงระดับขั้นสูง',
      image: '',
      achievements: [
        'Certified Yoga Alliance 500 Hours',
        'Mindfulness Training Certificate',
        'สอนโยคะมากว่า 1,000 ชั่วโมง'
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
      bio: 'Mike เป็นผู้เชี่ยวชาญด้านการออกกำลังกายแบบคาร์ดิโอ มีประสบการณ์ในการสอน HIIT และ Spinning',
      image: '',
      achievements: [
        'Marathon Finisher 2021, 2022, 2023',
        'Triathlon Bronze Medal 2022',
        'ผู้ก่อตั้งโปรแกรม HIIT ยอดนิยม'
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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewTrainerDetail(trainerId: number): void {
    this.router.navigate(['/trainer', trainerId]);
  }

  getStarRating(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    if (hasHalfStar) {
      stars.push('☆');
    }
    
    while (stars.length < 5) {
      stars.push('☆');
    }
    
    return stars;
  }
}