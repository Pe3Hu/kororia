//
class borderland_h {
  constructor(){
    this.const = {
      grade: 2,
      a: CELL_SIZE * 13 / 8
    };
    this.data = {
      isle: null,
      command_center: []
    }

    this.init();
  }

  init(){
    this.data.isle = new isle_h( this );
    this.data.command_center = new command_center_h( this );
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
