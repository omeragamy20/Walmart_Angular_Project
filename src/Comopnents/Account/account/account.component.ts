import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { UserService } from '../../../Services/User/user.service';
import { User } from '../../../InterFaces/user';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatTabsModule , RouterOutlet , RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  user:User = {} as User
  constructor(private userService:UserService){

  }
  ngOnInit(): void {
    this.userService.GetUserById(sessionStorage.getItem("id")!).subscribe({
      next:(res)=>{
        this.user = res
        
      }
    })
  }


}
