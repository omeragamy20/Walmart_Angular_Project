import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../../../Services/User/user.service';
import { User } from '../../../../../InterFaces/user';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../../Services/Language/language.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-account-home',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive , TranslateModule,NgIf],
  templateUrl: './account-home.component.html',
  styleUrl: './account-home.component.css'
})
export class AccountHomeComponent implements OnInit{
  lang :string =""
  user:User ={} as User
constructor(private userService:UserService ,private Langser:LanguageService){}
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
  }
}
