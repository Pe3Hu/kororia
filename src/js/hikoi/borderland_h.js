//
class borderland_h {
  constructor(){
    this.const = {
      grade: 2,
      a: CELL_SIZE * 13 / 8
    };
    this.data = {
      isle: null,
      command_center: [],
      detailed: null
    }

    this.init();
  }

  init(){
    this.data.isle = new isle_h( this );
    this.data.command_center = new command_center_h( this );
    this.data.detailed = new detailed_h( this );
  }

  click( offsets ){
    this.data.detailed.click( offsets[0] );
    this.data.isle.click( offsets[0] );
    
    if( this.data.isle.var.selected.foothold != null || !this.data.detailed.flag.clicked )
      this.data.detailed.set_donor( this.data.isle.var.selected.foothold );

  }

  key(){
    this.data.isle.key();
    this.data.detailed.key();
  }

  moved( offsets ){
  }

  update(){
  }

  draw( offsets ){
    this.update();

    this.data.isle.draw( offsets[0].copy() );
    this.data.detailed.draw( offsets[0].copy() );
  }
}
