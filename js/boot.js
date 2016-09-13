var boot = function(game){
 	console.log("%cStarting my awesome game", "color:white; background:red");
};
  
boot.prototype = {
	preload: function(){
        this.game.load.image('loading',"assets/images/GameImage-01.png");
        this.game.load.sound('intro', ['assets/audio/Intro.mp3']);
        this.game.load.sound('introlater', ['assets/audio/Intro.mp3']);
        this.game.load.sound('win', ['assets/audio/win.mp3']);
        this.game.load.sound('gameover', ['assets/audio/gameover.mp3']);
        //this.game.load.sound('intro', ['assets/audio/Intro.mp3']);
         // this.game.add.sprite(800,800,'loading');
        console.log('hello its me');
	},
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.setScreenSize();
		this.game.state.start("Preload");
	}
}