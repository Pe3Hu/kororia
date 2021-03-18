//
class community {
  constructor ( index, center, a, noise ){
    this.const = {
      index: index,
      n: 6,
      a: a,
      noise: noise
    };
    this.array = {
      vertex: [],
      sector: [],
      parent: [],
      child: [],
      noise: []
    };
    this.var = {
      center: center.copy(),
      fontSize: FONT_SIZE,
      remoteness: null,
      visiable: false,
      scale: 1,
      noise: null
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

  setNoise( noise ){
    this.var.noise = noise;
  }

  updateNoise( noise, index ){
    this.array.noise[index] = noise;

    //console.log( noise, index, this.array.noise )
  }

  addNoise( obj ){
    if( obj.noises.length == this.array.noise.length )
      for( let i = 0; i < obj.noises.length; i++ )
        this.array.noise[i].push( {
          noise: obj.noises[i],
          parent: obj.parent } );
  }

  equalizeNoise(){
    if( this.array.noise[0].length > 1 )
      console.log( this.const.index, this.array.noise[0] );

    for( let i = 0; i < this.array.noise.length; i++ ){
      let sum = 0;
      console.log(  this.array.noise[i] );

      for( let j = 0; j < this.array.noise[i][j].length; j++ )
        sum += this.array.noise[i][j].noise;

      this.array.noise[i] = sum / this.array.noise[i].length;
    }
  }

  setRelations( remoteness, parent ){
    this.var.remoteness = remoteness;
    parent.addChild( this.const.index );
    this.addParent( parent.const.index );
  }

  addParent( parent ){
    let index = this.array.parent.indexOf( parent );

    if( index == - 1 )
      this.array.parent.push( parent );
  }

  addChild( child ){
    let index = this.array.child.indexOf( child );

    if( index == - 1 )
      this.array.child.push( child );
  }

  initVertexs(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( -0.5 - i + this.const.n / 2 ) ) * this.const.a * this.var.scale,
        Math.cos( Math.PI * 2 / this.const.n * ( -0.5 - i + this.const.n / 2 ) ) * this.const.a * this.var.scale );
      this.array.vertex.push( vec );
    }
  }

  initSectors(){
    for( let i = 0; i < this.const.n; i++ ){
      let ii = ( i + 1 ) %  this.const.n;
      let vertexs = [];
      vertexs.push( createVector() );
      vertexs.push( this.array.vertex[i].copy() );
      vertexs.push( this.array.vertex[ii].copy() );
      this.array.sector.push( new sector( i, this.const.index, vertexs ) );
    }
  }

  initNoises(){
    for( let i = 0; i < this.const.noise; i++ )
      this.array.noise.push( [] );
  }

  init(){
    this.const.r = this.const.a * this.var.scale / ( Math.tan( Math.PI / this.const.n ) * 2 );

    this.initVertexs();
    this.initSectors();
    this.initNoises();
  }

  draw( vector, noise ){
    if( this.var.visiable ){
      let offset = vector.copy();
      offset.add( this.var.center );
      noStroke();
      fill( this.color.bg.h, this.color.bg.s, this.color.bg.l );
      let n = this.array.noise[noise];

      for( let i = 0; i < this.array.sector.length; i++ )
        this.array.sector[i].draw( offset, n );

       textSize( this.var.fontSize );
       //stroke( 0 );
       fill( 0 );
       this.var.txt = this.const.index;
       text( this.var.txt, offset.x, offset.y + FONT_SIZE / 3 );
       textSize( FONT_SIZE );
    }
  }
}
