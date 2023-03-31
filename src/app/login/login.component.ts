import { Component } from '@angular/core';
import { PasswordManagerServiceService } from '../password-manager-service.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isError: boolean = false

  constructor(
    private passwordManager: PasswordManagerServiceService,
    private router: Router
  ) { }

  onSubmit(value: any) {
    this.passwordManager.login(value.email, value.password).then(() => {
      this.router.navigate(['/site-list'])
    }).catch((e) => {
      console.log(e)
      this.isError = true
    })
  }

}
