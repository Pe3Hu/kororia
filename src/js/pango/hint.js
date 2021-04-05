//
class hint {
  constructor ( index, ring, anchor, type, swing, a ){
    this.const = {
      index: index,
      anchor: {
        index: anchor,
        grid: createVector(),
        center: createVector(),
        flag: anchor != -1
      },
      type: type,
      swing: swing,
      a: a,
      n: 4,
      m: ring.const.m,
      scale: 1,
      stroke_weight: 1
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
    this.data = {
      ring: ring,
      cloth: new cloth( this )
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

  set_anchor(){
    if( !this.const.anchor.flag ){
      this.const.anchor.index = 0;

      if( this.const.type == 2 || this.const.type == 4 )
        this.const.anchor.index = this.const.m * this.const.swing;
    }

    this.const.anchor.grid = this.data.cloth.convert_index( this.const.anchor.index );
    this.const.anchor.center = this.data.cloth.get_anchor( this.const.anchor.grid );

  }

  init_hyphens(){
    this.array.dot = [ createVector() ];
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

  init(){
    this.init_vertexs();
    this.init_hyphens();
    this.set_anchor();
    this.anchor_check();
  }

  add_hyphen( hyphen ){
    this.var.current.shift.add( this.array.vertex[hyphen] );
    this.array.dot.push( this.var.current.shift.copy() );
    this.array.hyphen.push( hyphen );
  }

  anchor_check(){
    let flag = this.data.cloth.border_crossing_check( this );

    if( !flag ){
      this.const.anchor.index = -1;
      this.const.anchor.flag = false;
      this.set_anchor();
    }

  }

  draw( offset ){
    let vec = offset.copy();

    this.data.cloth.draw( vec );
    stroke( 0 );
    strokeWeight( this.const.stroke_weight );
    vec.x -= this.const.stroke_weight / 2;
    vec.y -= this.const.stroke_weight / 2;

    vec.add( this.const.anchor.center  )

    for( let i = 0; i < this.array.dot.length - 1; i++ ){
      let ii = i + 1;

      line( this.array.dot[i].x + vec.x, this.array.dot[i].y + vec.y,
            this.array.dot[ii].x + vec.x, this.array.dot[ii].y + vec.y )
    }


  }
}
