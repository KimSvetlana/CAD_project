import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ApiService } from './api.service';

export interface IConeParams {
  height: number,
  radius: number,
  numSegments: number
}

interface Point {
  x: number,
  y: number,
  z: number,
}

type Vector = Point;

type Triangle = [Point, Point, Point];
export interface IObjectData {
  triangles: Array<Triangle>,
  normals: Array<Vector>,
}

@Injectable({
  providedIn: 'root'
})
export class ObjDataService {
  apiService: ApiService;

  private _objData = new BehaviorSubject<IObjectData>({
    triangles: [],
    normals: [],
  })
  private _objParams = new BehaviorSubject<IConeParams>({
    height: 10,
    radius: 10,
    numSegments: 10
  });


  get $objParams( ){
    return this._objParams;
  }

  get $objData( ){
    return this._objData;
  }

  constructor(apiService: ApiService, ){
    this.apiService = apiService;

    this.$objParams.subscribe(params => {
      this.apiService.getData(params).subscribe(el => {
        this.$objData.next(el as IObjectData);
      })
    })

  }


}

