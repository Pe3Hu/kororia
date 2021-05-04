//
class substance_h {
  constructor( index, a, domain, phase, genesis, concentration ){
    this.const = {
      index: index,
      a: a / 2,
      phase: phase,
      genesis: genesis,
      concentration: concentration
    };
    this.var = {
      scale: 2 / 3
    };
    this.array = {
      vertex: [],
      genesis_dot: [ [], [], [] ]
    };
    this.color = {
      s: COLOR_MAX * 0.75,
      l: COLOR_MAX * 0.5
    };
    this.data = {
      domain: domain
    }

    this.init();
  }

  init_vertexs(){
    let n = 3;

    for( let i = 0; i < n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / n * ( - i + n / 2 ) ) * this.const.a * this.var.scale,
        Math.cos( Math.PI * 2 / n * ( - i + n / 2 ) ) * this.const.a * this.var.scale );

      this.array.vertex.push( vec );
    }
  }

  init_genesis_dots(){
    let n = 8;


    for( let i = 0; i < n; i++ ){
      let a = this.const.a / 2;

      let vec = createVector(
        Math.sin( Math.PI * 2 / n * ( - i + n / 2 ) ) * a,
        Math.cos( Math.PI * 2 / n * ( - i + n / 2 ) ) * a );


      this.array.genesis_dot[1].push( vec.copy() );

      if( i % 2 == 1 ){
        a = this.const.a * this.var.scale;

        vec = createVector(
          Math.sin( Math.PI * 2 / n * ( - i + n / 2 ) ) * a,
          Math.cos( Math.PI * 2 / n * ( - i + n / 2 ) ) * a );
      }

      this.array.genesis_dot[0].push( vec.copy() );
    }

    let dots = [];
    n = 3;
    let a = this.const.a / ( 2 * Math.sqrt( 3 ) );

    for( let i = 0; i < n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / n * ( -0.5 - i + n / 2 ) ) * a,
        Math.cos( Math.PI * 2 / n * ( -0.5 - i + n / 2 ) ) * a );

      dots.push( vec.copy() );
    };

    this.array.genesis_dot[2] = [
      dots[0].copy(),
      dots[2].copy(),
      dots[1].copy(),
      dots[1].copy(),


      dots[1].copy(),
      dots[0].copy(),
      dots[2].copy(),
      createVector(
        Math.sin( Math.PI ) * this.const.a * this.var.scale,
        Math.cos( Math.PI ) * this.const.a * this.var.scale )
    ];
  }

  init(){
    this.init_vertexs();
    this.init_genesis_dots();


    this.data.domain.set_substance( this );
  }

  set_phase( phase ){
    //0 - gas
    //1 - liquid
    //2 - solid
    this.var.phase = phase;
  }

  set_genesis( genesis ){
    this.var.genesis = genesis;
  }

  increase_concentration(){
    this.var.concentration++;
  }

  draw( offset ){
    strokeWeight( STROKE_WEIGHT );
    stroke( 0 );
    noFill();
    fill( COLOR_MAX * 1 / 3 );

    if( this.const.genesis != 0 )
      fill( COLOR_MAX );

    switch ( this.const.phase ) {
      case 0:
        rect( offset.x - this.const.a / 2, offset.y - this.const.a / 2,
              this.const.a, this.const.a )
        break;
      case 1:
        ellipse( offset.x, offset.y, this.const.a, this.const.a );
        break;
      case 2:
        triangle( this.array.vertex[0].x + offset.x, this.array.vertex[0].y + offset.y,
                  this.array.vertex[1].x + offset.x, this.array.vertex[1].y + offset.y,
                  this.array.vertex[2].x + offset.x, this.array.vertex[2].y + offset.y );

        break;
    }

    if( this.const.genesis != 0 ){
      let n = this.array.genesis_dot[this.const.phase].length;
      let i = this.const.genesis - 1;
      let ii = ( i + n / 2 ) % n;

      line( this.array.genesis_dot[this.const.phase][i].x + offset.x, this.array.genesis_dot[this.const.phase][i].y + offset.y,
            this.array.genesis_dot[this.const.phase][ii].x + offset.x, this.array.genesis_dot[this.const.phase][ii].y + offset.y );
    }
  }
}
