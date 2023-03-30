import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordManagerServiceService } from '../password-manager-service.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent {

  siteId!: string
  siteName!: string
  siteURL!: string
  siteImgURL!: string

  passEmail!: string
  passUserName!: string
  Password!: string
  passId!: string

  passwordList!: Observable<Array<any>>
  FormState: string = 'Add New'

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerServiceService) {

    this.route.queryParams.subscribe((value: any) => {
      this.siteId = value.id
      this.siteImgURL = value.siteImgUrl
      this.siteName = value.siteName
      this.siteURL = value.siteURL
    })
    this.loadPassword()
  }

  resetForm() {
    this.passEmail = ""
    this.passUserName = ""
    this.Password = ""
    this.passId = ""
    this.FormState = "Add New"
  }

  submitForm(Data: object) {
    if (this.FormState === 'Add New') {
      this.passwordManagerService.addPassword(Data, this.siteId).then(() => {
        this.resetForm()
        console.log("successfully added the password")
      }).catch((e) => {
        console.log(e.message)
      })
    } else if (this.FormState === 'Edit') {
      this.passwordManagerService.updatePassword(this.siteId, this.passId, Data).then(() => {
        console.log("Updated successfully")
        this.resetForm()
      }).catch((e) => {
        console.log(e)
      })
    }

  }


  loadPassword() {
    this.passwordList = this.passwordManagerService.loadPassword(this.siteId)
  }
  editPassword(email: string, username: string, password: string, id: string) {
    this.passEmail = email
    this.passUserName = username
    this.Password = password
    this.passId = id
    this.FormState = "Edit"
  }
  deletePassword(passwordId: string) {
    this.passwordManagerService.deletePassword(this.siteId, passwordId).then(() => {
      console.log("deleted the password")
    })
  }

}
