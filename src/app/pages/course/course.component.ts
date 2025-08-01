import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  courses = [
    { id: 1, title: 'Angular Basics', description: 'เรียนรู้พื้นฐาน Angular ตั้งแต่เริ่มต้น', duration: '5 ชั่วโมง' },
    { id: 2, title: 'TypeScript for Devs', description: 'เข้าใจการใช้งาน TypeScript อย่างลึกซึ้ง', duration: '3 ชั่วโมง' },
    { id: 3, title: 'Advanced Angular', description: 'เจาะลึก Angular Routing, Services และ RxJS', duration: '7 ชั่วโมง' },
  ];
}
