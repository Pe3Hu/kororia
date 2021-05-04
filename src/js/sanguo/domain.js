//
class domain {
  constructor( index, center, a ){
    this.const = {
      index: index,
      center: center.copy(),
      n: 6,
      a: a,
      remoteness: null
    };
    this.flag = {
      visiable: false,
      eye_of_the_storm: false,
      core: false,
      capital: false
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
      cluster: 0,
      capital: null
    };
    this.color = {
      neutral: COLOR_MAX * 0.75,
      s: COLOR_MAX * 0.75,
      l: COLOR_MAX * 0.5,
      h: {
        eots: 30,
        core: 0,
        le: 30,
        fraction: [ 200, 120, 280 ]
      }
    };
    this.data = {
      demesne: new demesne( this )
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

  set_status( status, remoteness ){
    this.var.status = status;
    if( remoteness != null )
      this.const.remoteness = remoteness;

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

  set_landed_estates( landed_estates, type ){
    if( this.var.landed_estates == 0 || type == 1 || type == 2 || this.var.cluster != 0 ){
      this.var.cluster = 0;
      this.var.landed_estates = landed_estates;
    }
    else{
      console.log( this.var.landed_estates, this.var.cluster, type, landed_estates )
      console.log( 'landed_estates error' )
    }

  }

  set_le_hue( landed_estates_length ){
    this.color.h.le = COLOR_MAX  * ( this.var.landed_estates - 1 ) / ( landed_estates_length - 1 );
  }

  set_as_capital( fraction ){
    this.flag.capital = true;
    this.var.fraction = fraction;
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
      fill( this.color.neutral );

      if( layer == 1 )
        fill( this.color.h.le, this.color.s, this.color.l );

      if( layer == 3 ){
        if( this.flag.eye_of_the_storm  )
          fill( this.color.h.eots, this.color.s, this.color.l );
        if( this.flag.core )
          fill( this.color.h.core, this.color.s, this.color.l );
        if( this.var.fraction != null )
          fill( this.color.h.fraction[this.var.fraction], this.color.s, this.color.l );
      }

      if( this.flag.capital == true )
        ellipse( vec.x, vec.y, this.const.a * this.var.scale * 3, this.const.a * this.var.scale * 3 );

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

      /*if( this.var.landed_estates == 0 || layer == 1 )
        txt += '_' + this.var.cluster;*/

      text( txt, vec.x, vec.y + FONT_SIZE / 3 );
    }
  }
}
