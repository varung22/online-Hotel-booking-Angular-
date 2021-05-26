import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
    // if ((this.usersService.isLoggedIn())) {
    //   this.router.navigate(['/']);
    // } else {
    //   this.router.navigate(['/login']);
    // }

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.usersService.login(this.form.value)
      .subscribe(
        response => {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response));
          this.usersService.loggedIn(response.username);
          this.router.navigate(['/']);
        },
        error => {
          alert("please register before login Or Invalid combination of Username and password");
          console.log(error);
          this.loading = false;
        });
  }
}