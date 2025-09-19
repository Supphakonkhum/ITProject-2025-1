import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  image: string;
  price: number;
  level: string;
  tags: string[];
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Course[] = [
    { 
      id: 1, 
      title: 'Basic Fitness Training', 
      description: 'เริ่มต้นการออกกำลังกายอย่างถูกต้อง สร้างพื้นฐานที่แข็งแรงให้กับร่างกาย', 
      duration: '45 นาที',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 1500,
      level: 'เริ่มต้น',
      tags: ['ฟิตเนส', 'เริ่มต้น', 'พื้นฐาน']
    },
    { 
      id: 2, 
      title: 'Cardio Workout', 
      description: 'เผาผลาญไขมันและเพิ่มความแข็งแรงของหัวใจด้วยการออกกำลังกายแบบแอโรบิก', 
      duration: '30 นาที',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 1200,
      level: 'กลาง',
      tags: ['คาร์ดิโอ', 'เผาไขมัน', 'หัวใจ']
    },
    { 
      id: 3, 
      title: 'Strength Training', 
      description: 'สร้างกล้ามเนื้อและเพิ่มความแข็งแรงด้วยเทคนิคการยกน้ำหนักที่ถูกต้อง', 
      duration: '60 นาที',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 2000,
      level: 'สูง',
      tags: ['กล้ามเนื้อ', 'น้ำหนัก', 'ความแข็งแรง']
    },
    {
      id: 4,
      title: 'Yoga & Flexibility',
      description: 'เพิ่มความยืดหยุ่นและความสมดุลของร่างกายด้วยท่าโยคะ',
      duration: '50 นาที',
      image: 'https://gymbeam.sk/blog/wp-content/uploads/2023/05/iStock-1455669523-1124x660.jpg',
      price: 1300,
      level: 'เริ่มต้น',
      tags: ['โยคะ', 'ยืดหยุ่น', 'สมดุล']
    },
    {
      id: 5,
      title: 'HIIT Training',
      description: 'การออกกำลังกายแบบ High Intensity สำหรับการเผาผลาญไขมันสูงสุด',
      duration: '25 นาที',
      image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 1800,
      level: 'สูง',
      tags: ['HIIT', 'เข้มข้น', 'เผาไขมัน']
    },
    {
      id: 6,
      title: 'Functional Training',
      description: 'พัฒนาความแข็งแรงและการเคลื่อนไหวที่ใช้ในชีวิตประจำวัน',
      duration: '55 นาที',
      image: 'https://cdn.centr.com/content/26000/25412/images/landscapewidedesktop1x-ec41255412947b51796bd952c5bafe04-ic-what-is-functional-training-inline-6-169-16922.jpg',
      price: 1700,
      level: 'กลาง',
      tags: ['ฟังก์ชั่น', 'ชีวิตประจำวัน', 'การเคลื่อนไหว']
    }
  ];

  courseBenefits: Benefit[] = [
    {
      icon: '�',
      title: 'เทรนเนอร์มืออาชีพ',
      description: 'ฝึกกับเทรนเนอร์ที่ได้รับการรับรองและมีประสบการณ์สูง'
    },
    {
      icon: '🏋️',
      title: 'อุปกรณ์ครบครัน',
      description: 'อุปกรณ์ออกกำลังกายทันสมัยและหลากหลาย'
    },
    {
      icon: '�',
      title: 'ติดตามผลลัพธ์',
      description: 'วัดผลและติดตามความก้าวหน้าของร่างกายอย่างชัดเจน'
    },
    {
      icon: '🏆',
      title: 'โปรแกรมส่วนตัว',
      description: 'โปรแกรมการออกกำลังกายที่ปรับตามความต้องการ'
    },
    {
      icon: '👥',
      title: 'ชุมชนสุขภาพดี',
      description: 'เข้าร่วมกลุ่มผู้ที่รักการออกกำลังกายและแลกเปลี่ยนประสบการณ์'
    },
    {
      icon: '📞',
      title: 'ปรึกษาได้ทุกเวลา',
      description: 'ให้คำปรึกษาด้านสุขภาพและการออกกำลังกายตลอด 24 ชั่วโมง'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getEnrollmentCount(courseId: number): number {
    const counts = [120, 85, 150, 95, 110, 75];
    return counts[courseId - 1] || 50;
  }

  getLevelColor(level: string): string {
    switch (level.toLowerCase()) {
      case 'beginner':
      case 'เริ่มต้น':
        return 'linear-gradient(135deg, #4CAF50, #66BB6A)';
      case 'intermediate':
      case 'กลาง':
        return 'linear-gradient(135deg, #FF9800, #FFB74D)';
      case 'advanced':
      case 'สูง':
        return 'linear-gradient(135deg, #F44336, #EF5350)';
      default:
        return 'linear-gradient(135deg, #4CAF50, #66BB6A)';
    }
  }

  enrollCourse(course: Course): void {
    // ส่งข้อมูลคอร์สไปหน้าสมัครเรียนผ่าน query parameters
    const courseData = encodeURIComponent(JSON.stringify(course));
    this.router.navigate(['/course-enrollment'], { 
      queryParams: { courseData: courseData }
    });
  }
}