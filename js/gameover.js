var gameover = function(game){
 	console.log("%cGameOver", "color:white; background:red");
};
  
gameover.prototype = {
	preload: function(){
        console.log('hello its me game over');
        this.game.load.sound('introlater', ['assets/audio/Intro.mp3']);
        this.game.sound.removeByKey('intro');
        
	},
  	create: function(){
		var playButton = this.game.add.button(0,0,"gameover",this.playTheGame,this);
        this.music = this.game.sound.play('gameover');
	},
    playTheGame: function(){
        this.game.state.start("info_level1");
    }
}