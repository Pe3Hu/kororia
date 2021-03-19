//
class domain {
  constructor ( index, center, a ){
    this.const = {
      index: index,
      center: center.copy(),
      n: 6,
      a: a,
    };
    this.flag = {
      visiable: false,
      eye_of_the_storm: false,
      core: false
    };
    this.array = {
      vertex: [],
    };
    this.var = {
      fontSize: FONT_SIZE,
      scale: 1
    };
    this.color = {
      bg: {
        h: 45,
        s: COLOR_MAX * 0.75,
        l: COLOR_MAX * 0.5
      },
      eots: {
        h: 210,
        s: COLOR_MAX * 0.75,
        l: COLOR_MAX * 0.5
      },
      core: {
        h: 270,
        s: COLOR_MAX * 0.75,
        l: COLOR_MAX * 0.5
      }
    };

    this.init();
  }

  init_vertexs(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a * this.var.scale,
        Math.cos( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a * this.var.scale );

      this.array.vertex.push( vec );
    }
  }

  init(){
    this.const.r = this.const.a * this.var.scale / ( Math.tan( Math.PI / this.const.n ) * 2 );

    this.init_vertexs();
  }

  draw( offset ){
    if( this.flag.visiable ){
      let vec = offset.copy();
      vec.add( this.const.center );

      noStroke();
      fill( this.color.bg.h, this.color.bg.s, this.color.bg.l );

      if( this.flag.eye_of_the_storm )
        fill( this.color.eots.h, this.color.eots.s, this.color.eots.l );
      if( this.flag.core )
        fill( this.color.core.h, this.color.core.s, this.color.core.l );

      for( let i = 0; i < this.array.vertex.length; i++ ){
        let ii = ( i + 1 ) % this.array.vertex.length;

        triangle( vec.x, vec.y,
                  this.array.vertex[i].x + vec.x, this.array.vertex[i].y + vec.y,
                  this.array.vertex[ii].x + vec.x, this.array.vertex[ii].y + vec.y );
      }


      noStroke();
      fill( 0 );
      text( this.const.index, vec.x, vec.y + FONT_SIZE / 3 );
    }
  }
}
