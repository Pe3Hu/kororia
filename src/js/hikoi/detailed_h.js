//
class detailed_h {
  constructor( borderland ){
    this.const = {
      a: borderland.const.a,
      center: createVector()
    };
    this.var = {
      scale: 5
    };
    this.flag = {
      clicked: false
    };
    this.array = {
    };
    this.data = {
      borderland: borderland,
      pacer: borderland.data.command_center.array.pacer[borderland.data.command_center.const.player],
      donor: null
    };

    this.init();
  }

  init_center(){
    let isle = this.data.borderland.data.isle;
    let domain = isle.array.domain[isle.const.size][isle.array.domain[isle.const.size].length - 3];
    this.const.center = domain.const.center.copy();
    this.const.center.x += isle.const.r * 1.5;
    let x = ( CANVAS_SIZE.x - this.const.center.x - 3 * CELL_SIZE ) / 2;
    this.const.center.x += x;
  }

  init(){
    this.init_center();
  }

  set_donor( donor ){
    if( donor != null ){
      this.data.donor = donor.import_donor( this.var.scale );
      this.data.donor.data.demesne = donor.data.demesne.import_donor( this.var.scale );
      }
    else
      this.data.donor = null;
  }

  key( offset ){

  }

  click( offset ){
    if( this.data.donor != null ){
      let mouse = createVector( mouseX, mouseY );
      mouse.sub( this.const.center );
      mouse.sub( offset );
      let d = createVector().dist( mouse );


      if( d < this.data.donor.const.a / 2 ){
        this.flag.clicked = true;
      }
      else
        this.flag.clicked = false;
    }
  }

  draw( offset ){
    let vec = this.const.center.copy();
    vec.add( offset );

    if( this.data.donor != null ){
      this.data.donor.draw( vec );
    }
  }
}
