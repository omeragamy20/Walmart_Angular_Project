import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-specification',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './specification.component.html',
  styleUrl: './specification.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecificationComponent {

}
