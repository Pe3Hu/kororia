//
class debate {
  constructor (  ){
    this.const = {
      size: 3
    };
    this.var = {
    };
    this.data = {
      tribune: null
    }

    this.init();
  }

  init(){
    this.data.tribune = new tribune( this.const.size );
  }

  click( offset ){
    this.data.tribune.click( offset );
  }

  key(){
    this.data.tribune.key();
  }

  moved( offsets ){
  }

  draw( offset ){
    this.data.tribune.draw( offset );
  }
}
