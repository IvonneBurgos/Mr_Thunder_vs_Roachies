var preload = function(game){}

preload.prototype = {
    preload: function(){
           this.game.load.image('instructions',"assets/images/GameImage-02.png");
            this.game.load.audio('win', ['assets/audio/win.mp3']);
        this.game.load.audio('gameover', ['assets/audio/gameover.mp3']);
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