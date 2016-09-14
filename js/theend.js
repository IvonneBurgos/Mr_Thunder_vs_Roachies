var theend = function(game){
 	console.log("%cThe end?", "color:white; background:red");
};
  
theend.prototype = {
	preload: function(){
        console.log('hello its me theend');
        this.game.sound.stopAll();
        
	},
  	create: function(){
		var playButton = this.game.add.button(0,0,"theend",this.playTheGame,this);
        this.game.sound.play('africa');
	},
    playTheGame: function(){
        this.game.sound.stopAll();
        this.game.state.start("Boot");
    }
}