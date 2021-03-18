//
class sector {
  constructor( index, community, vertexs ){
    this.const = {
      index: index,
      community: community,
      n: 6
    };
    this.var = {
      zoomed: false,
      predisposition: null
    };
    this.array = {
      vertex: vertexs
    };
    this.color = {
      bg: {
        h: 45,
        s: COLOR_MAX * 0.75,
        l: COLOR_MAX * 0.5
      }
    };

    this.init();
  }

  initHues(){
    this.array.hue = [
      52,
      122,
      192,
      262,
      297,
      332
    ];

    this.color.bg.h = this.array.hue[this.const.index % this.const.n];
  }

  init(){
    this.initHues();
  }

  draw( offset, noise ){
    noStroke();
    if( this.var.zoomed )
      fill( this.color.bg.h, this.color.bg.s, this.color.bg.l );
    else
      fill( noise * COLOR_MAX );

    triangle( this.array.vertex[0].x + offset.x, this.array.vertex[0].y + offset.y,
              this.array.vertex[1].x + offset.x, this.array.vertex[1].y + offset.y,
              this.array.vertex[2].x + offset.x, this.array.vertex[2].y + offset.y );
  }
}
