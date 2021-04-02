//
class kink {
  constructor ( index, center, a ){
    this.const = {
      index: index,
      center: center,
      a: a
    };

    this.init();
  }

  init(){
  }

  draw( offset ){
    let vec = offset.copy();
    vec.add( this.const.center );

    fill( COLOR_MAX * 0.66 );
    ellipse( vec.x, vec.y, this.const.a / 2, this.const.a / 2 );


    fill( 0 );
    let txt = this.const.index;
    text( txt, vec.x, vec.y + FONT_SIZE / 3 );
  }
}
