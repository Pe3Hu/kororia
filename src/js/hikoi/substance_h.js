//
class substance_h {
  constructor ( index, a, domain, phase, genesis, concentration ){
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
      vertex: []
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

  init(){
    this.init_vertexs();

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
    fill( COLOR_MAX * 1 / 3  );
    if( this.const.genesis != 0 )
      fill( COLOR_MAX / 4 * this.const.genesis, this.color.s, this.color.l );

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
  }
}
