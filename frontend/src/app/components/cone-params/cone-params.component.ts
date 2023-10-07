import {Component} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { ApiService } from '../../services/api.service';

type Params = {
  height: number,
  radius: number,
  numSegments: number
}

@Component({
  selector: 'app-cone-params',
  templateUrl: './cone-params.component.html',
  styleUrls: ['./cone-params.component.scss'],
})
export class ConeParamsComponent {
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
    this.apiService.getData(params).subscribe(el => console.log("apiService returned: ", el));
  }
}
