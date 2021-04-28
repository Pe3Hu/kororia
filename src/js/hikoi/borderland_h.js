//
class borderland_h {
  constructor (  ){
    this.const = {
      grade: 2,
      a: CELL_SIZE * 1
    };
    this.data = {
      isle: null
    }

    this.init();
  }

  init(){
    this.data.isle = new isle_h( this.const.grade, this.const.a, this );
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
  }

  draw( offsets ){
    this.update();

    this.data.isle.draw( offsets[0].copy() );
  }
}
