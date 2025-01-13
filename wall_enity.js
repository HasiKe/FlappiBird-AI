var Wall = function(x,y){
 this.x = x; 
 this.y = y;
}

Wall.prototype.draw = function(){
  fill(89, 68, 41);
  rect(this.x,0,60,this.y-45);
  rect(this.x,this.y+45,60,height - this.y - 45);
}

Wall.prototype.update = function(){
  this.x-=3;
}
