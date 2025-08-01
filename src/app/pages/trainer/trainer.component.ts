import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  trainers = [
    { name: 'John Smith', specialty: 'Weight Training', experience: 5 },
    { name: 'Jane Doe', specialty: 'Yoga', experience: 3 },
    { name: 'Mike Johnson', specialty: 'Cardio', experience: 7 }
  ];

  constructor() {}

  ngOnInit(): void {}
}
