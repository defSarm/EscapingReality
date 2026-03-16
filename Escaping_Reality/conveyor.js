let conveyNum;
let itemNum;
let conveyors = [1, 4, 7, 10, 13];
let limit1=0, limit2=0, limit3=0, limit4=0, limit5 = 0;

class Conveyor{
    constructor(z){
        this.z = z;
        this.dz=0.1;

        this.topbun = topbun.cloneNode(true);
        this.botbun = botbun.cloneNode(true);
        this.pickles = pickles.cloneNode(true);
        this.patty = patty.cloneNode(true);
        this.cheese = cheese.cloneNode(true);

        conveyNum=1;
        

    }

    
    conveyorfill(){
        itemNum = rnd(1,6);
        if(conveyorcheck()){
            if (itemNum == 1){
                this.topbun.setAttribute("position",{x:conveyors[conveyNum-1], y:0, z:this.z});
                listadd(this.topbun);
        
                this.topbun.addEventListener("click", ()=>{
                    if(hands.length<1 && this.topbun.object3D.position.z==-0.8&& Math.round(distance(camera, this.topbun))<4){
                        camera.components.sound.playSound();
                        this.topbun.object3D.position.y=-10;
                        hands.push(this.topbun);

                        listpop(this.topbun);
                        topbun1.setAttribute("position",{x:topbun1.x,y:-1.25,z:topbun1.z});
                        
                    }
                    
                });
           
                    
        
                scene.append(this.topbun);
            }
            if (itemNum == 2){
                this.botbun.setAttribute("position",{x:conveyors[conveyNum-1], y:1.25, z:this.z});
                listadd(this.botbun)
               
                 this.botbun.addEventListener("click", ()=>{
                    if (hands.length<1 && this.botbun.object3D.position.z==-0.8&& Math.round(distance(camera, this.botbun))<4){
                        camera.components.sound.playSound();
                        this.botbun.object3D.position.y=-10;
                        hands.push(this.botbun);
                        listpop(this.botbun);
                        botbun1.setAttribute("opacity",1);
                    }
                     
                 });
                
           
                scene.append(this.botbun);
            }
            if (itemNum == 3){
                this.pickles.setAttribute("position",{x:conveyors[conveyNum-1], y:1.25, z:this.z});
                listadd(this.pickles);
                this.pickles.addEventListener("click", ()=>{
                    if (hands.length<1 && this.pickles.object3D.position.z==-0.8&& Math.round(distance(camera, this.pickles))<4){
                        camera.components.sound.playSound();
                        this.pickles.object3D.position.y=-10;
                        hands.push(this.pickles);
                        listpop(this.pickles);
                        pickles1.setAttribute("position",{x:0.05,y:0,z:0.2});
                        
                    }
                    
                });
                

                scene.append(this.pickles); 
            }
            if (itemNum == 4){
                this.patty.setAttribute("position",{x:conveyors[conveyNum-1], y:1.25, z:this.z});
                listadd(this.patty);
                this.patty.addEventListener("click", ()=>{
                    if (hands.length<1 && this.patty.object3D.position.z==-0.8&& Math.round(distance(camera, this.patty))<4){
                        camera.components.sound.playSound();
                        this.patty.object3D.position.y=-10;
                        hands.push(this.patty);
                        listpop(this.patty);
                        patty1.setAttribute("opacity",1);
                        
                    }
                    
                });
                

                scene.append(this.patty);  
            }
            if (itemNum == 5){
                this.cheese.setAttribute("position",{x:conveyors[conveyNum-1], y:1.25, z:this.z});
                listadd(this.cheese);
                this.cheese.addEventListener("click", ()=>{
                    if (hands.length<1 && this.cheese.object3D.position.z==-0.8&& Math.round(distance(camera, this.cheese))<4){
                        camera.components.sound.playSound();
                        this.cheese.object3D.position.y=-10;
                        listpop(this.cheese);
                        hands.push(this.cheese);
                        cheese1.setAttribute("opacity",1);
                           
                    }
                    
                });
                
                scene.append(this.cheese);
            } 

        }
    }
        

    randomize(){
        conveyNum=1;
        itemNum = rnd(1,6);

        if(conveyorcheck()){
            if (itemNum == 1){
                this.topbun.setAttribute("position",{x:conveyors[conveyNum-1], y:0, z:this.z});
                list(this.topbun);

                scene.append(this.topbun);
            }
            if (itemNum == 2){
                this.botbun.setAttribute("position",{x:conveyors[conveyNum-1], y:1.25, z:this.z});
                list(this.botbun);
           
                scene.append(this.botbun);
            }
            if (itemNum == 3){
                this.pickles.setAttribute("position",{x:conveyors[conveyNum-1], y:1.25, z:this.z});
                list(this.pickles);
           
                scene.append(this.pickles); 
            }
            if (itemNum == 4){
                this.patty.setAttribute("position",{x:conveyors[conveyNum-1], y:1.25, z:this.z});
                list(this.patty);
              
                scene.append(this.patty);  
            }
            if (itemNum == 5){
                this.cheese.setAttribute("position",{x:conveyors[conveyNum-1], y:1.25, z:this.z});
                list(this.cheese);
                
                scene.append(this.cheese);
            } 

        }
                
        
    }


    
    move(item){
        if (!(item.object3D.position.z==-0.8)){
            this.z+=this.dz;
            console.log(this.z);
            item.setAttribute("position",{x:item.x,y:1.25,z:this.z});
        }
        
        
        
    }
    
}

