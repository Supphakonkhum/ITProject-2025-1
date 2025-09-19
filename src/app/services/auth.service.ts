import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: string;
  registrationDate: Date;
  profileImage?: string;
}

export interface WorkoutSession {
  id: number;
  userId: number;
  date: Date;
  exerciseType: string;
  duration: number; // in minutes
  calories?: number;
  notes?: string;
}

export interface RegistrationHistory {
  id: number;
  userId: number;
  courseId: number;
  courseName: string;
  registrationDate: Date;
  status: 'active' | 'completed' | 'cancelled';
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      fullName: 'Administrator',
      phone: '0123456789',
      registrationDate: new Date('2024-01-01')
    }
  ];

  private workoutSessions: WorkoutSession[] = [];
  private registrationHistories: RegistrationHistory[] = [];

  constructor() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulate API call
      setTimeout(() => {
        const user = this.users.find(u => u.username === username);
        if (user && password === 'password') { // Simple password check for demo
          this.currentUserSubject.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000);
    });
  }

  register(userData: Partial<User>, password: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const existingUser = this.users.find(u => u.username === userData.username || u.email === userData.email);
        if (existingUser) {
          observer.next(false);
        } else {
          const newUser: User = {
            id: this.users.length + 1,
            username: userData.username!,
            email: userData.email!,
            fullName: userData.fullName!,
            phone: userData.phone,
            dateOfBirth: userData.dateOfBirth,
            gender: userData.gender,
            registrationDate: new Date(),
            profileImage: userData.profileImage
          };
          this.users.push(newUser);
          observer.next(true);
        }
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  updateProfile(userData: Partial<User>): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const userIndex = this.users.findIndex(u => u.id === currentUser.id);
          if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...userData };
            const updatedUser = this.users[userIndex];
            this.currentUserSubject.next(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            observer.next(true);
          } else {
            observer.next(false);
          }
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 500);
    });
  }

  // Workout tracking methods
  addWorkoutSession(session: Omit<WorkoutSession, 'id'>): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const newSession: WorkoutSession = {
          ...session,
          id: this.workoutSessions.length + 1
        };
        this.workoutSessions.push(newSession);
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  getWorkoutSessions(userId: number): Observable<WorkoutSession[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const userSessions = this.workoutSessions.filter(s => s.userId === userId);
        observer.next(userSessions);
        observer.complete();
      }, 300);
    });
  }

  // Registration history methods
  addRegistration(registration: Omit<RegistrationHistory, 'id'>): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const newRegistration: RegistrationHistory = {
          ...registration,
          id: this.registrationHistories.length + 1
        };
        this.registrationHistories.push(newRegistration);
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  getRegistrationHistory(userId: number): Observable<RegistrationHistory[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const userRegistrations = this.registrationHistories.filter(r => r.userId === userId);
        observer.next(userRegistrations);
        observer.complete();
      }, 300);
    });
  }
}
