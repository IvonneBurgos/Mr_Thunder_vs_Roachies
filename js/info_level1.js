var info_level1 = function(game){}
 
info_level1.prototype = {
	preload: function(){ 
		this.game.load.image("instructions","assets/images/Level1.jpg");

	},
  	create: function(){
        var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
        playButton.anchor.setTo(0.5,0.5);
	},
    playTheGame:function(){
        this.game.state.start("level1");
    }
}