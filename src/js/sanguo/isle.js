//
class isle {
  constructor( grade, a ){
    this.const = {
      grade: grade,
      size: grade * ( grade + 1 ) + 1,
      a: a,
      m: null,
      center: null
    };
    this.var = {
      current: {
        domain: 0,
        foothold: 0
      }
    };
    this.array = {
      domain: [],
      foothold: []
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
    for( let i = 0; i < this.const.m; i++ ){
      this.array.domain.push( [] );

      for( let j = 0; j < this.const.m; j++ ){
        let vec = createVector( this.const.r * 2 * j, this.const.a * 1.5 * i );
        if( i % 2 == 1 )
          vec.x += this.const.r;

        this.array.domain[i].push( new domain( this.var.current.domain, vec, this.const.a ) );
        this.var.current.domain++;
      }
    }

    this.domains_around_capital();
  }

  init(){
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );
    this.const.m = ( this.const.size + 1 ) * 2 + 1;

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
            if( i < this.const.grade )
              this.array.domain[grid.y][grid.x].flag.eye_of_the_storm = true;

            arounds.push( around );
          }
        }
      }

    let sorted = [];

    for( let i = 0; i < arounds.length; i++ ){
      let grid = this.convert_index( arounds[i] );

      this.array.domain[grid.y][grid.x].flag.visiable = true;
      sorted.push( {
        'domain': arounds[i]
      } );
    }

    sorted = this.bubble_sort( sorted, 'domain' );
    let domains = [];
    let cols = this.const.size + 1;
    let index = 0;
    let cols_add = 1;

    for( let i = 0; i < this.const.m - 2; i++ ){
      domains.push( [] );

      for( let j = 0; j < cols; j++ ){
        if( sorted.length > index )
          domains[i].push( sorted[index]['domain'] );
        index++;
      }

      if( i == this.const.size )
        cols_add = -1;

      cols += cols_add;
    }

    for( let i = 0; i < domains.length; i++ ){
      this.array.foothold.push( [] );

      for( let j = 0; j < domains[i].length; j++ ){
        let max_l = 2;

        if( j == domains[i].length - 1 )
          max_l = 3;

        for( let l = 0; l < max_l; l++ ){
          let angle = ( this.array.neighbor[0].length - 2 + l ) % this.array.neighbor[0].length;

          this.add_foothold( angle, domains[i][j] );
        }

        if( j == domains[i].length - 1 && i > ( domains.length - 1 ) / 2 ){
          let angle = 1;
          //&& i >= ( domains.length - 1 ) / 2
          let ii = i - 1;
          let jj = domains[ii].length - 1
          this.add_foothold( angle, domains[ii][jj] );
        }
      }

      if( i >= ( domains.length - 1 ) / 2 ){
        let j = 0;
        let angle = 3;
        this.add_foothold( angle, domains[i][j] );
      }

      if( i == domains.length - 1 )
        for( let j = 0; j < domains[i].length; j++ ){
          let max_l = 2;

          for( let l = max_l; l > 0; l-- ){
            let angle = l;

            this.add_foothold( angle, domains[i][j] );
          }
        }
    }
  }

  add_foothold( angle, index ){
    let grid = this.convert_index( index );
    let domain = this.array.domain[grid.y][grid.x];
    let center = domain.const.center.copy();
    let shift = createVector(
      Math.sin( Math.PI * 2 / domain.const.n * ( -1-angle + domain.const.n / 2 ) ) * domain.const.a,
      Math.cos( Math.PI * 2 / domain.const.n * ( -1-angle + domain.const.n / 2 ) ) * domain.const.a );
    center.add( shift );

    this.array.foothold[this.array.foothold.length - 1].push( new foothold( this.var.current.foothold, center.copy(), this.const.a ) );
    this.var.current.foothold++;
  }

  bubble_sort( arr, key ){
    for( let i = 0; i < arr.length - 1; i++ ){
      let flag = false;

      for( let j = 0; j < arr.length - 1 - i; j++ )
        if( arr[j][key] > arr[j + 1][key] ){
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          flag = true;
        }

      if ( !flag ) break;
    }

    return arr;
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
    let flag = ( grid.x >= this.const.m ) || ( grid.x < 0 ) || ( grid.y >= this.const.m ) || ( grid.y < 0 );

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

    for( let footholds of this.array.foothold )
      for( let foothold of footholds )
        foothold.draw( offset );
  }
}
