import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm();
  }
  loginForm() {
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onLogIn() {
    if (this.loginFormGroup.value.userName == "9876543210" && this.loginFormGroup.value.password == "Pass@123") {
      this.router.navigate(['create-record/new']);
    } else {
      alert("You are not allowed to login")
    }
  }

}
