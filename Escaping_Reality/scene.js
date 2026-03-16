class Tree{
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("shadow","receive: true");
  
    let pines = document.createElement("a-cone");
    pines.setAttribute("color","green");
    pines.setAttribute("position","0 1.5 0");
    pines.setAttribute("height","2");
    this.obj.append( pines );
  
    let stump = document.createElement("a-cylinder");
    stump.setAttribute("position","0 0 0");
    stump.setAttribute("color","brown");
    stump.setAttribute("radius","0.25");
    this.obj.append( stump );
  
    this.obj.setAttribute("position",{x:x, y:y, z:z});
    scene.append( this.obj )
  }
  scale(size){
    this.obj.setAttribute("scale",{x:size,y:size,z:size});
  }
}

class Cloud{
  constructor(x,y,z){

    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("rotation",{x:0,y:90,z:0});


    this.x = x;
    this.y=y;
    this.z=z;
  
    this.dx = 0.05;
    let shapes = ["a-dodecahedron","a-icosahedron","a-octahedron","a-tetrahedron"];

    for(let i = -1; i <= 1; i++){
      let r = rnd(0,shapes.length);
      let puff = document.createElement(shapes[r]);
      puff.setAttribute("position",{x:i, y:0, z:0});
      this.obj.append( puff );
    }
    this.obj.setAttribute("position",{x:x, y:y, z:z});
    scene.append( this.obj )
  }


  fly(){
    if (this.z>80){
      this.z=-70;
    }
    this.z += this.dx;
    this.obj.setAttribute("position", {x:this.x, y:this.y, z:this.z});
  }

}