function Box(x,y,width,height,category){

    //declaring private variables
    var x = x;
    var y = y;
    var width = width;
    var height = height;

    this.category = category;
    
    this.mouseOver = function(mouseX, mouseY){
        if(mouseX>x && mouseX<x+width && mouseY > y && mouseY<y+height){
            return this.category.name;
        }
        return false;
    }
    
    this.draw= function(){
        fill(category.colour);
        rect(x,y,width,height);
    }
    
}