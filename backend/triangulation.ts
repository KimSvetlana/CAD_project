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
  
  export function triangulate(height: number, radius: number, segments: number): ObjectData {
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
  