//
class hint {
  constructor ( index, type, swing, a ){
    this.const = {
      index: index,
      type: type,
      swing: swing,
      a: a,
      n: 4,
    };
    this.var = {
      current: {
        shift: createVector()
      }
    };
    this.array = {
      vertex: [],
      hyphen: [],
      dot: []
    };

    this.init();
  }

  init_vertexs(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a,
        Math.cos( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a );

      this.array.vertex.push( vec );
    }
  }

  init_dots(){
    this.array.dot = [ createVector() ];
  }

  init(){
    this.init_vertexs();
    this.init_dots();
    this.init_hyphens();
  }

  add_hyphen( hyphen ){
    this.var.current.shift.add( this.array.vertex[hyphen] );
    this.array.dot.push( this.var.current.shift.copy() );
    this.array.hyphen.push( hyphen );
  }


  init_hyphens(){
    let hyphen = ( this.const.type % 2 ) * 2;

    switch ( this.const.type ) {
      case 0:
      case 1:
      case 2:
        this.add_hyphen( 1 );
        break;
      case 3:
      case 4:
        for( let i = 0; i < this.const.swing; i++ )
          this.add_hyphen( hyphen );
        break;
    }

    switch ( this.const.type ) {
      case 1:
      case 2:
        for( let i = 0; i < this.const.swing; i++ )
          this.add_hyphen( hyphen );
        break;
      case 3:
      case 4:
        this.add_hyphen( 1 );
        break;
    }
  }

  draw( offset ){
    let vec = offset.copy();
    stroke( 0 );

    for( let i = 0; i < this.array.dot.length - 1; i++ ){
      let ii = i + 1;

      line( this.array.dot[i].x + vec.x, this.array.dot[i].y + vec.y,
            this.array.dot[ii].x + vec.x, this.array.dot[ii].y + vec.y )
    }


  }
}
