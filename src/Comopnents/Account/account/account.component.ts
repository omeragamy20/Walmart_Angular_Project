import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { UserService } from '../../../Services/User/user.service';
import { User } from '../../../InterFaces/user';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../Services/Language/language.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatTabsModule , RouterOutlet , RouterLink , TranslateModule ,RouterLinkActive ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  lang:string = ""
  user:User = {} as User
  constructor(private route:Router,private userService:UserService,  private Langser:LanguageService){

  }
  ngOnInit(): void {
    this.userService.GetUserById(sessionStorage.getItem("id")!).subscribe({
      next:(res)=>{
        this.user = res
        
      }

    
    })
    this.Langser.getLangugae().subscribe({
      next:(res)=>{
        this.lang = res
      }
    })

    this.route.navigateByUrl('/account/Acchome')
  }
  SignOut(){
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("authToken")
    this.route.navigateByUrl("/home")
  }

}
