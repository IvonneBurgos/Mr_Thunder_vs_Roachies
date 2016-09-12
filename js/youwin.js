var youwin = function(game){
 	console.log("%cYou Win", "color:white; background:red");
};
  
youwin.prototype = {
	preload: function(){
          //this.game.load.image('g',"assets/images/GameImage-01.png");
         // this.game.add.sprite(800,800,'loading');
        console.log('hello its me You Win');
        this.game.sound.stopAll();
	},
  	create: function(){
		var playButton = this.game.add.button(0,0,"youwin",this.playTheGame,this);
	}
}