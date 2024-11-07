import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../Services/Language/language.service';

@Component({
  selector: 'app-specification',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,CommonModule],
  templateUrl: './specification.component.html',
  styleUrl: './specification.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecificationComponent implements OnInit{
  lang:string=''
  constructor(@Inject(MAT_DIALOG_DATA) public data: { specifications: string[] ,specificationsValues:string[],
    specificationsValuesAr:string[],
    specificationsAr:string[]
  },private _Language :LanguageService
  //  public data2:{specificationsValues:string[]}
) { }
ngOnInit(): void {
  this._Language.getLangugae().subscribe({
    next: (res) => {
      this.lang = res
    }
  })}
}
