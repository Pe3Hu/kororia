//
class isle {
  constructor( size ){
    this.const = {
      n: ( size + 1 ) * 2 + 1,
      m: ( size + 1 ) * 2 + 1,
      size: size + 1,
      a: CELL_SIZE * 0.5,
      center: null
    };
    this.var = {
      current: {
        domain: null
      }
    };
    this.array = {
      domain: []
    };
    this.data = {
    };

    this.init();
  }

  init_neighbors(){
    this.array.neighbor = [
      [
        createVector( 1, -1 ),
        createVector( 1, 0 ),
        createVector( 1, 1 ),
        createVector( 0, -1 ),
        createVector( 0, 1 ),
        createVector( -1, 0 )
      ],
      [
        createVector( 0, -1 ),
        createVector( 1, 0 ),
        createVector( 0, 1 ),
        createVector( -1, 1 ),
        createVector( -1, 0 ),
        createVector( -1, -1 )
      ]
    ];
  }

  init_domains(){
    //
    for( let i = 0; i < this.const.n; i++ ){
      this.array.domain.push( [] );

      for( let j = 0; j < this.const.m; j++ ){
        let index = i * this.const.m + j;
        let vec = createVector( this.const.r * 2 * j, this.const.a * 1.5 * i );
        if( i % 2 == 1 )
          vec.x += this.const.r;

        this.array.domain[i].push( new domain( index, vec, this.const.a ) );
      }
    }

    this.domains_around_capital();
    console.log( this.array.domain )
  }

  init(){
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );

    this.init_neighbors();
    this.init_domains();
  }

  domains_around_capital(){
    let arounds = [];
    let half = this.const.size;
    this.const.center = this.array.domain[half][half].const.center.copy();
    this.array.domain[half][half].flag.core = true;
    arounds.push( this.array.domain[half][half].const.index );

    for( let i = 0; i < half; i++ )
      for( let j = arounds.length - 1; j >= 0; j-- ){
        let grid = this.convert_index( arounds[j] );
        let parity = ( grid.y + 1 ) % 2;

        for( let neighbor of this.array.neighbor[parity] ){
          grid = this.convert_index( arounds[j] );
          grid.add( neighbor );
          let around = this.convert_grid( grid );

          if( !arounds.includes( around ) && this.check_border( grid ) ){
            if( i == 0 )
              this.array.domain[grid.y][grid.x].flag.eye_of_the_storm = true;

            arounds.push( around );
          }
        }
      }

      for( let i = 0; i < arounds.length; i++ ){
        let grid = this.convert_index( arounds[i] );

        this.array.domain[grid.y][grid.x].flag.visiable = true;
      }
  }

  //find the grid coordinates by index
  convert_index( index ){
    if( index == undefined )
      return null;

    let i = Math.floor( index / this.const.m );
    let j = index % this.const.m;
    return createVector( j, i );
  }

  //find the index coordinates by grid coordinates
  convert_grid( vec ){
    if( vec == undefined )
      return null;

    return vec.y * this.const.m + vec.x;
  }

  check_border( grid ){
    let flag = ( grid.x >= this.const.m ) || ( grid.x < 0 ) || ( grid.y >= this.const.n ) || ( grid.y < 0 );

    return !flag;
  }

  click(){
  }

  key(){
    switch ( keyCode ) {
      case 32:
        break;
    }
  }

  draw( offset ){
    for( let domains of this.array.domain )
      for( let domain of domains )
        domain.draw( offset );
  }
}
