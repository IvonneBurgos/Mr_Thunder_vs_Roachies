var gameover = function(game){
 	console.log("%cGameOver", "color:white; background:red");
};
  
gameover.prototype = {
	preload: function(){
        console.log('hello its me game over');
        this.game.load.audio('intro', ['assets/audio/Intro.mp3']);
        this.game.sound.stopAll();
        
	},
  	create: function(){
		var playButton = this.game.add.button(0,0,"gameover",this.playTheGame,this);
        this.game.sound.play('gameover');
	},
    playTheGame: function(){
        this.game.state.start("info_level1");
    }
}