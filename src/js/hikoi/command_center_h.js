//
class command_center_h {
  constructor( borderland ){
    this.const = {
      player: 0
    };
    this.var = {
    };
    this.array = {
      pacer: []
    };
    this.data = {
      borderland: borderland
    };

    this.init();
  }

  init_pacers(){
    let isle = this.data.borderland.data.isle;

    for( let i = 0; i < isle.array.descent; i++ ){
      let flag = true;

      for( let footholds of this.array.foothold )
        for( let foothold of footholds )
          if( flag && foothold.var.owner.descent == isle.array.descent[i] )
            this.array.pacer.push( new pacer( i, foothold.const.index, isle ) )
    }

  }

  init(){
    this.init_pacers();
  }

  draw( offset ){
  }
}
