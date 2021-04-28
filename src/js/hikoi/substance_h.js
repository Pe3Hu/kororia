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
    };
    this.array = {
    };
    this.data = {
      domain: domain
    }

    this.init();
  }

  init(){
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
    fill( COLOR_MAX );

    switch ( this.const.phase ) {
      case 0:
        /*rect( offset.x - this.const.a / 2 - STROKE_WEIGHT / 2, offset.x - this.const.a / 2 - STROKE_WEIGHT / 2,
              this.const.a, this.const.a )*/

            //  text( 333, offset.x, offset.y + FONT_SIZE / 3 );
        break;
      case 1:
        ellipse( offset.x, offset.y, this.const.a, this.const.a )
        break;
    }
  }
}
