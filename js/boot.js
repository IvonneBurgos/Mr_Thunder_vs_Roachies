var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};
  
boot.prototype = {
	preload: function(){
        this.game.load.image("loading","../assets/images/GameTitle.jpg");
        
    },
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.setScreenSize();
       // var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
//  playButton.anchor.setTo(0.5,0.5);
	}
    //playTheGame: function(){
	//	this.game.state.start("Preload");
	//}
}