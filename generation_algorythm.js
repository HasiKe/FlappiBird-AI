function Specie(genetic){
  this.fitness = 1;
  this.genetic = [];
  if(!genetic){
    for(var i = 0; i<nCon;i++){
      this.genetic[i] = random(-1,1);
    }
  }
  else this.genetic = genetic;
  
  this.bird = new Player(width*0.2,height/2);
  //this.network = new Network(I_,s_,l_,O_);
  this.network = new Network(neuronsColluns);
  this.network.applyGenetic(this.genetic);
}

Specie.prototype.draw = function(){ this.bird.draw();}

Specie.prototype.update = function(){
  this.network.clear();
  
  this.network.inputs[0].sum = this.bird.x/100;
  this.network.inputs[1].sum = this.bird.y/100;
  
  this.network.inputs[2].sum = wall[0].x/100;
  this.network.inputs[3].sum = wall[0].y/100;
  
  this.bird.acel+=0.4;
  this.network.outputs[0].output();
  if(this.network.outputs[0].sum>1) this.bird.Jump();
  this.bird.update();
}

function NewGenerate(g){
  var b = 0;
  var fitMax = 1;
  for(var i=0;i<g.length;i++) if(g[i].fitness>fitMax){ fitMax = g[i].fitness; b=i;}
  
  var gen = [new Specie(g[b].genetic.slice())];
  
  while(gen.length < nGen - 1){
    var a = pick(g,fitMax);
    
    mutate(a);
    
    gen.push(new Specie(a));
  }
  gen.push(new Specie());
  return gen;
}

function mutate(arr){
  var m = mutRang;
  if(random(1)<0.3) m = mutRang*10;
  for(var i = 0; i<arr.length;i++){
    if(random(1)<m)
      arr[i] = random(-1,1);
  }
}

function pick(g,fitMax){
  var i = floor(random(g.length));
  var p = g[i];
  while(random(1)>p.fitness/fitMax){
    i = floor(random(g.length));  
    p = g[i];
  }
  return p.genetic.slice();
}
