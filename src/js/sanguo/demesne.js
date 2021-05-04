//
class demesne {
  constructor( domain ){
    this.const = {
      a: domain.const.a,
      n: domain.const.n
    };
    this.var = {
      scale: 1
    };
    this.array = {
      vertex: []
    };
    this.data = {
      domain: domain
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

  erect(){

  }

  draw( offset ){
    let vec = offset.copy();
    vec.add( this.var.offset );
    vec.add( this.data.domain.const.center );
    fill( COLOR_MAX );

    for( let i = 0; i < this.array.vertex.length; i++ ){
      let ii = ( i + 1 ) % this.array.vertex.length;

      triangle( vec.x, vec.y,
                this.array.vertex[i].x + vec.x, this.array.vertex[i].y + vec.y,
                this.array.vertex[ii].x + vec.x, this.array.vertex[ii].y + vec.y );
    }
  }
}
