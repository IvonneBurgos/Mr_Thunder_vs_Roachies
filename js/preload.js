var preload = function(game){}

preload.prototype = {
    preload: function(){
           this.game.load.image('instructions',"assets/images/GameImage-02.png");
           console.log('hello its me 2');
	},
  	create: function(){
 		var playButton = this.game.add.button(0,0,"loading",this.playTheGame,this);
		this.music = this.game.sound.play('intro');
	},
	playTheGame: function(){
		this.game.state.start("instruction");
	}
}