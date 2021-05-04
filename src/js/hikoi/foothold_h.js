//
class foothold_h {
  constructor( index, center, row, a, scale ){
    this.const = {
      index: index,
      center: center.copy(),
      row: row,
      a: a * scale,
      n: 6
    };
    this.flag = {
      visiable: true,
      owned: false,
      donor: false
    };
    this.color = {
      s: COLOR_MAX * 0.75,
      l: COLOR_MAX * 0.5,
      h: {
        standart: 60,
        descent: 210,
        city_state: 120
      }
    };
    this.array = {
      vertex: [],
      domain: []
    };
    this.var = {
      scale: 0.5,
      owner: {
        descent: null,
        city_state: null
      }
    };
    this.data = {
      demesne: new demesne_h( this, 1 )
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

  import_donor( scale ){
    let donor = new foothold_h( this.const.index, createVector(), this.const.row, this.const.a, scale );
    donor.flag.donor = true;
    return donor;
  }

  draw( offset ){
    if( this.flag.visiable ){
      let vec = offset.copy();
      vec.add( this.const.center );

      strokeWeight( STROKE_WEIGHT );
      stroke( this.color.h.standart, this.color.s, this.color.l );
      fill( this.color.h.standart, this.color.s, this.color.l );

      if( this.var.owner.descent != null ){
        stroke( this.color.h.descent, this.color.s, this.color.l );
        fill( this.color.h.descent, this.color.s, this.color.l );
      }
      if( this.var.owner.city_state != null ){
        stroke( this.color.h.city_state, this.color.s, this.color.l );
        fill( this.color.h.city_state, this.color.s, this.color.l );
      }

      for( let i = 0; i < this.array.vertex.length; i++ ){
        let ii = ( i + 1 ) % this.array.vertex.length;

        triangle( vec.x, vec.y,
                  this.array.vertex[i].x + vec.x, this.array.vertex[i].y + vec.y,
                  this.array.vertex[ii].x + vec.x, this.array.vertex[ii].y + vec.y );
      }

      if( this.data.demesne.flag.visiable )
        this.data.demesne.draw( vec );

      /*noStroke();
      fill( 0 );
      text( this.const.index, vec.x, vec.y + FONT_SIZE / 3 );*/
    }
  }
}
