import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  registerform : FormGroup = new FormGroup({});

  successMsg:any;
  spinner = false;
  messageBox = false;
  message:any;
  responseData:any;
  errorBox = false;
  errorMsg:any;
  userNameCheck:any;
  emailCheck:any;
  imagePath:string;

  constructor(private service:UserService,private router:Router,private route:ActivatedRoute, fb: FormBuilder) {
    this.imagePath = "/assets/image/img.png";

    this.registerform = fb.group (
      {
        userName : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        firstName : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        lastName : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        email : new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]),
        confirmPassword : new FormControl('', Validators.required)
      },
      {
        validators: this.MustMatch('password','confirmPassword')
      }
    )
  }

  get f() {
    return this.registerform.controls;
  }

  MustMatch (password:any, confirmPassword:any) {
    return(formGroup:FormGroup) => {

      const passwordcontrol = formGroup.controls[password];
      const confirmPasswordcontrol = formGroup.controls[confirmPassword];

      if (confirmPasswordcontrol.errors && !confirmPasswordcontrol.errors['MustMatch']) {
        return;
      }

      if (passwordcontrol.value !== confirmPasswordcontrol.value) {
        confirmPasswordcontrol.setErrors({MustMatch:true});
      } else {
        confirmPasswordcontrol.setErrors(null);
      }
    }
  }

  public onSubmit():any {
    this.spinner = true;
    const data = {
      userName: this.registerform.get('userName')?.value,
      firstName: this.registerform.get('firstName')?.value,
      lastName: this.registerform.get('lastName')?.value,
      email: this.registerform.get('email')?.value,
      password: this.registerform.get('password')?.value,
      confirmPassword: this.registerform.get('confirmPassword')?.value,
      otp: null
    }

    this.service.changeObject(data);

    let resp = this.service.doRegistration(data);
    resp.subscribe((data)=> {
      this.message = data;

      if (this.message.responseMessage != null) {
        this.router.navigate(['./otp'])
      }
      this.spinner = false;
    });
  }

  public checkUniqueUserName():any {
    const data = {
      userName: this.registerform.get('userName')?.value,
    }

    let resp = this.service.checkUniqueUserName(data);
    resp.subscribe((data)=> {
      this.userNameCheck=data;

      console.log(this.userNameCheck.responseMessage);

      if (this.userNameCheck.responseMessage != null) {

        this.errorBox = true;
        this.errorMsg = this.userNameCheck.responseMessage;
        setTimeout(()=> {
          this.errorBox = false;
        },5000);
        //this.openSnackBar("User With This Name Already Exists","Close");
      }
    })
  }

  public checkUniqueEmail():any {
    const data = {
      email: this.registerform.get('email')?.value
    }

    let resp = this.service.checkUniqueEmail(data);

    resp.subscribe((data)=> {

      this.emailCheck=data;

      if (this.emailCheck.responseMessage != null) {
        this.errorBox = true;
        this.errorMsg = this.emailCheck.responseMessage;
        setTimeout(()=> {
          this.errorBox = false;
        },5000);
      }
    })
  }

  ngOnInit(): void {

  }

}

