let spawnpoint, randomcustomer,ready=true, spawnposition;
let listofcustomers = [], spawnedcustomers = [];
let seat;

class Customer{
    constructor(x, z){
        this.x = x;
        this.z = z;
        this.dz=0.05;
        this.dx=0.1;
        this.speed=0.1;

    
        
        this.customer1 = customer1.cloneNode(true);
        this.customer2 = customer2.cloneNode(true);
        this.customer3 = customer3.cloneNode(true);
        spawnposition=this.z;
    
        listofcustomers=[this.customer1, this.customer2, this.customer3];

        // customer spawning
        spawnpoint = rnd(1,3);
        randomcustomer = rnd(0,3);

        if (spawnpoint == 1){
            this.z = -10;
            listofcustomers[randomcustomer].setAttribute("position", {x: 16, y:0.25, z:-10});
            listofcustomers[randomcustomer].setAttribute("rotation", {x: 0, y:0, z:0});
            ready=false;

            spawnedcustomers.push(listofcustomers[randomcustomer]);
            scene.append(listofcustomers[randomcustomer]);

        } else if (spawnpoint == 2){
            this.z=26;
            listofcustomers[randomcustomer].setAttribute("position", {x: 16, y:0.25, z:26});
            listofcustomers[randomcustomer].setAttribute("rotation", {x: 0, y:180, z:0});
            ready=false;

            spawnedcustomers.push(listofcustomers[randomcustomer]);
            scene.append(listofcustomers[randomcustomer]);
            
        }
    }

    move(person, pos){
        
        if (pos == -9.9){
            this.dz = this.speed;
        } else if (pos == 26.1){
            this.dz = -this.speed;
        }

        if (!(Math.round(pos) == 14)){
            person.object3D.position.x=16;
            this.z+=this.dz;
        } else if (Math.round(pos) == 14){
            // allows for another customer to spawn and for capcity in the store to increase by one
            people.push(spawnedcustomers[0]);
            spawnedcustomers.pop();
            ready = true;
            capacity++;

            // begin moving into the store
            
            //rotation to face the doors
            if (this.dz == this.speed && !(Math.round(person.object3D.position.x)==14)){

                person.setAttribute("rotation",{x:0, y:-90, z:0});
                

            } else if(this.dz == -this.speed && !(Math.round(person.object3D.position.x)==14)){
 
                person.setAttribute("rotation",{x:0, y:-90, z:0});
                
                
            }

            

        }


        person.setAttribute("position",{x:person.object3D.position.x,y:person.object3D.position.y,z:this.z});

    }

    enterline(person){
       
        // slight repositioning inside the store
        if (!(Math.round(person.object3D.position.x)==13) && !(Math.round(person.object3D.position.z)==9)){
            
            person.object3D.position.x+=-this.speed;
        }
        if (Math.round(person.object3D.position.x)==13 && !(Math.round(person.object3D.position.z)==9)){
            person.setAttribute("rotation",{x:0,y:180,z:0});
            person.object3D.position.z+=-this.speed;
        }

        // begin lineup
        if(Math.round(person.object3D.position.z)==9){

                // lineup
            if (people.indexOf(person)==0 && !(Math.round(person.object3D.position.x)==-6)){
                person.object3D.position.x+=-this.speed;
            
            }
            if (people.indexOf(person)==1 && !(Math.round(person.object3D.position.x)==-4)){
                person.object3D.position.x+=-this.speed;
            
            }

            if (people.indexOf(person)==2 && !(Math.round(person.object3D.position.x)==-2)){
                person.object3D.position.x+=-this.speed;
            
            }

            if (people.indexOf(person)==3 && !(Math.round(person.object3D.position.x)==0)){
                person.object3D.position.x+=-this.speed;
            
            }

            if (people.indexOf(person)==4 && !(Math.round(person.object3D.position.x)==2)){
                person.object3D.position.x+=-this.speed;
            
            }


            if (Math.round(person.object3D.position.x)==-6){
                if (served){
                    customerpatience(timerstart);
                }
                
                person.setAttribute("rotation",{x:0,y:180,z:0});
                

            } else{
                
                person.setAttribute("rotation",{x:0,y:-90,z:0});
            }
        }

        

        person.setAttribute("position",{x:person.object3D.position.x, y:0.2, z:person.object3D.position.z});
    }
    
    exitline(person, burger){
        
        for (let item of burger){
            if (burger.indexOf(item)==0){
                if (item.id == "topbun"){
                    item.setAttribute("position",{x:person.object3D.position.x, y:person.object3D.position.y-0.2, z:person.object3D.position.z-1});
                } else{
                    item.setAttribute("position",{x:person.object3D.position.x, y:person.object3D.position.y+1, z:person.object3D.position.z-1});
                }
                
            }
            if (burger.indexOf(item)==1){
                if (item.id == "topbun"){
                    item.setAttribute("position",{x:person.object3D.position.x, y:person.object3D.position.y-0.1, z:person.object3D.position.z-1});
                } else{
                    item.setAttribute("position",{x:person.object3D.position.x, y:person.object3D.position.y+1.1, z:person.object3D.position.z-1});
                }
                
            }
            if (burger.indexOf(item)==2){
                if (item.id == "topbun"){
                    item.setAttribute("position",{x:person.object3D.position.x, y:person.object3D.position.y, z:person.object3D.position.z-1});
                } else{
                    item.setAttribute("position", {x:person.object3D.position.x, y:person.object3D.position.y+1.2, z:person.object3D.position.z-1}); 
                }
                
            }
            if (burger.indexOf(item)==3){
                if (item.id == "topbun"){
                    item.setAttribute("position",{x:person.object3D.position.x, y:person.object3D.position.y+0.1, z:person.object3D.position.z-1});
                } else{
                    item.setAttribute("position", {x:person.object3D.position.x, y:person.object3D.position.y+1.3, z:person.object3D.position.z-1});
                }
                
            }
            if (burger.indexOf(item)==4){
                if (item.id == "topbun"){
                    item.setAttribute("position",{x:person.object3D.position.x, y:person.object3D.position.y+0.2, z:person.object3D.position.z-1});
                } else{
                    item.setAttribute("position", {x:person.object3D.position.x, y:person.object3D.position.y+1.4, z:person.object3D.position.z-1});
                }
                
            }
            
        }
        
        
        ordercomplete=true;
        clickable=true;
    }


    reaction(person,rxn,burger){
        
        if (!(firsttry) && customerreaction!=="bad" && rxn=="good"){
            firsttry=true;
        } else if(!(firsttry) && customerreaction=="bad" && rxn=="bad"){
            firsttry="bad1";
        } else if (!(firsttry) && customerreaction=="NO!"){
            firsttry="bad2"
        };

        // trying to place burger in front of customer
        if (!(customerreaction=="NO!")){
            for (let item of burger){
                
                if (person.object3D.rotation.y==0){
                    // if person turns away from the counter
                    
                    item.setAttribute("position", {x:item.object3D.position.x, y:item.object3D.position.y, z:person.object3D.position.z+1});
                    
                    // if person turns left to leave
                } 
                if (Math.round(person.object3D.rotation.y) == 2){
                    
                    item.setAttribute("position", {x:person.object3D.position.x+1, y:item.object3D.position.y, z:person.object3D.position.z});
            
                }
            }
        } else if (customerreaction=="NO!"){
            for (let item of burger){
                item.setAttribute("position",{x:0, y:-100,z:0});
            }
        }
        
        
        if (rxn == "good" && customerreaction!=="bad"){
            
            
            if (!(Math.round(person.object3D.position.z) == 15)){
                person.setAttribute("rotation", {x:0, y:0, z:0});
                person.object3D.position.z+=0.05;
                comment.setAttribute("value", "The customer was satisfied with their burger!")
            }
            
            if (Math.round(person.object3D.position.z)==15 && (!(Math.round(person.object3D.position.x)==18))){
                person.object3D.position.x+=0.05;
                person.setAttribute("rotation",{x:0, y:90, z:0});
                customerreaction="good";
                comment.setAttribute("value", "")
            }

            if (Math.round(person.object3D.position.x) ==18){
                for (let item of burger){
                    item.setAttribute("position", {x:0, y:-100,z:0});
                }
                person.setAttribute("position",{x:0,y:-100,z:0});
                satisfiedcustomers++;
                customersserved++;
                customercount.setAttribute("value", `Satisfied Customers: ${satisfiedcustomers}`)
                
                peopleleaving=[];
                burgerleaving=[];
            }
            
            person.setAttribute("position", {x:person.object3D.position.x,y:person.object3D.position.y,z:person.object3D.position.z});
        }
        
        if (customerreaction=="NO!"){
            
            if (!(Math.round(person.object3D.position.z) == 15)){
                comment.setAttribute("value", "The customer grew impatient.");
                person.setAttribute("rotation", {x:0, y:0, z:0});
                person.object3D.position.z+=0.05;
            }
            
            if (Math.round(person.object3D.position.z)==15 && (!(Math.round(person.object3D.position.x)==18))){
                person.object3D.position.x+=0.05;
                person.setAttribute("rotation",{x:0, y:90, z:0});
                customerreaction="good";
                comment.setAttribute("value", "");
            }

            if (Math.round(person.object3D.position.x) ==18){
                
                person.setAttribute("position",{x:0,y:-100,z:0});
                customersserved++;
                
                peopleleaving=[];
                burgerleaving=[];
            }
            
            person.setAttribute("position", {x:person.object3D.position.x,y:person.object3D.position.y,z:person.object3D.position.z});
        }
        
        if (rxn == "bad"&& !(customerreaction=="NO!")){
            
            
            if (!(Math.round(person.object3D.position.z) == 15)){
                if (customerreaction=="bad"){
                    console.log("bad")
                    comment.setAttribute("value", "The customer thought the burger took too long. . .");
                }
                if (customerreaction!=="bad"){
                    comment.setAttribute("value", "The customer didn't order that . . .")
                }
                
                person.setAttribute("rotation", {x:0, y:0, z:0});
                person.object3D.position.z+=0.05;
                
            }
            
            if (Math.round(person.object3D.position.z)==15 && (!(Math.round(person.object3D.position.x)==18))){
                person.object3D.position.x+=0.05;
                person.setAttribute("rotation",{x:0, y:90, z:0});
                customerreaction="good";
                comment.setAttribute("value", "");
            }

            if (Math.round(person.object3D.position.x) ==18){
                for (let item of burger){
                    item.setAttribute("position", {x:0, y:-100,z:0});
                }
                person.setAttribute("position",{x:0,y:-100,z:0});
                customersserved++;
                
                peopleleaving=[];
                burgerleaving=[];
            }
            
            person.setAttribute("position", {x:person.object3D.position.x,y:person.object3D.position.y,z:person.object3D.position.z});
        }
        
    
    }


}