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

  constructor(private passwordManagerService: PasswordManagerServiceService) { }
  ngOnInit(): void {
    this.loadSites()
  }

  onSubmit(values: object) {
    if (this.formState === "Add New") {
      this.passwordManagerService.addSite(values).then(() => {
        console.log('Data saved successfully')
      }).catch((error) => {
        console.log('Error')
      })
    } else if (this.formState === 'Edit') {
      this.passwordManagerService.updateDoc(this.siteId, values).then(() => {
        console.log("Data updated")
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
      console.log("successfully Deleted the post");
    }).catch((e) => {
      console.log(e.message)
    })
  }


}
