import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, WorkoutSession, User } from '../../services/auth.service';

@Component({
  selector: 'app-workout-history',
  templateUrl: './workout-history.component.html',
  styleUrls: ['./workout-history.component.css']
})
export class WorkoutHistoryComponent implements OnInit {
  currentUser: User | null = null;
  workoutSessions: WorkoutSession[] = [];
  isLoading = true;
  showAddForm = false;
  
  newWorkout = {
    date: new Date().toISOString().split('T')[0],
    exerciseType: '',
    duration: 0,
    calories: 0,
    notes: ''
  };

  exerciseTypes = [
    'วิ่ง',
    'เดิน',
    'ปั่นจักรยาน',
    'ว่ายน้ำ',
    'ยกน้ำหนัก',
    'โยคะ',
    'พิลาทิส',
    'แอโรบิก',
    'กีฬาต่อสู้',
    'อื่นๆ'
  ];

  isAddingWorkout = false;
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
    this.loadWorkoutSessions();
  }

  loadWorkoutSessions(): void {
    if (!this.currentUser) return;

    this.authService.getWorkoutSessions(this.currentUser.id).subscribe({
      next: (sessions) => {
        this.workoutSessions = sessions.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
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
    this.newWorkout = {
      date: new Date().toISOString().split('T')[0],
      exerciseType: '',
      duration: 0,
      calories: 0,
      notes: ''
    };
  }

  addWorkout(): void {
    if (!this.currentUser || !this.newWorkout.exerciseType || !this.newWorkout.duration) {
      this.errorMessage = 'กรุณากรอกข้อมูลที่จำเป็น';
      return;
    }

    this.isAddingWorkout = true;
    this.successMessage = '';
    this.errorMessage = '';

    const workoutData = {
      userId: this.currentUser.id,
      date: new Date(this.newWorkout.date),
      exerciseType: this.newWorkout.exerciseType,
      duration: this.newWorkout.duration,
      calories: this.newWorkout.calories || undefined,
      notes: this.newWorkout.notes || undefined
    };

    this.authService.addWorkoutSession(workoutData).subscribe({
      next: (success) => {
        this.isAddingWorkout = false;
        if (success) {
          this.successMessage = 'บันทึกการออกกำลังกายเรียบร้อยแล้ว';
          this.resetForm();
          this.showAddForm = false;
          this.loadWorkoutSessions();
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
        }
      },
      error: () => {
        this.isAddingWorkout = false;
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

  getTotalWorkouts(): number {
    return this.workoutSessions.length;
  }

  getTotalDuration(): number {
    return this.workoutSessions.reduce((total, session) => total + session.duration, 0);
  }

  getTotalCalories(): number {
    return this.workoutSessions.reduce((total, session) => total + (session.calories || 0), 0);
  }

  getWorkoutsByMonth(): { [key: string]: WorkoutSession[] } {
    const grouped: { [key: string]: WorkoutSession[] } = {};
    
    this.workoutSessions.forEach(session => {
      const monthKey = new Date(session.date).toLocaleDateString('th-TH', { 
        year: 'numeric', 
        month: 'long' 
      });
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(session);
    });
    
    return grouped;
  }

  getMonthKeys(): string[] {
    return Object.keys(this.getWorkoutsByMonth());
  }
}
