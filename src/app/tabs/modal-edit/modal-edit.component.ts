import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/servicios/product.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  @Input() item: any;
  _id!: string;
  code!: string;
  name!: string;
  category!: string;
  description!: string;
  price!: number;
  amount!: number;

  formGroup!: FormGroup;
  isDisabled: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    console.log(this.item);

    if (this.item) {
      this._id = this.item._id;
      this.code = this.item.code;
      this.name = this.item.name;
      this.category = this.item.category;
      this.description = this.item.description;
      this.price = this.item.price;
      this.amount = this.item.amount;
    }
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.name || '', Validators.required],
      code: [this.code || '', Validators.required],
      category: [this.category || '', Validators.required],
      description: [this.description || '', Validators.required],
      price: [this.price || '', Validators.required],
      amount: [this.amount || '', Validators.required],
    });
  }

  // async presentToast(message: string, color: string) {
  //   const toast = await this.toastController.create({
  //     message: message,
  //     duration: 2000,
  //     color: color,
  //   });
  //   toast.present();
  // }

  confirm() {
    let request = {
      id: this._id,
      name: this.name,
      code: this.code,
      category: this.category,
      description: this.description,
      price: this.price,
      amount: this.amount,
    };

    try {
      this.productService.editProduct(request).subscribe(
        (item) => {
          console.log(item);
          // this.presentToast('Producto actualizado exitosamente', 'success');
          this.modalCtrl.dismiss('confirm');
        },
        (error) => {
          console.log(error);
          // this.presentToast('Error al actualizar el producto', 'danger');
        }
      );
    } catch (error) {
      console.log(error);
      // this.presentToast('Un error ha ocurrido', 'danger');
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
