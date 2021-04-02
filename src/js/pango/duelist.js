//
class duelist {
  constructor ( jack ){
    this.const = {
      a: jack.const.a
    };
    this.var = {
      current: {
        hint: 0
      }
    };
    this.array = {
      hint: []
    };
    this.data = {
      underself: new underself( this ),
      jack: jack
    };

    this.init();
  }

  init_hints(){
    let type = 3;
    let swing = 1;

    this.add_hint( type, swing );
  }

  init(){
    this.init_hints();
  }

  add_hint( type, swing ){
    this.array.hint.push( new hint( this.var.current.hint, type, swing, this.const.a ) );
    this.var.current.hint++;
  }

  draw( offset ){

    for( let hint of this.array.hint )
      hint.draw( offset )
  }
}
