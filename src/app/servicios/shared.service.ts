import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  showModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  openModal(): Observable<boolean>{
    this.showModal$.next(true);
    return this.showModal$.asObservable();
  }
  closeModal(): Observable<boolean> {
    this.showModal$.next(false);
    return this.showModal$.asObservable();
  }
}
