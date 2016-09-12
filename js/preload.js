var preload = function(game){}
 
preload.prototype = {
	preload: function(){ 
		this.game.load.image("instructions","assets/images/Instructions.jpg");

	},
  	create: function(){
        var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
        playButton.anchor.setTo(0.5,0.5);
	},
    playTheGame:function(){
        this.game.state.start("info_level1");
    }
}