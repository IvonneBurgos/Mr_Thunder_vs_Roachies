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
    
    this.RUNNING_SPEED = 150;
    this.locs = [];
    this.groupCosas;
    this.customParams = {health: 100, attempts: 3, score:0};
    this.interval = Phaser.Timer.SECOND * 1;
  },

  //load the game assets before the game starts
  preload: function() {
    this.game.load.audio('intro', ['assets/audio/Intro.mp3']);
    this.game.load.audio('gameover', ['assets/audio/gameover.mp3']);
    this.game.load.audio('win', ['assets/audio/win.mp3']);
    this.game.load.image('gameover',"assets/images/GameImage-03.png");
    this.game.load.image('youwin',"assets/images/GameImage-04.png");
    this.game.load.image('spray', 'assets/images/spray.png'); 
    this.game.load.spritesheet('cosas', 'assets/images/items-01.png', 58, 60);
    this.game.load.image('roach', 'assets/images/roach.png', 48, 58);
    this.game.load.image('boss', 'assets/images/roachFinal.png', 48, 58);
  },
  
    //executed after everything is loaded
  create: function() {  
    this.timer = this.game.time.create(false);
    this.bossScore = 20;
    this.roachDead = 0;
    this.counter=60;
      
    this.customParams.health = 100;
    this.customParams.score = 0;
    //create a sprite for the background
    var snap = this.game.math.snapTo(this.game.world.randomX, 32) / 32;
    //spray
    this.spray = this.game.add.sprite(40, 50, 'spray');
    this.spray.enableBody = true;
    this.spray.anchor.setTo(0.5, 0.5);
      this.spray.scale.setTo(0.7);
    //this.spray.scale.setTo(0.3); 
    this.game.physics.arcade.enable(this.spray);
    this.spray.customParams = this.customParams;
   
      //items
   
      this.groupCosas = this.add.group();
    
      this.groupCosas.enableBody = true;
        for (var i=0; i< 20; i++){ 
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
   
    this.style = {font: '20px Arial', fill:'#fff'};
    this.style2 = {font: '20px Arial', fill:'#ff0000'};
    this.text = this.game.add.text(650, 20, 'Timer: 60', this.style);
    this.game.add.text(535,20,'Health: ', this.style);
    this.healthText = this.game.add.text(600,20,'',this.style);
    this.game.add.text(410,20,'Attempts: ', this.style);
    this.attempts = this.game.add.text(500,20,'',this.style);
    this.game.add.text(300,20,'Score: ', this.style);
    this.score = this.game.add.text(360,20,'',this.style2);
    this.refreshStats();
      
    this.groupCosas.setAll('body.immovable', true);
    this.roachies.setAll('body.immovable', true);
      //cronometro - tiempo
    this.timer.loop(this.interval, this.updateCounter, this);
    this.timer.start();
  }, 
    
  update: function() {
      
    this.game.physics.arcade.collide(this.spray, this.roachies, this.collisionHandler, null, this);
    this.game.physics.arcade.collide(this.spray, this.groupCosas, this.collisionHandlerItems, null, this);
    this.spray.body.velocity.x = 0;
    this.spray.body.velocity.y = 0;
      
    if (this.boss){
         this.game.physics.arcade.collide(this.spray, this.boss, this.collisionHandlerBoss, null, this);
         this.refreshStats();
        console.log('osea se choca pues al big boss');
    }  

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
        this.attempts.text = this.spray.customParams.attempts;
        this.score.text = this.spray.customParams.score;
    },
    
    bigboss: function(){
            console.log('crea al big boss');
            this.boss = this.game.add.sprite(this.game.rnd.between(60, 700), this.game.rnd.between(100, 700), 'boss');
            this.boss.enableBody = true;
            this.boss.anchor.setTo(0.5, 0.5);
            this.boss.scale.setTo(2);
            this.game.physics.arcade.enable(this.boss);
            this.boss.body.immovable = true;
    },
  updateCounter:function() {
    if (this.counter > 0){
         this.counter-=1;
        this.text.setText('Timer: ' + this.counter);
    }
      else {
          
          if (this.spray.customParams.attempts > 1){
              this.timer.destroy();
              this.game.world.removeAll();
              this.customParams.attempts -=1;
              this.create();
          }else{
              this.timer.remove();
              this.game.state.start("GameOver");
          }
    }
},
    collisionHandler:function(spray, roachies){
        this.spray.customParams.health -= 5;
        if (this.spray.customParams.health > 0){
            roachies.kill();
            this.roachDead +=1;
            this.spray.customParams.score +=10;
            this.refreshStats();
            if (this.spray.customParams.score == 100){
                console.log('llama a funcion big boss');
                this.bigboss();
            }
            
        } else {
            this.healthState();
        }
    },
    collisionHandlerBoss:function (spray, boss) {
        this.spray.customParams.health -=10;
        if (this.spray.customParams.health > 0){
            this.bossScore -=10;
            this.spray.customParams.score +=20;
            this.refreshStats();
            if (this.bossScore == 0){
                console.log('mata al big boss');
                boss.kill();
                this.game.state.start("YouWin");
            }else {
                this.boss.kill();
                this.bigboss();
            }
        } else {
            this.boss.destroy();
            this.healthState();
        }
        
        this.refreshStats();
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
        if (this.spray.customParams.attempts > 1){
              this.timer.destroy();
              this.game.world.removeAll();
              this.customParams.attempts -=1;
              this.create();
          }else{
              this.timer.remove();
              this.game.state.start("GameOver");
        }
    }
}