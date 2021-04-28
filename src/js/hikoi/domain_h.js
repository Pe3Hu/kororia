//
class domain_h {
  constructor ( index, center, a ){
    this.const = {
      index: index,
      center: center.copy(),
      n: 6,
      a: a
    };
    this.flag = {
      visiable: false,
      el_dorado: false
    };
    this.array = {
      vertex: [],
      pathway: []
    };
    this.var = {
      font_size: FONT_SIZE,
      scale: 0.5,
      status: -1
    };
    this.color = {
      neutral: COLOR_MAX * 0.75,
      s: COLOR_MAX * 0.75,
      l: COLOR_MAX * 0.5,
      h: {
        el_dorado: 60,
        descent: 210
      }
    };
    this.data = {
      demesne: new demesne_h( this ),
      substance: null
    }

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
    this.set_status( 0 );
  }

  set_status( status ){
    this.var.status = status;

    switch ( status ) {
      case 0:
        this.flag.visiable = false;
        this.flag.el_dorado = false;
        break;
      case 1:
        this.flag.visiable = true;
        break;
      case 2:
        this.flag.visiable = true;
        this.flag.descent = true;
        break;
      case 3:
        this.flag.visiable = true;
        this.flag.el_dorado = true;
        break;
    }
  }

  add_pathway( pathway ){
    let flag = pathway.array.domain.includes( this.const.index );

    if( flag )
      this.array.pathway.push( pathway.const.index );
  }

  set_substance( substance ){
    this.data.substance = substance;
  }

  check_free(){
  }

  draw( offset, layer ){
    if( this.flag.visiable ){
      let vec = offset.copy();
      vec.add( this.const.center );

      strokeWeight( STROKE_WEIGHT );
      stroke( this.color.neutral );
      fill( this.color.neutral );

      if( layer == 0 ){
        if( this.flag.descent ){
          stroke( this.color.h.descent, this.color.s, this.color.l );
          fill( this.color.h.descent, this.color.s, this.color.l );
        }
        if( this.flag.el_dorado ){
          stroke( this.color.h.el_dorado, this.color.s, this.color.l );
          fill( this.color.h.el_dorado, this.color.s, this.color.l );
        }
      }

      for( let i = 0; i < this.array.vertex.length; i++ ){
        let ii = ( i + 1 ) % this.array.vertex.length;

        triangle( vec.x, vec.y,
                  this.array.vertex[i].x + vec.x, this.array.vertex[i].y + vec.y,
                  this.array.vertex[ii].x + vec.x, this.array.vertex[ii].y + vec.y );
      }


      if( layer != 1 ){
        noStroke();
        fill( 0 );
        let txt = this.const.index;
        text( txt, vec.x, vec.y + FONT_SIZE / 3 );
      }
      else
        if( this.data.substance != null ){
          this.data.substance.draw( vec );
          fill( 0 );
          text( this.data.substance.const.phase, vec.x, vec.y + FONT_SIZE / 3 );
        }
    }
  }
}
