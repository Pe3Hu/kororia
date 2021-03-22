//
class isle {
  constructor( grade, a ){
    this.const = {
      grade: grade,
      size: grade * ( grade + 1 ) + 1,
      a: a,
      m: null,
      center: null,
      layers: 4
    };
    this.var = {
      current: {
        domain: 0,
        foothold: 0,
        pathway: 0,
        landed_estates: 0,
        layer: 3
      }
    };
    this.array = {
      domain: [],
      foothold: [],
      pathway: [],
      landed_estates: [],
      association: []
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

  init_pathways(){
    this.array.pathway = [ [], [] ];

    for( let p = 0; p < 2; p++ ){
      let centers = [];
      let arrs = [];
      let d_max = null;
      let add_l = null;

      switch ( p ) {
        case 0:
          arrs = this.array.domain;
          d_max = this.const.r * 2 * 1.1;
          add_l = this.const.m + 1;
          break;
        case 1:
          arrs = this.array.foothold;
          d_max = this.const.a * 1.1;
          let mid = this.array.foothold.length / 2;
          add_l = this.array.foothold[mid].length + 1;
          break;
      }

      for( let arr of arrs )
        for( let ar of arr )
          if( ar.flag.visiable )
            centers.push( {
              index: ar.const.index,
              center: ar.const.center.copy()
            } );


      for( let i = 0; i < centers.length; i++ ){
        let center = centers[i].center;
        let l = i + add_l;

        if( l > centers.length )
          l = centers.length;

        for( let j = i + 1; j < l; j++ ){
          let d = centers[i].center.dist( centers[j].center );

          if( d < d_max ){
            let ends = [ centers[i].index, centers[j].index ];
            let vectors = [ centers[i].center, centers[j].center ];

            this.array.pathway[p].push( new pathway( this.var.current.pathway, ends, vectors ) );
            this.var.current.pathway++;
          }
        }
      }
    }

    for( let domains of this.array.domain )
      for( let domain of domains )
        if( domain.flag.visiable )
          for( let pathway of this.array.pathway[0] )
            domain.add_pathway( pathway );
  }

  init_landed_estates(){
    for( let domains of this.array.domain )
      for( let domain of domains )
        if( domain.flag.eye_of_the_storm ){
          this.add_landed_estates( domain );
          let landed_estates = this.array.landed_estates[this.array.landed_estates.length - 1];
          this.increase_landed_estates( landed_estates );

        }

    for( let landed_estates of this.array.landed_estates )
      if( landed_estates.const.index > 1 )
        this.increase_landed_estates( landed_estates );
  }

  init_associations(){
    //
    let cluster = 1;
    this.array.association = [ [] ];

    for( let domains of this.array.domain )
      for( let domain of domains )
      if( domain.var.landed_estates == 0 &&
          domain.var.cluster != 0 &&
          domain.var.status == 1 )
        domain.var.cluster = 0;

    for( let domains of this.array.domain )
      for( let domain of domains )
        if( domain.var.landed_estates == 0 &&
            domain.var.cluster == 0 &&
            domain.var.status == 1 ){
          let association = [ domain ];
          let flag = true;
          let counter = 0;
          let stopper = Math.pow( this.const.m, 2 );

          while( flag && counter < stopper ){
            flag = false;

            for( let i = association.length - 1; i > -1; i-- ){
              let member = association[i];

              for( let pathway_index of member.array.pathway ){
                let neighbor_index = this.array.pathway[0][pathway_index].betray_neighbor( member.const.index );
                let neighbor_grid = this.convert_index( neighbor_index );
                let neighbor_domain = this.array.domain[neighbor_grid.y][neighbor_grid.x];

                let alredy_index = association.indexOf( neighbor_domain );

                if( neighbor_domain.var.landed_estates == 0 &&
                    domain.var.cluster == 0 &&
                    neighbor_domain.var.status == 1 &&
                    alredy_index == -1 ){
                      flag = true;
                      association.push( neighbor_domain );
                    }
              }
            }

            counter++;
          }

          this.array.association.push( association );

          for( let member of association )
            member.var.cluster = cluster;

          cluster++;
        }

    this.distribute_smaller_associations();
  }

  init(){
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );
    this.const.m = ( this.const.size + 1 ) * 2 + 1;

    this.init_neighbors();
    this.init_domains();
    this.init_pathways();
    this.init_landed_estates();
    this.init_associations();
  }

  domains_around_capital(){
    this.add_landed_estates( null );
    let half = this.const.size;
    let core = this.array.domain[half][half];
    core.set_status( 2 );
    this.add_landed_estates( core );
    let arounds = [];
    arounds.push( core.const.index );
    this.const.center = core.const.center.copy();

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
              this.array.domain[grid.y][grid.x].set_status( 3 );

            arounds.push( around );
          }
        }
      }

    let sorted = [];

    for( let i = 0; i < arounds.length; i++ ){
      let grid = this.convert_index( arounds[i] );

      if( this.array.domain[grid.y][grid.x].var.status == 0 )
        this.array.domain[grid.y][grid.x].set_status( 1 );

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

      if( i > ( domains.length - 1 ) / 2 ){
        let j = 0;
        let angle = 3;
        this.add_foothold( angle, domains[i - 1][j] );
      }

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

      if( i == domains.length - 1 ){
        this.array.foothold.push( [] );

        let j = 0;
        let angle = 3;
        this.add_foothold( angle, domains[i][j] );

        for( let j = 0; j < domains[i].length; j++ ){
          let max_l = 2;

          for( let l = max_l; l > 0; l-- ){
            let angle = l;

            this.add_foothold( angle, domains[i][j] );
          }
        }
      }
    }
  }

  increase_landed_estates( landed_estates ){
    let neighbors = [];

    for( let domain of landed_estates.array.domain )
      for( let pathway_index of domain.array.pathway ){
        let neighbor_index = this.array.pathway[0][pathway_index].betray_neighbor( domain.const.index );
        let neighbor_grid = this.convert_index( neighbor_index );
        let neighbor_domain = this.array.domain[neighbor_grid.y][neighbor_grid.x];

        if( neighbor_domain.var.landed_estates == 0 && neighbor_domain.var.status == 1 )
          neighbors.push( neighbor_index );
      }

    if( neighbors.length > 0 ){
      let rand = Math.floor( Math.random() * neighbors.length );
      let neighbor_index = neighbors[rand];
      let neighbor_grid = this.convert_index( neighbor_index );
      let neighbor_domain = this.array.domain[neighbor_grid.y][neighbor_grid.x];
      this.array.landed_estates[landed_estates.const.index].appropriate_domain( neighbor_domain );
    }
    else
      console.log( 'increase_landed_estates error' )
  }

  distribute_smaller_associations(){
    console.log( this.array.association )
    let norm = 4;
    /*let surplus = [];
    let depauperates = [];

    for( let association of this.array.association ){
        let remainder = association.length % norm;
        surplus.push( remainder );

        if( association.length < norm )
          depauperates.push( association )
      }

    let sum = 0;

    for( let plus of surplus )
      sum += plus;
    console.log( sum, depauperates )

    let min = {
      association: null,
      length: Math.pow( this.const.m, 2)
    };*/

    let bad_arrays = [];

    for( let association of this.array.association )
      if( association.length < norm && association.length > 0 ){
        let landed_estatess = [];

        for( let domain of association ){
          let l_es = [];

          for( let pathway_index of domain.array.pathway ){
            let neighbor_index = this.array.pathway[0][pathway_index].betray_neighbor( domain.const.index );
            let neighbor_grid = this.convert_index( neighbor_index );
            let neighbor_domain = this.array.domain[neighbor_grid.y][neighbor_grid.x];
            let le_index = l_es.indexOf( neighbor_domain.var.landed_estates )

            if( neighbor_domain.var.landed_estates != 0 && le_index == -1 )
              l_es.push( neighbor_domain.var.landed_estates );
          }

          landed_estatess.push( l_es );
        }

        bad_arrays.push( landed_estatess )
    }
    else
      bad_arrays.push( [] );
    console.log( bad_arrays )

    let reset_associations = false;

    for( let i = 0; i < bad_arrays.length; i++ ){
      let singles = [];

      for( let j = 0; j < bad_arrays[i].length; j++ )
        if( bad_arrays[i][j].length == 1 )
          singles.push( {
            i: i,
            j: j,
            landed_estates: bad_arrays[i][j][0] } );

      if( singles.length > 0 )
        for( let single of singles ){
          this.array.landed_estates[single.landed_estates].appropriate_domain( this.array.association[single.i][single.j] )
          console.log( single.landed_estates );
          reset_associations = true;
        }
    }

    if( reset_associations )
      this.init_associations();
    else{
      let clusters = [];

      for( let i = 0; i < this.array.landed_estates.length; i++ )
        clusters.push( {
          'cluster': i,
          'count': 0
        } );

      for( let i = 0; i < bad_arrays.length; i++ )
        for( let j = 0; j < bad_arrays[i].length; j++ )
          for( let cluster of bad_arrays[i][j] )
            clusters[cluster].count++;

      this.bubble_sort( clusters, 'count' )
      console.log( clusters )
      let range = 0;
      while( clusters[range].count == 0 && range < clusters.length - 1 )
        range++;
      clusters.splice( 0, range );

      if( clusters[0].count == 0 )
        clusters.splice( 0, 1 );

      console.log( clusters );

      /*for( let i = 0; i < bad_arrays.length; i++ )
        for( let j = 0; j < bad_arrays[i].length; j++ )
        console.log( bad_arrays[i][j] )*/
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

  add_landed_estates( domain ){
    this.array.landed_estates.push( new landed_estates( this.var.current.landed_estates, domain ) );
    this.var.current.landed_estates++;
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
        this.var.current.layer = ( this.var.current.layer + 1 ) % this.const.layers;
        console.log( this.var.current.layer )
        break;
    }
  }

  draw( offset ){
    if( this.var.current.layer == 0 ||
        this.var.current.layer == 1 ||
        this.var.current.layer == 3 )
      for( let domains of this.array.domain )
        for( let domain of domains )
          domain.draw( offset, this.var.current.layer );

    if( this.var.current.layer == 0 ||
        this.var.current.layer == 2 )
      for( let footholds of this.array.foothold )
        for( let foothold of footholds )
          foothold.draw( offset );


    if( this.var.current.layer == 1 )
      for( let pathway of this.array.pathway[0] )
        pathway.draw( offset );

    if( this.var.current.layer == 2 )
      for( let pathway of this.array.pathway[1] )
        pathway.draw( offset );
  }
}
