var youwin = function(game){
 	console.log("%cYou Win", "color:white; background:red");
};
  
youwin.prototype = {
	preload: function(){
        console.log('hello its me You Win');
        this.game.load.image('info_level2',"assets/images/GameImage-06.png");
        this.game.load.audio('intro', ['assets/audio/Intro.mp3']);
        this.game.sound.stopAll();
	},
  	create: function(){
		var playButton = this.game.add.button(0,0,"youwin",this.playTheGame,this);
        this.music = this.game.sound.play('win');
	},
    playTheGame:function(){
        this.game.state.start("info_level2");
    }
}