import { Component, OnInit } from '@angular/core';

interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  services: ServiceItem[] = [];

  ngOnInit(): void {
    this.services = [
      {
        title: 'นัดหมายกับเทรนเนอร์',
        description: 'จองเวลาเทรนเนอร์ที่คุณต้องการได้ล่วงหน้า',
        icon: '📅'
      },
      {
        title: 'ติดตามผลการฝึก',
        description: 'ดูสถิติและผลลัพธ์ของการฝึกแต่ละครั้ง',
        icon: '📊'
      },
      {
        title: 'ค้นหาเทรนเนอร์',
        description: 'เลือกเทรนเนอร์ที่เหมาะกับเป้าหมายของคุณ',
        icon: '🏋️'
      }
    ];
  }
}
