//
class cloth {
  constructor ( ring ){
    this.const = {
      size: ring.const.size,
      a: ring.const.a,
    };
    this.var = {
      current: {
        kink: 0
      }
    };
    this.array = {
      kink: []
    };
    this.data = {
      ring: ring
    }

    this.init();
  }

  init_kinks(){
    this.array.kink = [];
    let a = this.const.a * 3;

    for( let i = 0; i < this.const.size; i++ ){
      this.array.kink.push( [] );

      for( let j = 0; j < this.const.size; j++ ){
        let vec = createVector( a* j, a * i );

        this.array.kink[i].push( new kink( this.var.current.kink, vec, this.const.a ) );
        this.var.current.kink++;
      }
    }
  }

  init(){
    this.init_kinks();
  }

  draw( offset ){
  for( let kinks of this.array.kink )
    for( let kink of kinks )
      kink.draw( offset );
  }
}
