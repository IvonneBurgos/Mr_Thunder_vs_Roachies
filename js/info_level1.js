var info_level1 = function(game){}
 
info_level1.prototype = {
    preload: function(){
        console.log('hello its me 4');
	},
  	create: function(){
        var playButton = this.game.add.button(0,0,"info_level1",this.playTheGame,this);
	},
    playTheGame:function(){
        this.game.state.start("level1");
    }
}