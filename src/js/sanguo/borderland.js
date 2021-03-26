//
class borderland {
  constructor (  ){
    this.const = {
      grade: 1,
      a: CELL_SIZE * 1
    };
    this.flag = {
      reset: {
        isle: false
      },
      command_post: {
        init: false,
        draw: false
      }
    };
    this.data = {
      player: {
        fraction: 1
      }
    };

    this.init();
  }

  init_command_post(){
    this.data.command_post= new command_post( this.data.player.fraction, this.const.a, this.data.isle );
    
    this.flag.command_post.draw = true;
    this.flag.command_post.init = false;
  }

  init(){
    this.data.isle = new isle( this.const.grade, this.const.a, this );


  }

  click( offsets ){
    this.data.isle.click( offsets );
  }

  key(){
    this.data.isle.key();
  }

  moved( offsets ){
  }

  update(){
    if( this.flag.reset.isle ){
      this.flag.reset.isle = false;
      this.data.isle = new isle( this.const.grade, this.const.a, this );
    }
    if( this.flag.command_post.init )
      this.init_command_post();
  }

  draw( offsets ){
    this.update();

    this.data.isle.draw( offsets[0].copy() );

    if( this.flag.command_post.draw )
      this.data.command_post.draw( offsets[0].copy() );
  }
}
