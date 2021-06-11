//
class expanse {
  constructor(){
    this.const = {
      a: CELL_SIZE 
    };
    this.data = {
      map: null,
    }

    this.init();
  }

  init(){
    this.data.map = new map( this );
  }

  click( offsets ){
    this.data.map.click( offsets[0] );

  }

  key(){
    this.data.map.key();
  }

  moved( offsets ){
  }

  update(){
  }

  draw( offsets ){
    this.update();

    this.data.map.draw( offsets[0].copy() );
  }
}
