import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  editForm!: FormGroup
  constructor(private authService:AuthService,
    private formBuilder: FormBuilder) {}

    ngOnInit(): void {
      this.initiForm()
    }

  initiForm(){
    this.editForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    
  }

  login() {
      this.authService.login(this.editForm.value).then(res => console.log(res))
    }
}
