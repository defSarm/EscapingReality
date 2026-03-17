let scene,handslot,capacity=0,served=true,count=0,clickable=true,ordercomplete=false, orderreaction, customertimer=100, customerreaction="good", timerstart=false, firsttry=false;
let trashcapacity=0;
// extra game properties
let closing=false, opendoors=false;
let people = [], peopleleaving=[];
let con1=[], con2=[], con3=[], con4=[], con5=[];
let conveyoritems = [con1,con2,con3,con4,con5];
let hands = [];
let order = [];
let p1 = [], p2 = [], sp =[], burgerleaving=[];
let run=false,hover1=false,hover2=false,hover3 =false;
let clouds=[];


//end game properties
satisfiedcustomers = 0;
customersserved = 0;
rating = 5;


function rnd(l, u){
  return Math.floor(Math.random()*(u-l) + l);
}

window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene");
    camera = document.querySelector("a-camera");
    handslot = document.querySelector("#handslot");
    trashcan = document.querySelector("#trashcan");

    // plates
    plate1 = document.querySelector("#plate1");
    plate2 = document.querySelector("#plate2");
    servingplate = document.querySelector("#serving");
    bell = document.querySelector("#bell");

    // hands
    righthand=document.querySelector("#righthand");

    //handslot items
    topbun1 = document.querySelector("#topbun1");
    botbun1 = document.querySelector("#botbun1");
    patty1 = document.querySelector("#patty1");
    cheese1 = document.querySelector("#cheese1");
    pickles1 = document.querySelector("#pickles1");

    topbun = document.querySelector("#topbun");
    botbun = document.querySelector("#botbun");
    patty = document.querySelector("#patty");
    pickles = document.querySelector("#pickles");
    cheese = document.querySelector("#cheese");


    
    // customers
    customer1 = document.querySelector("#customer1");
    customer2 = document.querySelector("#customer2");
    customer3 = document.querySelector("#customer3");

    customerburger = document.querySelector("#customerburger");

    // customer patience bar
    bar = document.querySelector("#bar");
    patience = document.querySelector("#patience");

    // text
    customercount = document.querySelector("#customercount");
    comment = document.querySelector("#report");
    rating = document.querySelector("#rating");
    trashtext = document.querySelector("#trashtext");

    tutorialcomment=document.querySelector("#tutorialtext");
    tutorialguy = document.querySelector("#tutorialguy");

    // extra world properties
    doors = document.querySelector("#doors");
    leftdoor = document.querySelector("#leftdoor");
    rightdoor = document.querySelector("#rightdoor");

    dumpster = document.querySelector("#dumpster");
    dumpster2 = document.querySelector("#dumpster2");
    trashbag = document.querySelector("#trashbag");
    trashbag.setAttribute("position",{x:0,y:-100,z:0});


    //tree and clouds
    for(let i = 0; i < 75; i++){
        let tree = new Tree(rnd(50,70), 0 , rnd(-80,80));
        tree.scale(2,4);
    }
    for(let i = 0; i < 30; i++){
        let tree = new Tree(rnd(-20, 30), 0 , rnd(-90,-55));
        tree.scale(2,4);
    }

    for (let i = 0; i<150; i++){
        clouds.push(new Cloud(rnd(-90, 70), 25, rnd(-70,70)));
    }

    startWorldClock();
    setTimeout(loop, 1000);
    //setTimeout(worldtimer, 1000);
})

// time of day

let tutorial = localStorage.getItem("tutorial") === "true";
function tutactivate(num) {
    if (num ==1){
        localStorage.setItem("tutorial", "true");
        console.log("tutorial activated");
    }
    else if (num==2){
        localStorage.setItem("tutorial", "false");
    }
    
}


function startWorldClock() {
    const clockText = document.querySelector("#WORLDCLOCK");

    if (tutorial){
        hour = 7;
        minute = 30;
    } else{
        hour=9;
        minute=0;
    }
    

    function updateClock() {
        // Stop at 5:00 PM
        if (hour === 17 && minute === 0) {
            clockText.setAttribute("value", "5:00P");
            closing=true;
            return;
        }

        // Format AM/PM
        let suffix = hour < 12 ? "A" : "P";
        let displayHour = hour % 12;
        if (displayHour === 0) displayHour = 12;

        // Format minutes
        let displayMinute = minute.toString().padStart(2, "0");

        // Update A-Frame text
        clockText.setAttribute("value", `${displayHour}:${displayMinute}${suffix}`);

        // Advance time by 1 minute
        minute++;
        if (minute >= 60) {
            minute = 0;
            hour++;
        }

        // Loop every 1 second (1 sec = 1 minute)
        setTimeout(updateClock, 1000);
    }

    updateClock();
}


// function checks if the conveyor is full or not and continues to check
function conveyorcheck(){
    
    if (con1.length<5 || con2.length<5 || con3.length<5 || con4.length<5 || con5.length<5){
        while (conveyNum == 1){
            if(con1.length<5){
            
                return true;
            } else{
                conveyNum++;
            }
        }
        while (conveyNum == 2){
            if(con2.length<5){

                return true;
            } else{
                conveyNum++;
            }
        }
        while (conveyNum == 3){
            if(con3.length<5){
                return true;
            } else{
                conveyNum++;
            }
        }
        while (conveyNum == 4){
            if(con4.length<5){

                return true;
            } else{
                conveyNum++;
            }
        }
        while (conveyNum == 5){
            if(con5.length<5){

                return true;
            } else{
                conveyNum=1;
            }
        }
    }
    else{
        return false;
    }
}

// function puts all items into an array of arrays
function listadd(item){
    if (conveyNum==1){
        con1.push(item);
        item.array = con1;
    }
    if (conveyNum==2){
        con2.push(item);
        item.array=con2;
    }
    if (conveyNum==3){
        con3.push(item);
        item.array=con3;
    }
    if (conveyNum==4){
        con4.push(item);
        item.array=con4;
    }
    if (conveyNum==5){
        con5.push(item);
        item.array=con5;
    }
}

// removal of items from lists
function listpop(item){
    item.array.shift();
    
}

// add or stack items onto plates
function plateadd(plate, item){
    if (item.id !== "trashbag"){ 
        if(plate == p1){
            item.x=0;
        } else if (plate == p2){
            item.x =2;
        } else{ //serving plate
            item.x=-5.6;
        }

        if (plate.length==0){
            if (item.id == "topbun"){
                item.setAttribute("position",{x:item.x, y:0.15, z:6.75});
            }
            else{
                item.setAttribute("position",{x:item.x,y:1.4,z:6.75});
            }
        }

        // stackable plates
        if (plate == sp){
            if (plate.length==0){
                if (item.id == "topbun"){
                    item.setAttribute("position",{x:item.x, y:0.15, z:6.75});
                }
                else{
                    item.setAttribute("position",{x:item.x,y:1.4,z:6.75});
                }
            }

            if (plate.length==1){
                if (item.id == "topbun"){
                    item.setAttribute("position",{x:item.x, y:0.23, z:6.75});
                }
                else{
                    item.setAttribute("position",{x:item.x,y:1.48,z:6.75});
                }
            } 

            if (plate.length==2){
                if (item.id == "topbun"){
                    item.setAttribute("position",{x:item.x, y:0.33, z:6.75});
                }
                else{
                    item.setAttribute("position",{x:item.x,y:1.58,z:6.75});
                }
            } 

            if (plate.length==3){
                if (item.id == "topbun"){
                    item.setAttribute("position",{x:item.x, y:0.43, z:6.75});
                }
                else{
                    item.setAttribute("position",{x:item.x,y:1.68,z:6.75});
                }
            } 

            if (plate.length==4){
                if (item.id == "topbun"){
                    item.setAttribute("position",{x:item.x, y:0.53, z:6.75});
                }
                else{
                    item.setAttribute("position",{x:item.x,y:1.78,z:6.75});
                }
            } 
        }
    }
}

// remove items from plate
function plateremove(plate, item){

    if (plate.length>0){
        item.setAttribute("position", {x:0,y:-10,z:0});
        hands.push(item);
        plate.pop();
        if (item.id=="topbun"){

            topbun1.setAttribute("position",{x:topbun1.x,y:-1.25,z:topbun1.z});
        }
        else if(item.id=="botbun"){

            botbun1.setAttribute("opacity",1);
        }
        else if (item.id == "pickles"){

            pickles1.setAttribute("position", {x:pickles1.x,y:0,z:pickles1.z});
        }
        else if (item.id == "cheese"){

            cheese1.setAttribute("opacity",1);
        }
        else if (item.id == "patty"){

            patty1.setAttribute("opacity",1);
        }
        
    } 

}

let patienceTimerID = null;
function customerpatience(start){
    if (patienceTimerID !== null){
        clearTimeout(patienceTimerID)
    }

    if (!(served)){
        bar.setAttribute("opacity", 1);
        patience.setAttribute("opacity", 1);
        customertimer-=1;
    } else{
        bar.setAttribute("opacity", 0);
        patience.setAttribute("opacity", 0);
    }
    


    if (customertimer==100){
        
        patience.setAttribute("color","green");
        patience.setAttribute("position",{x:-5.58, y:patience.object3D.position.y,z:patience.object3D.position.z});
        patience.setAttribute("width", 1.4);
    }
    
    
    
    
    if (ordercomplete){
        patienceTimerID=null;
        return;
    }
    
    if (customertimer == 95){
        patience.setAttribute("width",1.3);
        patience.setAttribute("position", {x:-5.53, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 90){
        patience.setAttribute("width",1.2);
        patience.setAttribute("position", {x:-5.48, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 85){
        patience.setAttribute("width",1.1);
        patience.setAttribute("position", {x:-5.43, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 80){
        patience.setAttribute("width",1);
        
        patience.setAttribute("position", {x:-5.38, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 75){
        patience.setAttribute("width",0.9);
        patience.setAttribute("color", "#F4BB44");
        patience.setAttribute("position", {x:-5.33, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 70){
        patience.setAttribute("width",0.8);
        
        patience.setAttribute("position", {x:-5.28, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 65){
        patience.setAttribute("width",0.7);
        patience.setAttribute("position", {x:-5.23, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 60){
        patience.setAttribute("width",0.6);
        patience.setAttribute("position", {x:-5.18, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 50){
        patience.setAttribute("width",0.5);
        patience.setAttribute("color", "#FF7518");
        customerreaction="bad";
        orderreaction="bad";
        patience.setAttribute("position", {x:-5.13, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 40){
        patience.setAttribute("width",0.4);
        patience.setAttribute("position", {x:-5.08, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 30){
        patience.setAttribute("width",0.3);
        patience.setAttribute("position", {x:-5.03, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 20){
        patience.setAttribute("width",0.2);
        patience.setAttribute("color", "#FF3131");
        
        patience.setAttribute("position", {x:-4.98, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 10){
        patience.setAttribute("width",0.1);
        patience.setAttribute("position", {x:-4.93, y:patience.object3D.position.y,z:patience.object3D.position.z});
    }
    if (customertimer == 0){
        customerreaction="NO!";
        orderreaction="bad";
        patience.setAttribute("opacity",0);
        bar.setAttribute("opacity", 0);
        ordercomplete=true;
        customertimer=100;
        patienceTimerID=null;
        return;
    }
    
    
    console.log(orderreaction, customerreaction);

    patienceTimerID = setTimeout(customerpatience,1000);
}




// tutorial functions



closing=false;


if (tutorial){
    capacity=4;
} else{
    capacity=0;
}




// game loop
function loop(){
    // CLOSING PROPERTIES ===============================================================
    for (let cloud of clouds){
        cloud.fly();
    }
    light_source.object3D.rotation.z += 0.0001;

    if (closing){
        // clear out all customers in the store
        for (let customers of spawnedcustomers){
            customers.setAttribute("position",{x:0,y:-100,z:0});
        }
        for (let customers of people){
            customers.setAttribute("position", {x:0,y:-100,z:0});
        }
        for (let customers of peopleleaving){
            customers.setAttribute("position",{x:0,y:-100,z:0});
        }
        spawnedcustomers=[];
        people=[];
        peopleleaving=[];

        // leftdoor.setAttribute("rotation", {x:0, y:0, z:0});
        // rightdoor.setAttribute("rotation", {x:0, y:0, z:0});
    
        comment.setAttribute("value","It's closing time!");
        comment.setAttribute("position",{x:-0.14,y:-0.22,z:0});
    }

    leftdoor.addEventListener("mouseenter",()=>{
        opendoors=true
        comment.setAttribute("value","Click E to open/close")
        comment.setAttribute("position",{x:-0.14,y:-0.22,z:0} );
        
    });
    leftdoor.addEventListener("mouseleave",()=>{
        opendoors=false;
        comment.setAttribute("value","")
    });

    rightdoor.addEventListener("mouseenter",()=>{
        opendoors=true
        comment.setAttribute("value","Click E to open/close")
        comment.setAttribute("position",{x:-0.14,y:-0.22,z:0} );

    });
    rightdoor.addEventListener("mouseleave",()=>{
        opendoors=false;
        comment.setAttribute("value","")
    });


    
    window.addEventListener("keydown",function(e){
        if (distance(camera,doors)<4 && leftdoor.object3D.rotation.y==0&&e.key=="e"&&opendoors){
            leftdoor.object3D.rotation.y=90;
            rightdoor.object3D.rotation.y=-90;

        } else if (distance(camera,doors)<4 && leftdoor.object3D.rotation.y==90 && e.key=="e"&&opendoors){
            leftdoor.object3D.rotation.y=0;
            rightdoor.object3D.rotation.y=0;

        }
        
        
    });

    
    dumpster.addEventListener("click", ()=>{
        
        if (hands[0].id == "trashbag"){
            trashcan.components.sound.playSound();
            trashbag.setAttribute("position",{x:0,y:-100,z:0});
            righthand.setAttribute("position",{x:0.6,y: -0.6,z: 0.25});
            righthand.setAttribute("rotation",{x:15,y:0,z:0});
            trashcapacity=0;
            hands.pop;
        }
        
    });
    dumpster2.addEventListener("click", ()=>{
        
        if (hands[0].id == "trashbag"){
            trashcan.components.sound.playSound();
            trashbag.setAttribute("position",{x:0,y:-100,z:0});
            righthand.setAttribute("position",{x:0.6,y: -0.6,z: 0.25});
            righthand.setAttribute("rotation",{x:15,y:0,z:0});
            trashcapacity=0;
            hands.pop;
        }
        
    });

    // CLOSING PROPERTIES End ===============================================================
    scene.components.sound.playSound();
    

    if (tutorial){
        // tutorial guy
        if (hour==7){
            if (minute==35){
                tutorialcomment.setAttribute("value", "I'll be your tour guy for the duriation of this tutorial");
                tutorialcomment.setAttribute("position", {x:-2.3, y:2.5, z:0});
            }
            if (minute == 40){
                tutorialcomment.setAttribute("value", "The store opens at 9AM, check the clock on your left to view the current time.");
                tutorialcomment.setAttribute("position", {x:-2.5, y:2.5, z:0});
            }
            if (minute == 46){
                tutorialcomment.setAttribute("value", "Until then, take a look around the store and come back at 8:00 for training");
                tutorialcomment.setAttribute("position", {x:-2.3, y:2.5, z:0});
            }
            if (minute == 50){
                tutorialcomment.setAttribute("value", "");
                
            }
        }
        
        if (hour == 8){
            if (minute == 1){
                tutorialcomment.setAttribute("position", {x:-1, y:2.5, z:0});
                tutorialcomment.setAttribute("value", "Hey! Time for training");
            }

            if (minute == 5){
                tutorialcomment.setAttribute("value", "I hope you had a good look of the store");
                tutorialcomment.setAttribute("position", {x:-1.8, y:2.5, z:0});
            }
            
            if (minute > 7 && minute<10){
                tutorialcomment.setAttribute("value", "You might have noticed these conveyor belts with food");
                tutorialcomment.setAttribute("position", {x:-2.2, y:2.5, z:0});

                if (Math.round(tutorialguy.object3D.rotation.y) !==1){
                    tutorialguy.object3D.rotation.y+=0.1;
                }

            }

            if (minute == 15 ){
                tutorialcomment.setAttribute("value", "You can pick up the first item by left clicking on them");
                tutorialcomment.setAttribute("position", {x:-2.2, y:2.5, z:0});
            }

            if (minute == 20){
                tutorialcomment.setAttribute("value", "You can toss it in the trashcan by the window over there by left clicking");
                tutorialcomment.setAttribute("position", {x:-2.2, y:2.5, z:0});
            }

            if (minute < 30 && minute>26){
                if (!(tutorialguy.object3D.rotation.y < 0.1)){
                    tutorialguy.object3D.rotation.y-=0.1;
                }
                tutorialcomment.setAttribute("value", "But be careful! That trashcan has a capacity of 5 items");
                tutorialcomment.setAttribute("position", {x:-2.1, y:2.5, z:0});
            }

            if (minute > 30 && minute <40){
                if (Math.round(tutorialguy.object3D.position.z) !== 5){
                    tutorialguy.object3D.position.z+=0.1;
                }
                if (Math.round(tutorialguy.object3D.position.z) == 5 && Math.round(tutorialguy.object3D.rotation.y) !== 4){
                    tutorialguy.object3D.rotation.y+=0.1
                }
                tutorialcomment.setAttribute("value", "You can also place unwanted items on the plates by the counter");
                tutorialcomment.setAttribute("position", {x:-2.3, y:2.5, z:0});
            }

            if (minute == 40){
                tutorialcomment.setAttribute("value", "This is the serving plate, only use this for the customer's order");
            }

            if (minute == 45){
                tutorialcomment.setAttribute("value", "The bell is for sending the order out, make sure to click it when you're done");
            }

            if (minute > 50 && minute < 55){
                if ( Math.round(tutorialguy.object3D.rotation.y) !== 2){
                    tutorialguy.object3D.rotation.y-=0.1
                }
                tutorialcomment.setAttribute("value", "These plates are for placing items you don't need to use yet. Limit : 1");
            }

            if (minute == 59){
                if ( Math.round(tutorialguy.object3D.rotation.y) !== 4){
                    tutorialguy.object3D.rotation.y+=0.1
                }
                tutorialcomment.setAttribute("value", "Click E to pick up items from all plates!");
            }
        }

        if (hour == 9){
            if (minute == 2){
                tutorialcomment.setAttribute("value", "Let's take your training for a spin! Our first customer is walking in");
            }

            if (minute == 15){
                tutorialcomment.setAttribute("value", "As you can see, the order is on the right");
            }

            if (minute == 18){
                tutorialcomment.setAttribute("value", "But don't leave the customer waiting! Your rating can be affected by their patience level");
            }

            if (minute == 23){
                tutorialcomment.setAttribute("value", "Try to make their order");
                tutorialcomment.setAttribute("position", {x:-1, y:2.5, z:0});
            }
            if (minute == 26){
                tutorialcomment.setAttribute("value", "");
            }
        }

        if (firsttry){
            tutorialcomment.setAttribute("value", "Great! Looks like my job is done here, good luck from here on out");
            tutorialcomment.setAttribute("position", {x:-2, y:2.5, z:0});
            if (minute > 40){
                tutorialcomment.setAttribute("value", "");
                tutorialguy.setAttribute("position",{x:0,y:-100,z:0});
                capacity=0;
            }
        } else if (firsttry=="bad1" || firsttry=="bad2"){
            tutorialcomment.setAttribute("value", "Hm. Make sure the order is right and the customer gets it in time, other than that I wish you luck!");
            tutorialcomment.setAttribute("position", {x:-2.1, y:2.5, z:0});
            if (minute > 50){
                tutorialcomment.setAttribute("value", "");
                tutorialguy.setAttribute("position",{x:0,y:-100,z:0});
                capacity=0;
            }
            tutorial=false;
            capacity=-1
        }
            

    } else{
        tutorialguy.setAttribute("position",{x:0,y:-100,z:0});
        
    }

  // skip by 3 x
    item = new Conveyor(-8);
    item.conveyorfill();
    
    customerorder = new Menu(1)
    

    //customer rating
    rating.setAttribute("value", `Rating: ${Math.round(5*(satisfiedcustomers/customersserved))}`)

    // customer logic 

    

    if (ready&& capacity<5&& (hour==9||tutorial==false)){
        cstmr = new Customer(16,3);
    }

    for (let customer of spawnedcustomers){

        cstmr.move(customer,customer.object3D.position.z);
    }

    
    for (let customer of people){
        cstmr.enterline(customer);
        
        if (Math.round(customer.object3D.position.x)==-6 && served){
            
            customerorder.choose(ordercomplete,customer);
            customerorder.display(ordercomplete,customer);
            served=false;
            
        } else if (served){
            this.slot1.setAttribute("opacity",0);
            this.slot2.setAttribute("opacity",0);
            this.slot3.setAttribute("opacity",0);
            this.slot4.setAttribute("opacity",0);
            this.slot5.setAttribute("opacity",0);
        }
        
        
        
    }

    //decline in rating
    

    // confirm order matching
    bell.addEventListener("click",()=>{
        bell.components.sound.playSound();
        if (sp.length>=1 && order.length>=1 && clickable&& Math.round(distance(camera, bell))<4){
            
            clickable=false;
            for (let i = 0; i<sp.length;i++){
                if (sp[i].id==order[i] && sp.length==order.length){
                    count+=1;
                    
                }
            }
            if (count==order.length && customerreaction=="good"){
                
                orderreaction="good";
                count=0;
            } else if (!(count==order.length) || customerreaction=="bad"){
                orderreaction="bad";
                count = 0;
            }
            cstmr.exitline(people[0], sp);
            
            
            customertimer=100;
            served=true;

        }
    });

    if (customerreaction == "NO!" && ordercomplete){
        cstmr.exitline(people[0], sp);
      
        customertimer=100;
        count=0;
        capacity-=1;
        peopleleaving.push(people[0]);
        people.shift();
        for (let item of sp){
            burgerleaving.push(item);
        }
        sp=[];
        served=true;
        ordercomplete=false;
        
        
        
    }

    if (ordercomplete && !(customerreaction=="NO!")){
        // remove list of people in the store
        capacity-=1;
        peopleleaving.push(people[0]);
        people.shift();
        for (let item of sp){
            burgerleaving.push(item);
        }
        sp=[];
        served=true;
        ordercomplete=false;
        

        
        
    }

    for (let person of peopleleaving){
        cstmr.reaction(person, orderreaction,burgerleaving);
    }

    //trashcan capacity
    if (trashcapacity==5){
        trashtext.setAttribute("opacity", 1);
    } else{
        trashtext.setAttribute("opacity", 0);
    }

    trashcan.addEventListener("click", ()=>{
            
            if (hands.length==1&& Math.round(distance(camera, trashcan))<4){
                trashcan.components.sound.playSound();
                if (!(trashcapacity>4)){
                    hands.pop();
                    trashcapacity++;

                    topbun1.setAttribute("position",{x:topbun1.x,y:-10,z:topbun1.z});
                    pickles1.setAttribute("position", {x:pickles1.x,y:-10,z:pickles1.z});
                    botbun1.setAttribute("opacity",0);
                    cheese1.setAttribute("opacity",0);
                    patty1.setAttribute("opacity",0);
                }
                
                
            }
            
            if (hands.length==0 && Math.round(distance(camera, trashcan))<4){
                trashcan.components.sound.playSound();
                if (trashcapacity>4){
                    trashbag.setAttribute("position", {x:-0.75,y:-0.45,z:0.5});
                    righthand.setAttribute("position",{x:0.1,y:-0.6,z:0.25});
                    righthand.setAttribute("rotation", {x:30,y:50,z:0});
                    hands.push(trashbag);


                }
            }
        
        
    });

    // serving plate (stackable) -- increase area

    servingplate.addEventListener("click", ()=>{

        if (hands.length == 1 && sp.length<5 && Math.round(distance(camera, servingplate))<4 ){
            camera.components.sound.playSound();
            plateadd(sp,hands[0]);
            sp.push(hands[0]);
            // delete item from hands
            topbun1.setAttribute("position",{x:topbun1.x,y:-10,z:topbun1.z});
            pickles1.setAttribute("position", {x:pickles1.x,y:-10,z:pickles1.z});
            botbun1.setAttribute("opacity",0);
            cheese1.setAttribute("opacity",0);
            patty1.setAttribute("opacity",0);
            hands.pop();
        }
    });

    servingplate.addEventListener("mouseenter", ()=>{
        hover3=true;
    });
    servingplate.addEventListener("mouseleave", ()=>{
        hover3=false;
    });
    

    // plate 1 (non stackable)
    
    plate1.addEventListener("click", ()=>{
        if (hands.length==1 && p1.length==0 && Math.round(distance(camera, plate1))<4){
            camera.components.sound.playSound();
            plateadd(p1, hands[0]);
            p1.push(hands[0]);
            
            // delete item from hands
            topbun1.setAttribute("position",{x:topbun1.x,y:-10,z:topbun1.z});
            pickles1.setAttribute("position", {x:pickles1.x,y:-10,z:pickles1.z});
            botbun1.setAttribute("opacity",0);
            cheese1.setAttribute("opacity",0);
            patty1.setAttribute("opacity",0);


            hands.pop();
        }

    });

    plate1.addEventListener("mouseenter", ()=>{
        hover1=true;
    });
    plate1.addEventListener("mouseleave",()=>{
        hover1=false;
    });
    

    // plate 2 (non stackable)
    
    plate2.addEventListener("click", ()=>{
        if (hands.length==1 && p2.length<1 && Math.round(distance(camera, plate2))<4){
            camera.components.sound.playSound();
            plateadd(p2, hands[0]);
            p2.push(hands[0]);
            
            // delete item from hands
            topbun1.setAttribute("position",{x:topbun1.x,y:-10,z:topbun1.z});
            pickles1.setAttribute("position", {x:pickles1.x,y:-10,z:pickles1.z});
            botbun1.setAttribute("opacity",0);
            cheese1.setAttribute("opacity",0);
            patty1.setAttribute("opacity",0);


            hands.pop();
        }
    });

    plate2.addEventListener("mouseenter", ()=>{
        hover2=true;
    });
    plate2.addEventListener("mouseleave", ()=>{
        hover2=false;
    });
    
    // picking up items ability
    window.addEventListener("keydown", function(e){
        //plate1
        if (e.key == "e" && hands.length==0 && p1.length==1 && hover1&& Math.round(distance(camera, plate1))<4){
            plateremove(p1,p1[0]);
        }  

        //plate2
        if (e.key == "e" && hands.length==0 && p2.length==1 && hover2&& Math.round(distance(camera, plate2))<4){
            plateremove(p2,p2[0]);
        } 

        if (e.key == "e" && hands.length==0 && sp.length<6 && hover3&& Math.round(distance(camera, servingplate))<4){
            plateremove(sp,sp.at(-1));
        }

    });

    if(con1.length==5 && con2.length==5 && con3.length==5 && con4.length==5 && con5.length==5){
        run = true
    }

    for (food of conveyoritems){    
        
        for (items of food){
            if (run){
                if(food.indexOf(items)==0 && items.object3D.position.z<-0.8){
                    items.object3D.position.z = -0.8;
                    //console.log("running");
                }
                if(food.indexOf(items)==1 && items.object3D.position.z<-2.4){
                    items.object3D.position.z = -2.4;
                    //console.log("running2");
                }
                if(food.indexOf(items)==2 && items.object3D.position.z<-4){
                    items.object3D.position.z = -4;
                    //console.log("running3");
                }
                if(food.indexOf(items)==3 && items.object3D.position.z<-5.4){
                    items.object3D.position.z = -5.4;
                    //console.log("running4");
                }
                if(food.indexOf(items)==4 && items.object3D.position.z<-6.8){
                    items.object3D.position.z = -6.8;
                    //console.log("running5");
                }
            } 
        }
        
    }
    window.requestAnimationFrame( loop );
}

// distance function
function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}