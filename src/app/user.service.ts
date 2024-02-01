import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private sourceData = new BehaviorSubject<object>({});

  currentData = this.sourceData.asObservable();

  constructor(private http:HttpClient) {

  }

  changeObject(data:any) {
    this.sourceData.next(data);
  }

  public doRegistration(user:any) {
    return this.http.post("http://localhost:9191/users/createUser",user);
  }

  public verifyOTP(user:any) {
    return this.http.post("http://localhost:9191/users/otp",user);
  }

  public resendOTP(user:any) {
    return this.http.put("http://localhost:9191/users/resendotp",user);
  }

  public checkUniqueUserName(user:any) {
    return this.http.put(`http://localhost:9191/users/checkusername`,user);
  }

  public checkUniqueEmail(user:any) {
    return this.http.put(`http://localhost:9191/users/checkemail`,user);
  }
}
