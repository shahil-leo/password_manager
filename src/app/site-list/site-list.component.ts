import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordManagerServiceService } from '../password-manager-service.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {

  allSites!: Observable<Array<any>>

  siteName!: string
  siteURL!: string
  siteImgUrl!: string
  siteId!: string

  formState: string = 'Add New'
  isSuccess: boolean = false
  successMessage!: string
  constructor(private passwordManagerService: PasswordManagerServiceService) { }

  showAlert(message: string) {
    this.isSuccess = true
    this.successMessage = message
  }

  ngOnInit(): void {
    this.loadSites()
  }

  onSubmit(values: object) {
    if (this.formState === "Add New") {
      this.passwordManagerService.addSite(values).then(() => {
        this.showAlert("Data added successfully")
      }).catch((error) => {
        console.log('Error')
      })
    } else if (this.formState === 'Edit') {
      this.passwordManagerService.updateDoc(this.siteId, values).then(() => {
        this.showAlert("Data updated successfully")
      }).catch((error) => {
        console.log(error)
      })
    }


  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites()
  }

  editSite(siteName: string, siteURL: string, siteImgUrl: string, siteId: string) {
    this.formState = 'Edit'
    this.siteName = siteName
    this.siteId = siteId
    this.siteURL = siteURL
    this.siteImgUrl = siteImgUrl
  }

  deleteSite(id: string) {
    this.passwordManagerService.deleteSite(id).then(() => {
      this.showAlert("Data Deleted successfully")
    }).catch((e) => {
      console.log(e.message)
    })
  }



}
