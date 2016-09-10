//this game will have only 1 state
var GameState = {

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
  },

  //load the game assets before the game starts
  preload: function() {
    
    this.game.load.image('spray', 'assets/images/spray-01.png'); 
    this.game.load.spritesheet('cosas', 'assets/images/items-01.png', 58, 60);
    this.game.load.spritesheet('roach', 'assets/images/roachies-01.png', 60, 61, 1, 1, 1);  
      
  },
  
    //executed after everything is loaded
  create: function() {    
    
    //create a sprite for the background
    
    
    //spray
    this.spray = this.game.add.sprite(40, 50, 'spray');
    this.spray.enableBody = true;
    this.spray.anchor.setTo(0.5, 0.5);
    //this.spray.scale.setTo(0.3); 
    this.game.physics.arcade.enable(this.spray);
    this.spray.customParams ={health: 100};
   
      //items
    this.items = this.add.group();
    this.items.enableBody = true;
    for (var i=0; i< 30; i++){
    this.items.create(this.game.rnd.between(60, 700), this.game.rnd.between(100, 700), 'cosas', this.game.rnd.between(0, 10)); 
    };
      
      //roachies
    this.roachies = this.add.group();
    for (var j=0; j< 10; j++){
        this.roachies.create(this.game.rnd.between(60, 700), this.game.rnd.between(100, 700), 'roach', 1); 
        //this.roachies.scale.setTo(1);
    };
      //fisica
      this.game.physics.arcade.enable(this.roachies);
      this.game.physics.arcade.enable(this.items);
    //texto
    this.text = this.game.add.text(700, 40, 'Tiempo: 60', { font: "25px Arial", fill: "#fff", align: "center" });
    this.text.anchor.setTo(0.5, 0.5);
    this.style = {font: '20px Arial', fill:'#fff'};
    this.game.add.text(10,20,'Health: ', this.style);
    this.healthText = this.game.add.text(80,20,'',this.style);  
    this.refreshStats();
      
    this.items.setAll('body.immovable', true);
    this.roachies.setAll('body.immovable', true);

      
      //cronometro - tiempo
    this.game.time.events.loop(Phaser.Timer.SECOND * 1, this.updateCounter, this);
  }, 
    
  update: function() {
      
    this.game.physics.arcade.collide(this.spray, this.roachies, this.collisionHandler, null, this);
    this.game.physics.arcade.collide(this.spray, this.items, this.collisionHandlerItems, null, this);
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
    }
},
    collisionHandler:function (spray, roachies) {
        
        if (this.spray.customParams.health > 0){
            this.spray.customParams.health -= 5;
            roachies.kill();
            this.refreshStats();
        }
        
            
    
    },
    collisionHandlerItems:function (spray, items) {
        
        if (this.spray.customParams.health > 0){
          this.spray.customParams.health -= 1;
          this.refreshStats();}
    
    }
    
};

//initiate the Phaser framework
var game = new Phaser.Game(800, 800, Phaser.AUTO);
var bounds;

var texture;

game.state.add('GameState', GameState);
game.state.start('GameState');

