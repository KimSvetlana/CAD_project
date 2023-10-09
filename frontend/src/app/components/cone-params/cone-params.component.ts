import {Component} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ObjDataService } from '../../services/obj-data.service';

type ConeParams = {
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
  objDataService: ObjDataService;


  constructor(apiService: ApiService, objDataService: ObjDataService){
    this.apiService = apiService;
    this.objDataService = objDataService

    const floatExpr = "([0-9]*[.])?[0-9]+";
    this.myForm = new FormGroup({
      "height": new FormControl(10,  [Validators.required, Validators.min(1) ,Validators.pattern(floatExpr)]),
      "radius": new FormControl(10,  [Validators.required,  Validators.min(1), Validators.pattern(floatExpr)]),
      "numSegments": new FormControl(10, [Validators.required,  Validators.min(1), Validators.pattern("[0-9]+")])
    });
  }

  submit(){
    let params = this.myForm.value;
    this.objDataService.$objParams.next(params);
  }
}
