//
class demesne_h {
  constructor( foothold, scale ){
    this.const = {
      a: foothold.const.a * foothold.var.scale * scale,
      n: foothold.const.n
    };
    this.var = {
      scale: 0.8
    };
    this.flag = {
      visiable: false,
      donor: false
    };
    this.array = {
      vertex: [],
      facility: []
    };
    this.data = {
      foothold: foothold
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
    this.init_vertexs();
  }

  erect( obj ){
    this.flag.visiable = true;
    this.array.facility.push( new facility_h( obj ) );
  }

  import_donor( scale ){
    let donor = new demesne_h( this.data.foothold, scale );
    donor.flag.visiable = true;
    donor.flag.donor = true;
    donor.array.facility = this.array.facility;
    return donor;
  }

  draw( offset ){
    let vec = offset.copy();
    /*vec.add( this.var.offset );
    vec.add( this.data.foothold.const.center );*/
    stroke( COLOR_MAX )
    fill( COLOR_MAX );

    for( let facility of this.array.facility ){
      let i = facility.const.sector;
      let ii = ( i + 1 ) % this.array.vertex.length;

      triangle( vec.x, vec.y,
                this.array.vertex[i].x + vec.x, this.array.vertex[i].y + vec.y,
                this.array.vertex[ii].x + vec.x, this.array.vertex[ii].y + vec.y );
    }
  }
}
