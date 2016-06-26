var canvas;
var ctx;
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var Asset = {};

window.addEventListener('load',init);

Asset.images={};

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

function update(){
  requestAnimationFrame(update);
  render();
}

function render(){
  //全体をクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(Asset.images['back'],0,0);
  ctx.drawImage(Asset.images['box'],0,0);
}
