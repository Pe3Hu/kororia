//
class zoom {
  constructor( community, neighbors ){
    this.const = {
      scale: 2,
      n: 6
    };
    this.var = {
    };
    this.data = {
      community: community
    };
    this.array = {
      neighbor: neighbors,
      vertex: [],
      corner: [],
      sector: [ [], [] ]
    };
    this.color = {
      bg: {
        h: 60,
        s: COLOR_MAX * 0.75,
        l: COLOR_MAX * 0.5
      }
    };

    this.init();
  }

  initVertexs(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( -0.5 - i + this.const.n / 2 ) ) * this.const.a * this.const.scale,
        Math.cos( Math.PI * 2 / this.const.n * ( -0.5 - i + this.const.n / 2 ) ) * this.const.a * this.const.scale );
      this.array.vertex.push( vec );

      vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( -1 - i + this.const.n / 2 ) ) * this.const.r * this.const.scale,
        Math.cos( Math.PI * 2 / this.const.n * ( -1 - i + this.const.n / 2 ) ) * this.const.r * this.const.scale );
      this.array.corner.push( vec );
    }
  }

  initSectors(){
    for( let i = 0; i < this.const.n; i++ ){
      let ii = ( i + 1 ) %  this.const.n;
      let vertexs = [];
      vertexs.push( createVector() );
      vertexs.push( this.array.vertex[i].copy() );
      vertexs.push( this.array.vertex[ii].copy() );
      this.array.sector[0].push( new sector( i, this.data.community.const.index, vertexs ) );
    }

    for( let j = 0; j < this.array.neighbor.length; j++ ){
        let i = this.array.neighbor[j].index;
        let ii = ( i + 1 ) % this.const.n;
        let mirror = ( i + this.const.n / 2 ) % this.const.n;
        let vertexs = [];
        vertexs.push( this.array.corner[i].copy() );
        vertexs.push( this.array.vertex[i].copy() );
        vertexs.push( this.array.vertex[ii].copy() );
        this.array.sector[1].push( new sector( mirror, this.array.neighbor[j].community.const.index, vertexs ) );
      }


    for( let i = 0; i < this.array.sector.length; i++ )
      for( let j = 0; j < this.array.sector[i].length; j++ )
        this.array.sector[i][j].var.zoomed = true;
  }

  init(){
    this.const.a =  this.data.community.const.a * this.const.scale / ( Math.tan( Math.PI / this.const.n ) * 2 );
    this.const.r =  this.const.a * this.const.scale / ( Math.tan( Math.PI / this.const.n ) * 2 );

    this.var.offset = createVector(
      this.const.a * this.const.scale + CELL_SIZE,
      this.const.a * this.const.scale + CELL_SIZE );

    this.initVertexs();
    this.initSectors();
  }

  draw( vector ){
    let offset = vector.copy();
    offset.y += this.var.offset.y + CELL_SIZE;
    noStroke();
    fill( this.color.bg.h, this.color.bg.s, this.color.bg.l );

    for( let i = 0; i < this.array.sector.length; i++ )
      for( let j = 0; j < this.array.sector[i].length; j++ ){
          this.array.sector[i][j].draw( offset );
      }
  }
}
