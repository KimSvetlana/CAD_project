import { Component } from '@angular/core';
import { ObjDataService, IObjectData, IConeParams } from 'src/app/services/obj-data.service';
import * as THREE from 'three';

@Component({
  selector: 'app-scene-component',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent {
  private renderer: THREE.Renderer;
  private scene: THREE.Scene;
  private cone!: THREE.Mesh;
  private camera: THREE.PerspectiveCamera;
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.Material;
  objDataService: ObjDataService;

  constructor( objDataService: ObjDataService) {
    this.objDataService = objDataService;

    this.renderer = new THREE.WebGLRenderer();
    let whiteColor = new THREE.Color(THREE.Color.NAMES.ghostwhite);
    this.scene = new THREE.Scene();
    this.scene.background = whiteColor;
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);


    let light = new THREE.DirectionalLight(THREE.Color.NAMES.lightyellow, 10);
    light.position.x = -5;
    light.position.y = 10;
    light.position.z = 10;
    this.scene.add(light);
    this.animate();
    this.objDataService.$objData.subscribe(data => this.onObjectData(data));
    this.objDataService.$objParams.subscribe(params => this.repositionCamera(params));
  }

  repositionCamera(params: IConeParams) {
    let range = 20 + 1.8 * Math.max(params.height, params.radius);
    let cameraPos = new THREE.Vector3(-range, 0, 0.5 * params.height);
    this.camera.position.copy(cameraPos);
    this.camera.lookAt(0, 0, 0.2 * params.height);
    this.camera.rotation.z = -Math.PI / 2;
  }

  animate() {
    const self = this;
    const callAnimate = () => {
      self.animate();
    };
    requestAnimationFrame(callAnimate);
    if (this.cone) {
      this.cone.rotation.z += 0.002;
    }
    this.renderer.render(this.scene, this.camera);
  };

  onObjectData(objData: IObjectData){
    if (this.cone) {
      this.scene.remove(this.cone);
      this.geometry.dispose();
      this.material.dispose();
    }

    let vertices = new Array(objData.triangles.length * 3 * 3);
    let vertexIndex = 0;
    for (let triangle of objData.triangles) {
      for (let point of triangle) {
        for (let coord of [point.x, point.y, point.z]) {
          vertices[vertexIndex++] = coord;
        }
      }
    }

    let normals = new Array(objData.normals.length * 3 * 3);
    let normalIndex = 0;
    for (let normal of objData.normals) {
      for (let i = 0; i < 3; ++i) {
        // three js accepts normal for each vertex instead of for each face
        for (let coord of [normal.x, normal.y, normal.z]) {
          // backend sends normal facing outwards but here we need opposite
          normals[normalIndex++] = -coord;
        }
      }
    }

    this.geometry = new THREE.BufferGeometry();

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));

    let coneColor = new THREE.Color(THREE.Color.NAMES.lightgrey);
    this.material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: coneColor,
      emissive: coneColor,
      emissiveIntensity: 0.1,
      shininess: 1,
      specular: THREE.Color.NAMES.white,
      vertexColors: true,
    });
    this.cone = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cone);
  }
}
