//
class borderland {
  constructor (  ){
    this.const = {
      size: 1
    };
    this.var = {
    };
    this.data = {
    };

    this.init();
  }

  init(){
    this.data.isle = new isle( this.const.size );
  }

  click( offsets ){
    this.data.isle.click( offsets );
  }

  key(){
    this.data.isle.key();
  }

  moved( offsets ){
  }

  draw( offsets ){
    this.data.isle.draw( offsets[0] );
  }
}
