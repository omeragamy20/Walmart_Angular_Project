import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../../../Services/User/user.service';
import { User } from '../../../../../InterFaces/user';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-account-home',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive , TranslateModule],
  templateUrl: './account-home.component.html',
  styleUrl: './account-home.component.css'
})
export class AccountHomeComponent implements OnInit{
  user:User ={} as User
constructor(private userService:UserService){}
  ngOnInit(): void {
    this.userService.GetUserById(sessionStorage.getItem("id")!).subscribe({
      next:(res)=>{
        this.user = res
        
      }
    })
  }
}
