let items =[];
let burgersize;
let burgeritem;
let itemimg;

class Menu{
    constructor(y){
        this.y=y;

        // bottom slot
        this.slot1 = document.querySelector("#slot1");
        this.slot2 = document.querySelector("#slot2");
        this.slot3 = document.querySelector("#slot3");
        this.slot4 = document.querySelector("#slot4");
        this.slot5 = document.querySelector("#slot5");
        // top slot
        
    }

    // logic behind customers' orders
    choose(complete){
        if (!(complete)){
            order = [];
            items = ["pickles","patty","cheese"];
            burgersize = rnd(3,6);
            if (burgersize==3){
                burgeritem = rnd(0,3);
                order.push("botbun");
                order.push(items[burgeritem]);
                order.push("topbun");
            }
            if (burgersize == 4){
                burgeritem = rnd(0,3);
                order.push("botbun");
                order.push(items[burgeritem]);
                burgeritem = rnd(0,3);
                order.push(items[burgeritem]);
                order.push("topbun");
            }
            if (burgersize == 5){
                burgeritem = rnd(0,3);
                order.push("botbun");
                order.push(items[burgeritem]);
                burgeritem = rnd(0,3);
                order.push(items[burgeritem]);
                burgeritem = rnd(0,3);
                order.push(items[burgeritem]);
                order.push("topbun");
            }
        }
        

    }

    // physical display of customers' orders
    display(complete,customer){
        if (!(complete) && (Math.round(customer.object3D.position.x)==-6)){
            this.slot4.setAttribute("opacity",0);
            this.slot5.setAttribute("opacity",0);

            this.slot1.setAttribute("opacity", 1);
            this.slot1.setAttribute("src","#botbunimg");
            if (order.length==3){
                this.slot2.setAttribute("opacity", 1);
                if (order[1] == "patty"){
                    this.slot2.setAttribute("src","#pattyimg");
                } else if (order[1] == "cheese"){
                    this.slot2.setAttribute("src", "#cheeseimg");
                } else if (order[1] == "pickles"){
                    this.slot2.setAttribute("src", "#picklesimg");
                }
                this.slot3.setAttribute("opacity",1);
                this.slot3.setAttribute("src", "#topbunimg");
            }

            if (order.length==4){
                this.slot5.setAttribute("opacity",0);

                this.slot2.setAttribute("opacity", 1);
                this.slot3.setAttribute("opacity",1);
                
                for (let i = 1; i<order.length-1;i++){
                    if (i==1){
                        if (order[i] == "patty"){
                            this.slot2.setAttribute("src","#pattyimg");
                        }
                        if (order[i] == "cheese"){
                            this.slot2.setAttribute("src","#cheeseimg");
                        }
                        if (order[i] == "pickles"){
                            this.slot2.setAttribute("src","#picklesimg");
                        }
                    }

                    if (i==2){
                        if (order[i] == "patty"){
                            this.slot3.setAttribute("src","#pattyimg");
                        }
                        if (order[i] == "cheese"){
                            this.slot3.setAttribute("src","#cheeseimg");
                        }
                        if (order[i] == "pickles"){
                            this.slot3.setAttribute("src","#picklesimg");
                        }
                    }
                    
                }

                this.slot4.setAttribute("opacity",1);
                this.slot4.setAttribute("src", "#topbunimg");
            }

            if (order.length==5){
                this.slot2.setAttribute("opacity", 1);
                this.slot3.setAttribute("opacity",1);
                this.slot4.setAttribute("opacity", 1);
                
                for (let i = 1; i<order.length-1;i++){
                    if (i==1){

                        if (order[i] == "patty"){
                            this.slot2.setAttribute("src","#pattyimg");
                        }
                        if (order[i] == "cheese"){
                            this.slot2.setAttribute("src","#cheeseimg");
                        }
                        if (order[i] == "pickles"){
                            this.slot2.setAttribute("src","#picklesimg");
                        }
                    }

                    if (i==2){
                        if (order[i] == "patty"){
                            this.slot3.setAttribute("src","#pattyimg");
                        }
                        if (order[i] == "cheese"){
                            this.slot3.setAttribute("src","#cheeseimg");
                        }
                        if (order[i] == "pickles"){
                            this.slot3.setAttribute("src","#picklesimg");
                        }
                    }
                    
                    if (i==3){
                        if (order[i] == "patty"){
                            this.slot4.setAttribute("src","#pattyimg");
                        }
                        if (order[i] == "cheese"){
                            this.slot4.setAttribute("src","#cheeseimg");
                        }
                        if (order[i] == "pickles"){
                            this.slot4.setAttribute("src","#picklesimg");
                        }
                    }

                }

                this.slot5.setAttribute("opacity",1);
                this.slot5.setAttribute("src", "#topbunimg");
            }
        }
        // if ( !(Math.round(personal.object3D.position.x)==-6)){
        //     this.slot1.setAttribute("opacity",0);
        //     this.slot2.setAttribute("opacity",0);
        //     this.slot3.setAttribute("opacity",0);
        //     this.slot4.setAttribute("opacity",0);
        //     this.slot5.setAttribute("opacity",0);
        // }
        

    }


}