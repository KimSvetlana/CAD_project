import { Component } from '@angular/core';
import * as THREE from 'three';


interface Point {
  x: number,
  y: number,
  z: number,
}

type Vector = Point;

type Triangle = [Point, Point, Point];

interface ObjectData {
  triangles: Array<Triangle>,
  normals: Array<Vector>,
}

function triangulate(height: number, radius: number, segments: number): ObjectData {
  if (height <= 0) {
    throw new Error(`height should be a positive number, but got: ${height}`);
  }

  if (radius <= 0) {
    throw new Error(`radius >= 0 expected, but got: ${radius}`);
  }

  segments = Math.round(segments);
  if (segments <= 0) {
    throw new Error(`segments >= 0 expected, but got: ${segments}`);
  }

  // cone top
  const a: Point = { x: 0, y: 0, z: height };

  const calcP = (i: number): Point => {
    return { x: radius * Math.cos(2 * Math.PI * i / segments), y: radius * Math.sin(2 * Math.PI * i / segments), z: 0 };
  };

  const calcNormal = (p: Point): Vector => {
    const b: Point = { x: 0, y: 0, z: - radius * radius / height };
    const n: Vector = { x: p.x - b.x, y: p.y - b.y, z: p.z - b.z };
    const nLength = Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z);
    return { x: n.x / nLength, y: n.y / nLength, z: n.z / nLength };
  }

  let triangles = new Array<Triangle>();
  let normals = new Array<Vector>();
  let prev = calcP(segments - 1);
  for (let i = 0; i < segments; ++i) {
    const curr = calcP(i);
    const node: Triangle = [a, curr, prev];
    triangles.push(node);
    normals.push(calcNormal(prev)); // probably should be Pi instead of (Pi + Pi+1) / 2
    prev = curr;
  }
  return { triangles, normals };
}

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent {
  private renderer: THREE.Renderer;
  private scene: THREE.Scene;
  private cone: THREE.Mesh;
  private camera: THREE.PerspectiveCamera;
  private geometry: THREE.BufferGeometry;
  private material: THREE.Material;

  constructor() {

    this.renderer = new THREE.WebGLRenderer();
    let whiteColor = new THREE.Color(THREE.Color.NAMES.ghostwhite);
    this.scene = new THREE.Scene();
    this.scene.background = whiteColor;
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.geometry = new THREE.BufferGeometry();
    let objData = triangulate(15, 5, 10);
    let vertices = [];
    for (let triangle of objData.triangles) {
      for (let point of triangle) {
        for (let coord of [point.x, point.y, point.z]) {
          vertices.push(coord);
        }
      }
    }

    // itemSize = 3 because there are 3 values (components) per vertex
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    let normals = [];
    for (let normal of objData.normals) {
      for (let i = 0; i < 3; ++i) {
        // three js accepts normal for each vertex instead of for each face
        for (let coord of [normal.x, normal.y, normal.z]) {
          normals.push(-coord);
        }
      }
    }

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

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene.add(this.cone);
    let cameraPos = new THREE.Vector3(-50, 0, 10);
    this.camera.position.copy(cameraPos);
    this.camera.lookAt(0, 0, 0);
    // fix camera rotation after lookAt 
    this.camera.rotation.z = -Math.PI / 2;

    let light = new THREE.DirectionalLight(THREE.Color.NAMES.lightyellow, 10);
    light.position.x = -5;
    light.position.y = 10;
    light.position.z = 10;
    this.scene.add(light);

    this.animate();
  }

  animate() {
    const self = this;
    const callAnimate = () => {
      self.animate();
    };
    requestAnimationFrame(callAnimate);
    this.cone.rotation.z += 0.002;
    this.renderer.render(this.scene, this.camera);
  };
}
