var canvas;
var ctx;
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var Asset = {};
var mikanX = 370;
var mikanY = 500;
var Key = {up:false,down:false,right:false,left:false};
var lastTimestamp;
var mikans = [];
var lastmikan = 0;

//commmit test

Asset.images={};

window.addEventListener('load',init);
window.addEventListener('keydown',keyDownHandler);
window.addEventListener('keyup',keyUpHandler);

function keyDownHandler(e){
  if(e){
    switch(e.keyCode){
      case 38:
        Key['up'] = true;
        break;
      case 40:
        Key['down'] = true;
        break;
      case 37:
        Key['left'] = true;
        break;
      case 39:
        Key['right'] = true;
        break;
    }
  }
};

function keyUpHandler(e){
  if(e){
    switch(e.keyCode){
      case 38:
        Key['up'] = false;
        break;
      case 40:
        Key['down'] = false;
        break;
      case 37:
        Key['left'] = false;
        break;
      case 39:
        Key['right'] = false;
        break;
    }
  }
};

Asset.assets =[
  { type: 'image', name: 'back', src:'assets/background.png'},
  { type: 'image', name: 'box', src:'assets/mikan.png'},
  { type: 'image', name: 'mikan',src:'assets/mikans.png'}
];

Asset._loadImage = function(asset, onLoad){
  var image = new Image();
  image.src = asset.src;
  image.onload = onLoad;
  Asset.images[asset.name] = image;
};

Asset.loadAssets = function(onComplete){
  var total = Asset.assets.length;
  var loadCount = 0;

  var onLoad = function(){
    loadCount++;
    if(loadCount >= total){
      onComplete();
    }
  };

  Asset.assets.forEach(function(asset){
    switch(asset.type){
      case 'image':
        Asset._loadImage(asset, onLoad);
        break;
    }
  });
};

//初期化

function init(){
  //ここに初期化処理を書く
  canvas = document.getElementById('maincanvas');
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  
  ctx = canvas.getContext('2d');

  Asset.loadAssets(function(){
    requestAnimationFrame(update);
  });
}


function update(timestamp){
  var delta = 0;
  if(lastTimestamp != null){
    delta =(timestamp - lastTimestamp)/1000;
  }
  lastTimestamp = timestamp;

  for(var i=0; i<mikans.length;i++){
    mikans[i]['y']+=mikans[i]['v'];
  }
  if(Key['right']&&Key['left']){
  }else if(Key['right']){
    mikanX += 200*delta;
  }else if(Key['left']){
    mikanX -= 200*delta;
  }

  if(Key['up']&&Key['down']){
  }else if(Key['up']){
    mikanY -= 100*delta;
  }else if(Key['down']){
    mikanY += 100*delta;
  }

  if(timestamp-lastmikan>1000){
    mikans.push({x:Math.floor(Math.random()*801),y:0,v:Math.floor(Math.random()*6)});
    lastmikan=timestamp;
  }


  requestAnimationFrame(update);
  render();
}

function render(){
  //全体をクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(Asset.images['back'],0,0);
  ctx.drawImage(Asset.images['box'],mikanX,mikanY);
  for(var i=0;i<mikans.length;i++){
    ctx.drawImage(Asset.images['mikan'],mikans[i]['x'],mikans[i]['y']);
  }
}
