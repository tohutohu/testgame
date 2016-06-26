var canvas;
var ctx;
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var Asset = {};
var mikanX = 0;
var mikanY = 0;
var Key = {up:false,down:false,right:false,left:false};

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
  { type: 'image', name: 'box', src:'assets/mikan.png'}
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

var lastTimestamp;

function update(timestamp){
  var delta = 0;
  if(lastTimestamp != null){
    delta =(timestamp - lastTimestamp)/1000;
  }
  lastTimestamp = timestamp;

  if(Key['right']&&Key['left']){
  }else if(Key['right']){
    mikanX += 100*delta;
  }else if(Key['left']){
    mikanX -= 100*delta;
  }

  if(Key['up']&&Key['down']){
  }else if(Key['up']){
    mikanY -= 100*delta;
  }else if(Key['down']){
    mikanY += 100*delta;
  }


  requestAnimationFrame(update);
  render();
}

function render(){
  //全体をクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(Asset.images['back'],0,0);
  ctx.drawImage(Asset.images['box'],mikanX,mikanY);
}
