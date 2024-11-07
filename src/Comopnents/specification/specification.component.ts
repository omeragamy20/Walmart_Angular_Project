import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specification',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,CommonModule],
  templateUrl: './specification.component.html',
  styleUrl: './specification.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecificationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { specifications: string[] ,specificationsValues:string[]}
  //  public data2:{specificationsValues:string[]}
) { }
}
