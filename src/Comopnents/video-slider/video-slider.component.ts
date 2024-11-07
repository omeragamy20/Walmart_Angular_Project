import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-slider',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,NgClass],
  templateUrl: './video-slider.component.html',
  styleUrl: './video-slider.component.css'
})
export class VideoSliderComponent {
  videos = [
    {
      // videoUrl: 'D:\Iti rond 2024\Final Project\myrepoAngular\public\videos\Video1.mp4'
      videoUrl: 'https://advertising.walmart.com/thunder/assets/media-service/wcnp-prod/videos/a4522f13-654f-4bb5-82bc-d574ba9ea834/transcode/04a994f5-d5fd-4d46-8f48-6ba17fd4631d/720x1280_PROGRESSIVE_ef5.mp4'
    },
    {
      videoUrl: 'https://advertising.walmart.com/thunder/assets/media-service/wcnp-prod/videos/a2afc1b3-5f9b-46cc-9a24-9b3957edae69/transcode/97ed654e-071b-4004-8455-9edc0748ee13/720x1280_PROGRESSIVE_c3c.mp4'
    },
    {
      videoUrl: 'src/assets/videos/Video3.mp4'
    },
    {
      videoUrl: 'public\videos\Video4.mp4'
    },
    {
      videoUrl:'public\videos\Video5.mp4'
    },
    {
      videoUrl:'public\videos\Video6.mp4'
    },
    {
      videoUrl:'public\videos\Video7.mp4'
    },
    {
      videoUrl:'public\videos\Video8.mp4'
    },
    {
      videoUrl:'public\videos\Video9.mp4'
    },
    {
      videoUrl:'public\videos\Video10.mp4'
    }
  ];


  currentPage = 1;
  itemsPerPage = 4;

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.videos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.videos.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
