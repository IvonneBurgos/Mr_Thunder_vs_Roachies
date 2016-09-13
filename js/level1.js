//this game will have only 1 state
var level1 = function(game){
console.log('Inicio de Juego');
}
level1.prototype = {

  //initiate game settings
  init: function() {
    //adapt to screen size, fit all the game
   
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
      
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.counter=60;
    this.RUNNING_SPEED = 150;
    this.roachDead = 0;
      this.locs = [];
      this.groupCosas;
  },

  //load the game assets before the game starts
  preload: function() {
    this.game.load.audio('win', ['assets/audio/win.mp3']);
    this.game.load.audio('gameover', ['assets/audio/gameover.mp3']);
    this.game.load.image('gameover',"assets/images/GameImage-03.png");
    this.game.load.image('youwin',"assets/images/GameImage-04.png");
    this.game.load.image('spray', 'assets/images/spray.png'); 
    this.game.load.spritesheet('cosas', 'assets/images/items-01.png', 58, 60);
    this.game.load.image('roach', 'assets/images/roach.png', 48, 58); 
  },
  
    //executed after everything is loaded
  create: function() {    
    
    //create a sprite for the background
     var snap = this.game.math.snapTo(this.game.world.randomX, 32) / 32;
    console.log('holis '+snap);
    //spray
    this.spray = this.game.add.sprite(40, 50, 'spray');
    this.spray.enableBody = true;
    this.spray.anchor.setTo(0.5, 0.5);
    //this.spray.scale.setTo(0.3); 
    this.game.physics.arcade.enable(this.spray);
    this.spray.customParams ={health: 100};
   
      //items
   
      this.groupCosas = this.add.group();
    
      this.groupCosas.enableBody = true;
        for (var i=0; i< 30; i++){ 
            this.createUniqueLocation();
        };
      this.groupCosas.forEach(function(item) {
          item.animations.add('blink', [this.game.rnd.between(0, 4), this.game.rnd.between(0, 4), this.game.rnd.between(0, 4), this.game.rnd.between(0, 4)], 6, true);
          item.animations.play('blink');
        }, this);
    this.roachies = this.add.group();
    for (var j=0; j< 10; j++){
        this.roachies.create(this.game.rnd.between(60, 700), this.game.rnd.between(100, 700), 'roach', 1); 

    };
      //fisica
      this.game.physics.arcade.enable(this.roachies);
      this.game.physics.arcade.enable(this.groupCosas);
    //texto
    this.text = this.game.add.text(700, 40, 'Tiempo: 60', { font: "25px Arial", fill: "#fff", align: "center" });
    this.text.anchor.setTo(0.5, 0.5);
    this.style = {font: '20px Arial', fill:'#fff'};
    this.game.add.text(10,20,'Health: ', this.style);
    this.healthText = this.game.add.text(80,20,'',this.style);  
    this.refreshStats();
      
    this.groupCosas.setAll('body.immovable', true);
    this.roachies.setAll('body.immovable', true);

      
      //cronometro - tiempo
    this.game.time.events.loop(Phaser.Timer.SECOND * 1, this.updateCounter, this);
  }, 
    
  update: function() {
      
    this.game.physics.arcade.collide(this.spray, this.roachies, this.collisionHandler, null, this);
    this.game.physics.arcade.collide(this.spray, this.groupCosas, this.collisionHandlerItems, null, this);
    this.spray.body.velocity.x = 0;
    this.spray.body.velocity.y = 0;

    if (this.cursors.left.isDown)
    {
       this.spray.body.velocity.x = -this.RUNNING_SPEED;
    }
    else if (this.cursors.right.isDown)
    {
        this.spray.body.velocity.x = this.RUNNING_SPEED;
    }

    if (this.cursors.up.isDown)
    {
        this.spray.body.velocity.y = -this.RUNNING_SPEED;
    }
    else if (this.cursors.down.isDown)
    {
        this.spray.body.velocity.y = this.RUNNING_SPEED;
    }
  },
    createUniqueLocation: function() {

    do {
        var x = this.game.math.snapTo( this.game.rnd.between(60, 700), 58) / 58;
        var y = this.game.math.snapTo( this.game.rnd.between(100, 700), 58) / 58;

        if (y > 30)
        {
            y = 30;
        }

        var idx = (y * 30) + x;
    }
    while (this.locs.indexOf(idx) !== -1)

    this.locs.push(idx);

    this.groupCosas.create(x * 58, y * 58, 'cosas', this.game.rnd.integerInRange(0, 4));

},
    
    refreshStats: function(){
        this.healthText.text = this.spray.customParams.health;
    },
  updateCounter:function() {
    if (this.counter > 0){
         this.counter--;
        this.text.setText('Tiempo: ' + this.counter);
    }
      else {
          this.game.time.events.destroy();
          this.game.state.start("GameOver");
    }
},
    collisionHandler:function (spray, roachies) {
        if (this.spray.customParams.health > 0){
            this.spray.customParams.health -= 5;
            roachies.kill();
            this.roachDead +=1;
            this.refreshStats();
            if (this.roachDead == 10){
                this.game.state.start("YouWin");
            }
        } else {
            this.healthState();
        }
    },
    collisionHandlerItems:function (spray, groupCosas) {

    if (this.spray.customParams.health > 0){
        this.spray.customParams.health -= 1;
        this.refreshStats();
    } else {
        this.healthState();
    }
    },
    healthState: function (){
        this.game.state.start("GameOver");
    }

}



