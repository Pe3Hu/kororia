//
class command_post {
  constructor ( fraction, a, isle ){
    this.const = {
      fraction: fraction,
      a: a
    };
    this.var = {
      offset: createVector()
    };
    this.array = {
      demesne: []
    };
    this.data = {
      isle: isle,
      capital: null
    };

    this.init();
  }

  init(){
    this.update_domains();
    this.offset_to_capital();
  }

  update_domains(){
    let isle = this.data.isle;
    this.array.demesne = [];

    for( let domains of isle.array.domain )
      for( let domain of domains )
        if( domain.var.fraction == this.const.fraction ){
          this.array.demesne.push( domain.data.demesne );

          if( domain.flag.capital )
            this.data.capital = domain;
        }

    console.log( this.array.demesne )
  }

  offset_to_capital(){
    let isle = this.data.isle;

    let x = Math.floor( isle.const.m / 2 ) - isle.const.m % 2 * 0.5;
    let y = ( Math.floor( isle.const.m / 2 ) - 1 ) * 2 + 0.33;

    let center  = createVector(
       isle.const.r * 2 * x,
       isle.const.a * 1.5 * y  + this.const.a );

    this.var.offset = center.copy();
    this.var.offset.sub( this.data.capital.const.center );
  }

  draw( offset ){
    let vec = offset.copy();
    vec.add( this.var.offset );

    for( let demesne of this.array.demesne )
      demesne.draw( vec );
  }
}
