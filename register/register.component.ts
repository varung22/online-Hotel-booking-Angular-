import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private usersService: UserServiceService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          username: ['', Validators.required],
          email: ['',[Validators.required,Validators.email]],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['']
      },{validators: this.checkPasswords});
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  checkPasswords(group: FormGroup) {
    let password = group.get('password').value;
    let confirmPassword = group.get('confirmPassword').value;
    
    return password === confirmPassword ? null : { notSame: true }  
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.usersService.register(this.form.value)
          .pipe(first())
          .subscribe(
              data => {
                  console.log("success");
                  this.router.navigate(['../login'], { relativeTo: this.route });
              },
              error => {
                  console.log(error);
                  this.loading = false;
              });
  }
}