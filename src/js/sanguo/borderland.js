//
class borderland {
  constructor(  ){
    this.const = {
      grade: 1,
      a: CELL_SIZE * 1,
      fractions: 3
    };
    this.array = {
      commander: []
    };
    this.flag = {
      reset: {
        isle: false
      },
      commanders: {
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

  init_commanders(){
    for( let i = 0; i < this.const.fractions; i++ )
      this.array.commander.push( new commander( i, i, this.const.a, this.data.isle ) );

    this.flag.commanders.draw = true;
    this.flag.commanders.init = false;
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
    if( this.flag.commanders.init )
      this.init_commanders();
  }

  draw( offsets ){
    this.update();

    this.data.isle.draw( offsets[0].copy() );

    if( this.flag.commanders.draw )
      this.array.commander[this.data.player.fraction].draw( offsets[0].copy() );
  }
}
