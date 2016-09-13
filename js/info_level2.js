var info_level2 = function(game){}
 
info_level2.prototype = {
    preload: function(){
        this.game.sound.stopAll();
	},
  	create: function(){
        this.music = this.game.sound.play('intro');
        var playButton = this.game.add.button(0,0,"info_level2",this.playTheGame,this);

	},
    playTheGame:function(){
        this.game.state.start("level2");
    }
}