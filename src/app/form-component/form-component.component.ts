import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss'],
})
export class FormComponentComponent {
  myForm : FormGroup;

  constructor(){

    this.myForm = new FormGroup({
      "height": new FormControl(0,  [Validators.required,  Validators.pattern("[0-9]")]),
      "radius": new FormControl(0,  [Validators.required,  Validators.pattern("[0-9]")]),
      "numSegments": new FormControl(0, [Validators.required,  Validators.pattern("[0-9]")])
    });
  }

submit(){
    //
    console.log('this form', this.myForm.value)
  }

}
