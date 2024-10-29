import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-lay-out',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './home-lay-out.component.html',
  styleUrl: './home-lay-out.component.css'
})
export class HomeLayOutComponent {

}
