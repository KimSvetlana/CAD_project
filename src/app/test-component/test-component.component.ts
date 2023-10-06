import { Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent {
  private renderer: any;
  private scene: any;
  private cube: any
  private camera: any;
  private geometry: any;
  private material: any;

  constructor(){

    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    this.cube = new THREE.Mesh( this.geometry, this.material );

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    this.scene.add( this.cube );
    this.camera.position.z = 5;

    this.animate();
  }


  animate() {
    const self = this;
    const callAnimate = () => {
      self.animate();
    };
    requestAnimationFrame( callAnimate );
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render( this.scene, this.camera );
  };
}
