import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  passwordVisible: boolean = false;

  constructor(@Inject(Router) private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])]
    });
  }

  login() {
    this.loading = true;
    let valid = false;
    let form = this.loginForm.getRawValue();
    let usernames = ['admin', 'user', 'renter'];
    let passwords = ['testtest1'];
    if (form.username && form.password && String(usernames).toLowerCase().includes(form.username) && String(passwords).toLowerCase().includes(form.password)) {
      valid = true;
      localStorage.setItem('login', 'true');
      localStorage.setItem('username', form.username);
      localStorage.setItem('password', form.password);
      localStorage.setItem('role', form.username);
    }

    setTimeout(() => {
      if (valid) {
        this.router.navigate(['/home']);
      }
      else {
        this.loading = false;
        this.loginForm.reset();
      }
    }, 2000);
  }
}
