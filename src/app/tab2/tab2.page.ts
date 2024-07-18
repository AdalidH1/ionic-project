import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {
  photos: any[] = []
  constructor(public photo:PhotoService) {
    this.photos = this.photo.photos
  }

  takePhoto() {
    this.photo.addPhoto()
  }



}
