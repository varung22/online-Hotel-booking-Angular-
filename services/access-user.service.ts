import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class AccessUserService {

  @Output() 
  getLoggedInName: EventEmitter<any> = new EventEmitter();


  login(email: string): boolean {
    this.getLoggedInName.emit(email);
    return true;
  }
}
