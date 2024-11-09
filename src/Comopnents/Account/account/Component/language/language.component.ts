import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../../../Services/Language/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [RouterLink,FormsModule,TranslateModule ],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})
export class LanguageComponent {
  lang:string =""
constructor(private _langSer:LanguageService){}
onSubmit(languageForm: NgForm){
  console.log(languageForm.value["language"])
  this.lang =languageForm.value["language"]
  this._langSer.changeLang(this.lang)
}
}
