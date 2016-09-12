var instruction = function(game){}
 
instruction.prototype = {
    preload: function(){
          this.game.load.image('info_level1',"assets/images/GameImage-05.png");
         // this.game.add.sprite(800,800,'loading');
        console.log('hello its me 3');
	},
  	create: function(){
        var playButton = this.game.add.button(0,0,"instructions",this.playTheGame,this);
	},
    playTheGame:function(){
        this.game.state.start("info_level1");
    }
}