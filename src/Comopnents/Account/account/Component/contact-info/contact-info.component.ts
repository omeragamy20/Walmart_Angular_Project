import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../../../Services/User/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../../InterFaces/user';
import { ResetPassword } from '../../../../../InterFaces/reset-password';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [RouterLink , FormsModule ,RouterLinkActive ,TranslateModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent implements OnInit  {
  success:string =" "
  id:string =""
  user:User ={} as User
  ResetPass : ResetPassword ={} as ResetPassword
   msg = document.getElementById("Massage")
 constructor(private userSer:UserService , private r:Router ){}


  ngOnInit(): void {
    this.id = sessionStorage.getItem("id")! 
    if(this.id != null){
      this.userSer.GetUserById(this.id).subscribe({
        next:(res)=>{
          this.user = res 
          
        }
      })
    }
  }




  UpdateUserInfo(){
    this.userSer.UpdateUser(this.user).subscribe({
      next:()=>{
        setTimeout(()=>{
          
          this.r.navigateByUrl('/account')
        },2000)
      },error:(rej)=>{
 
      }
    })
  }


  RestPassord(){
    this.userSer.ResetPassword(this.ResetPass , this.id).subscribe({
      next:()=>{
        setTimeout(()=>{
          this.r.navigateByUrl('/account')
        },2000)
      },error:(rej)=>{
      }
    })
  }




}
