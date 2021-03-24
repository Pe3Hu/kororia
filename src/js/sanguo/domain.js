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
      pathway: []
    };
    this.var = {
      font_size: FONT_SIZE,
      scale: 0.5,
      status: -1,
      landed_estates: -1,
      cluster: 0
    };
    this.color = {
      bg: {
        h: 210,
        s: COLOR_MAX * 0.75,
        l: COLOR_MAX * 0.5
      },
      eots: {
        h: 270,
        s: COLOR_MAX * 0.75,
        l: COLOR_MAX * 0.5
      },
      core: {
        h: 0,
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
    this.set_status( 0 );
  }

  set_status( status ){
    this.var.status = status;

    switch ( status ) {
      case 0:
        this.flag.visiable = false;
        this.flag.eye_of_the_storm = false;
        this.flag.core = false;
        this.var.landed_estates = 0;
        break;
      case 1:
        this.flag.visiable = true;
        break;
      case 2:
        this.flag.visiable = true;
        this.flag.core = true;
        break;
      case 3:
        this.flag.visiable = true;
        this.flag.eye_of_the_storm = true;
        break;
    }
  }

  set_landed_estates( landed_estates, flag ){
    if( this.var.landed_estates == 0 || flag == true || this.var.cluster != 0 ){
      this.var.cluster = 0;
      this.var.landed_estates = landed_estates;
    }
    else{
      console.log( this.var.landed_estates, landed_estates )
      console.log( 'landed_estates error' )
    }
  }

  add_pathway( pathway ){
    let flag = pathway.array.domain.includes( this.const.index );
    //console.log( pathway.array.domain, this.const.index)

    if( flag )
      this.array.pathway.push( pathway.const.index );
  }

  check_free(){

  }

  draw( offset, layer, l ){
    if( this.flag.visiable ){
      let vec = offset.copy();
      vec.add( this.const.center );

      noStroke();
      fill( this.color.bg.h, this.color.bg.s, this.color.bg.l );
      let hue = this.var.landed_estates * COLOR_MAX / l;
      if( layer == 1 )
        fill( hue, this.color.bg.s, this.color.bg.l );

      if( this.flag.eye_of_the_storm && layer != 1 )
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
      let txt = this.const.index;
      if( layer == 1 && this.var.landed_estates != 0 )
        txt += '_' + this.var.landed_estates;

      if( layer == 3 ){
        txt = this.var.landed_estates;

        if( this.var.landed_estates == 0 || layer == 1 )
          txt += '_' + this.var.cluster;
      }

      text( txt, vec.x, vec.y + FONT_SIZE / 3 );
    }
  }
}
