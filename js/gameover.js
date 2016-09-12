var gameover = function(game){
 	console.log("%cGameOver", "color:white; background:red");
};
  
gameover.prototype = {
	preload: function(){
          //this.game.load.image('g',"assets/images/GameImage-01.png");
         // this.game.add.sprite(800,800,'loading');
        console.log('hello its me game over');
	},
  	create: function(){
		var playButton = this.game.add.button(0,0,"gameover",this.playTheGame,this);
	}
}