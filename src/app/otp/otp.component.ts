import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  userModel = new User('','','','','','','');

  form:any;
  message:any;
  spinner = false;
  messageBox = false;
  errorBox = false;
  values:any;
  successMsg:any;
  errorMsg:any;
  registerform:any;

  data:any;

  constructor(private service:UserService, private router:Router, private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.service.currentData.subscribe(data => {
      this.data = data;
    });
  }

  move(event:any, previous:any, current:any, next:any) {
    console.log(event)
    var length = current.value.length;
    var maxlength = current.getAttribute('maxlength');

    if (length == maxlength) {
      if (next != "") {
        next.focus();
      }
    }

    if (event.key === "Backspace") {
      if (previous != "") {
        previous.focus();
      }
    }
  }

  public onSubmit (otp1:any, otp2:any, otp3:any, otp4:any, otp5:any, otp6:any):any {

    let otp = otp1+ "" +otp2+ "" +otp3+ "" +otp4+ "" +otp5+ "" +otp6;

    this.data.otp = otp;

    if (otp1 && otp2 && otp3 && otp4 && otp5 && otp6 != null) {
      this.spinner = true;
      let resp = this.service.verifyOTP(this.data);
      resp.subscribe((data) => {
        this.message = data;

        this.spinner = false;

        if (this.message.responseMessage === "Wrong OTP") {

          this.errorMsg = "";
          this.errorBox = true;

          this.errorMsg = "Wrong OTP";
          setTimeout(()=> {
            this.errorBox = false;
            this.errorMsg = "";
          },5000);

        } else {
          this.router.navigate(['./welcome'])
        }
      });

    } else {
      this.errorBox = true;
      this.errorMsg = "Write Valid OTP";
      setTimeout(()=> {
        this.errorBox = false;
      },5000);
    }
  }

  public resendOTP (otp1:any, otp2:any, otp3:any, otp4:any, otp5:any, otp6:any):any {

    this.spinner = true;

    otp1.value = '';
    otp2.value = '';
    otp3.value = '';
    otp4.value = '';
    otp5.value = '';
    otp6.value = '';

    let resp = this.service.resendOTP(this.data);
    resp.subscribe((data)=> {
      this.message=data;

      this.successMsg = this.message.responseMessage;

      this.messageBox = true;

      setTimeout(()=> {
        this.messageBox = false;
      },5000);

      this.spinner = false;
    });
  }
}








