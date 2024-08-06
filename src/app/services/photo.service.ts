import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { ref, getDownloadURL, listAll, getStorage, uploadString } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos:any[] = []

  constructor(private storage: AngularFireStorage) { 
    // this.getImages()
  }

  public async addPhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100
    })

    let imagePath = "unit-3-photo" + Date.now()

    let image = await this.uploadImage(imagePath,photo.dataUrl)


    this.photos.push(image)
  }

  async uploadImage(path: string, data_url: any) {
    const storage = getStorage()
    const storageRef = ref(storage, path)

    return uploadString(storageRef, data_url, 'data_url').then(() => {
      return getDownloadURL(storageRef)
    })
  }

  async getImages() {
    const storage = getStorage()
  }

}
