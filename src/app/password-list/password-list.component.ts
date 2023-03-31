import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordManagerServiceService } from '../password-manager-service.service';
import { AES, enc } from 'crypto-js';

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

  passwordList!: Array<any>
  FormState: string = 'Add New'

  constructor(
    private route: ActivatedRoute,
    private passwordManagerService: PasswordManagerServiceService,
  ) {
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

  submitForm(Data: any) {
    console.log(Data);

    const encryptedPassword = this.encryptPassword(Data.password)
    Data.password = encryptedPassword
    console.log(Data);

    if (this.FormState === 'Add New') {
      this.passwordManagerService.addPassword(Data, this.siteId).then(() => {
        this.resetForm()
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
    this.passwordManagerService.loadPassword(this.siteId).subscribe((value) => {
      this.passwordList = value
    })
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

  encryptPassword(password: string) {
    const secretKey = 'TjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8'
    const encryptPassword = AES.encrypt(password, secretKey).toString()
    return encryptPassword
  }
  decryptPassword(password: string) {
    const secretKey = 'TjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8'
    const decryptPassword = AES.decrypt(password, secretKey).toString(enc.Utf8)
    return decryptPassword
  }

  onDecrypt(password: string, i: number) {
    const decryptPassword = this.decryptPassword(password)
    this.passwordList[i].password = decryptPassword
  }


}
