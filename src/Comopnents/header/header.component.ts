import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Department {
  name: string;
  parts: string[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,NgFor,NgIf,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  departments: Department[] = [
    { name: 'Savings', parts: ['Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home','Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home','Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home','Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home','Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home','Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home'] },
    { name: 'Grocery', parts: ['Beverages', 'Snacks', 'Frozen Food', 'Dairy'] },
    { name: 'Electronics &Video Games', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Clothing & Accessories', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Home', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Patio & Garden', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Toys', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Personal Care', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Beauty', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Health & wellness', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Baby', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Auto & tires', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Home Improvement', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },

  ];

  // activeDepartment: Department | null = null;

  // setActiveDepartment(department: Department): void {
  //   this.activeDepartment = department;
  // }

  activeDepartment: Department | null = null;
  isDropdownOpen = false;

  setActiveDepartment(department: Department): void {
    this.activeDepartment = department;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
