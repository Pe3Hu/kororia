//
class ring {
  constructor ( jack ){
    this.const = {
      size: 3,
      a: jack.const.a
    };
    this.var = {
    };
    this.array = {
    };
    this.data = {
      jack: jack
    };

    this.init();
  }

  init(){
    this.data.cloth = new cloth( this );
  }

  click(){
  }

  key(){
  }

  draw( offset ){
    this.data.cloth.draw( offset );
  }
}
