import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { ApiService } from '../api.service';

import { map } from 'rxjs/operators'


@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss'],
})
export class FormComponentComponent {
  myForm : FormGroup;
  apiService: ApiService;


  constructor(apiService: ApiService){
    this.apiService = apiService;
    const floatExpr = "([0-9]*[.])?[0-9]+";
    this.myForm = new FormGroup({
      "height": new FormControl(0,  [Validators.required,  Validators.pattern(floatExpr)]),
      "radius": new FormControl(0,  [Validators.required,  Validators.pattern(floatExpr)]),
      "numSegments": new FormControl(0, [Validators.required,  Validators.pattern("[0-9]+")])
    });
  }

  submit(){
    let params = this.myForm.value;
    console.log("params", params);
    this.apiService.getData().subscribe(el => console.log("apiService returned: ", el));
  }
}
