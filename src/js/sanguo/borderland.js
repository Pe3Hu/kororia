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
      }
    };
    this.data = {
    };

    this.init();
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
  }

  draw( offsets ){
    this.update();

    this.data.isle.draw( offsets[0].copy() );
  }
}
