import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../Services/Language/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ,TranslateModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
lang:string=''
constructor(private lanSer:LanguageService){

}
  ngOnInit(): void {
    this.lanSer.getLangugae().subscribe({
      next:(res)=>{
        this.lang=res
      }
    })
  }
switchLanguage(lang:string){
  this.lanSer.changeLang(lang);
  
}


}
