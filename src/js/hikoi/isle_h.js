//
class isle_h {
  constructor( grade, a, borderland ){
    this.const = {
      grade: grade,
      size: grade * ( grade + 1 ) + 1,
      a: a,
      m: null,
      center: null,
      layers: 2,
      estrangement: {
        base: 1,
        phase: 2,
        genesis: 3,
        descent: 2
      },
      descents: 6
    };
    this.var = {
      index: {
        domain: 0,
        pathway: 0,
        substance: 0,
      },
      current: {
        layer: 0,
        foothold: 0,
        pathway: 0
      }
    };
    this.array = {
      domain: [],
      foothold: [],
      pathway: [ [], [] ],
      phase: [ [], [], [] ],
      genesis: [ [], [], [],[], [] ],
      descent: [],
      city_state: [],
      substance: []
    };
    this.flag = {
    };
    this.data = {
      borderland: borderland
    };

    this.init();
  }

  init_neighbors(){
    this.array.neighbor = [
      [
        createVector( 1, -1 ),
        createVector( 1, 0 ),
        createVector( 1, 1 ),
        createVector( 0, 1 ),
        createVector( -1, 0 ),
        createVector( 0, -1 )
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
    this.array.domain = [];

    for( let i = 0; i < this.const.m; i++ ){
      this.array.domain.push( [] );

      for( let j = 0; j < this.const.m; j++ ){
        let vec = createVector( this.const.r * 2 * j, this.const.a * 1.5 * i );
        if( i % 2 == 1 )
          vec.x += this.const.r;

        this.array.domain[i].push( new domain_h( this.var.index.domain, vec, this.const.a ) );
        this.var.index.domain++;
      }
    }

    this.domains_around_capital();
    this.init_city_states();
    this.init_pathways();
  }

  domains_around_capital(){
    let half = this.const.size;
    let core = this.array.domain[half][half];
    let arounds = [ core.const.index ];
    core.set_status( 4 );
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
              this.array.domain[grid.y][grid.x].set_status( 4 );

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

    for( let i = 0; i < this.const.descents; i++ ){
      let grid = this.convert_index( core.const.index );

      for( let j = 0; j < half - 1; j++ ){
        let parity = ( grid.y + 1 ) % 2;
        let neighbor = this.array.neighbor[parity][i];
        grid.add( neighbor );
      }

      this.array.domain[grid.y][grid.x].set_status( 2 );
      this.array.descent.push( this.array.domain[grid.y][grid.x].const.index );
    }

    for( let i = 0; i < domains.length; i++ ){
      this.array.foothold.push( [] );

      if( i > ( domains.length - 1 ) / 2 ){
        let j = 0;
        let angle = 3;
        this.add_foothold( angle, i, domains[i - 1][j] );
      }

      for( let j = 0; j < domains[i].length; j++ ){
        let max_l = 2;

        if( j == domains[i].length - 1 )
          max_l = 3;

        for( let l = 0; l < max_l; l++ ){
          let angle = ( this.array.neighbor[0].length - 2 + l ) % this.array.neighbor[0].length;

          this.add_foothold( angle, i, domains[i][j] );
        }

        if( j == domains[i].length - 1 && i > ( domains.length - 1 ) / 2 ){
          let angle = 1;
          //&& i >= ( domains.length - 1 ) / 2
          let ii = i - 1;
          let jj = domains[ii].length - 1
          this.add_foothold( angle, i, domains[ii][jj] );
        }
      }

      if( i == domains.length - 1 ){
        this.array.foothold.push( [] );

        let j = 0;
        let angle = 3;
        this.add_foothold( angle, i, domains[i][j] );

        for( let j = 0; j < domains[i].length; j++ ){
          let max_l = 2;

          for( let l = max_l; l > 0; l-- ){
            let angle = l;

            this.add_foothold( angle, i, domains[i][j] );
          }
        }
      }
    }
  }

  init_city_states(){
    let half = this.const.size;
    let core = this.array.domain[half][half];
    let n = 6;
    let k = 2;

    for( let i = 0; i < n; i++ ){
      let grid = this.convert_index( core.const.index );

      for( let j = 0; j < k; j++ ){
        let ii = ( i + 1 ) % n;
        let parity = ( grid.y + 1 ) % 2;
        grid.add( this.array.neighbor[parity][i] );
        parity = ( grid.y + 1 ) % 2;
        grid.add( this.array.neighbor[parity][ii] );
      }

    this.array.domain[grid.y][grid.x].set_status( 3 );
    this.array.city_state.push( this.array.domain[grid.y][grid.x].const.index );
    }
  }

  set_footholds(){
    for( let footholds of this.array.foothold )
      for( let foothold of footholds ){
        let rows = [];

        if( foothold.const.row > 0 )
          rows.push( foothold.const.row - 1 );

        if( foothold.const.row < this.const.size * 2 + 1 )
          rows.push( foothold.const.row );

        let center = foothold.const.center;

        for( let row of rows )
          for( let domain of this.array.domain[row] ){
            let d = domain.const.center.dist( foothold.const.center )

            if( d < domain.const.a * 1.1 ){
              domain.array.foothold.push( foothold.const.index );

              if( domain.flag.visiable )
                foothold.array.domain.push( domain.const.index );
            }
          }
      }

    for( let index of this.array.descent ){
      let footholds = [];
      let grid = this.convert_index( index );
      let descent = this.array.domain[grid.y][grid.x];
      let flag = true;

      for( let index_pathway of descent.array.pathway )
        if( flag ){
          let index_neighbor = this.array.pathway[0][index_pathway].betray_neighbor( descent.const.index );
          let grid_neighbor = this.convert_index( index_neighbor );
          let domain_neighbor = this.array.domain[grid_neighbor.y][grid_neighbor.x];

          if( domain_neighbor.data.substance != null ){
            for( let foothold_neighbor of domain_neighbor.array.foothold )
              if( descent.array.foothold.includes( foothold_neighbor ) )
                footholds.push( foothold_neighbor );

            flag = false;
          }
      }
      let rand = Math.floor( Math.random() * footholds.length );
      let grid_rand = this.convert_index_foothold( footholds[rand] );
      let foothold = this.array.foothold[grid_rand.x][grid_rand.y];
      foothold.var.owner.descent = descent.const.index;
    }
    for( let index of this.array.city_state ){
      let footholds = [];
      let grid = this.convert_index( index );
      let city_state = this.array.domain[grid.y][grid.x];
      let flag = true;

      for( let index_pathway of city_state.array.pathway )
        if( flag ){
          let index_neighbor = this.array.pathway[0][index_pathway].betray_neighbor( city_state.const.index );
          let grid_neighbor = this.convert_index( index_neighbor );
          let domain_neighbor = this.array.domain[grid_neighbor.y][grid_neighbor.x];

          if( domain_neighbor.data.substance != null ){
            for( let foothold_neighbor of domain_neighbor.array.foothold )
              if( city_state.array.foothold.includes( foothold_neighbor ) )
                footholds.push( foothold_neighbor );

            flag = false;
          }
      }

      if( flag == true )
        footholds = city_state.array.foothold;

      let rand = Math.floor( Math.random() * footholds.length );
      let grid_rand = this.convert_index_foothold( footholds[rand] );
      let foothold = this.array.foothold[grid_rand.x][grid_rand.y];
      foothold.var.owner.city_state = city_state.const.index;
    }
  }

  init_pathways(){
    this.array.pathway = [ [], [] ];

    for( let p = 0; p < 2; p++ ){
      let centers = [];
      let current_arrays = [];
      let d_max = null;
      let add_l = null;

      switch ( p ) {
        case 0:
          current_arrays = this.array.domain;
          d_max = this.const.r * 2 * 1.1;
          add_l = this.const.m + 1;
          break;
        case 1:
          current_arrays = this.array.foothold;
          d_max = this.const.a * 1.1;
          let mid = this.array.foothold.length / 2;
          add_l = this.array.foothold[mid].length + 1;
          break;
      }

      for( let current_array of current_arrays )
        for( let current of current_array )
          if( current.flag.visiable )
            centers.push( {
              index: current.const.index,
              center: current.const.center.copy()
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

  init_substances(){
    let primary_substances = [ 0, 0, 1, 1, 2, 2 ];

    for( let descent of this.array.descent ){
      let grid_descent = this.convert_index( descent );
      let parity = ( grid_descent.y + 1 ) % 2;
      let rand = Math.floor( Math.random() * this.array.neighbor[parity].length );

      grid_descent.add( this.array.neighbor[parity][rand] );
      rand = Math.floor( Math.random() * primary_substances.length );
      let phase = primary_substances[rand];
      let domain = this.array.domain[grid_descent.y][grid_descent.x];
      let genesis = 0;
      let concentration = 0;

      this.add_substance( domain, phase, genesis, concentration );
      primary_substances.splice( rand, 1 );

      grid_descent = this.convert_index( descent );
      let arounds = [ [ this.array.domain[grid_descent.y][grid_descent.x].const.index ] ];
      let substances = [];

      for( let i = 0; i < this.const.estrangement.descent; i++ ){
        arounds.push( [] );

        for( let j = arounds[i].length - 1; j >= 0; j-- ){
          let grid = this.convert_index( arounds[i][j] );
          parity = ( grid.y + 1 ) % 2;

          for( let neighbor of this.array.neighbor[parity] ){
            grid = this.convert_index( arounds[i][j] );
            grid.add( neighbor );

            if( this.check_border( grid ) ){
              let around = this.convert_grid( grid );
              let flag = false;

              for( let l = 0; l < arounds.length; l++ )
                flag = flag || arounds[l].includes( around );

              if( !flag && this.array.domain[grid.y][grid.x].flag.visiable )
                arounds[i + 1].push( around );
            }
          }
        }
      }

      let options = [];
      let phases = [];
      let max_phase = 3;
      let indexs = [];

      for( let around of arounds[this.const.estrangement.descent] )
        indexs.push( around );

      let grid_first = this.convert_index( domain.const.index );
      parity = ( grid_first.y + 1 ) % 2;

      for( let neighbor of this.array.neighbor[parity] ){
        let grid = grid_first.copy();
        grid.add( neighbor );
        let index_neighbor = this.convert_grid( grid );
        let index_option =  indexs.indexOf( index_neighbor );

        if( index_option != -1 )
          indexs.splice( index_option, 1 );
        }

      for( let i = 0; i < max_phase; i++ )
        if( i != phase ){
          phases.push( i );
          let array = [];

          for( let index of indexs )
            array.push( index );

          options.push( array )
        }

      for( let i = 0; i < phases.length; i++ ){
        //estrangement check
        for( let j = options[i].length - 1; j >= 0; j-- ){
          let grid = this.convert_index( options[i][j] );
          let domain = this.array.domain[grid.y][grid.x];

          if( !this.check_substance_inception( domain, phases[i], null ) )
            options[i].splice( j, 1 );
        }

        let rand = Math.floor( Math.random() * options[i].length );
        let grid_phase = this.convert_index( options[i][rand] );

        this.add_substance( this.array.domain[grid_phase.y][grid_phase.x], phases[i], genesis, concentration );
        options[i].splice( rand, 1 );

        parity = ( grid_phase.y + 1 ) % 2;

        for( let neighbor of this.array.neighbor[parity] ){
          let grid = grid_phase.copy();
          grid.add( neighbor );
          let index_neighbor = this.convert_grid( grid );
          let index_option =  options[i].indexOf( index_neighbor );

          if( index_option != -1 )
            options[i].splice( index_option, 1 );
          }
      }
    }

    this.init_inceptions();
    this.set_footholds();
  }

  init_inceptions(){
    let stopper = this.const.size * 2;
    let counter = 0;

    while( counter < stopper ){
      let genesiss = [ 1, 2, 3, 4 ];
      let phases = [ 0, 1, 2 ];
      let dist = Math.pow( this.const.size, 2 );
      this.shuffle( genesiss )

      for( let genesis of genesiss ){
        let options = [];

        for( let phase of phases ){
          let objs = [];

          for( let domains of this.array.domain )
            for( let domain of domains )
              if( this.check_substance_inception( domain, phase, genesis ) ){
                let grid_domain = this.convert_index( domain.const.index );
                let flag = true;

                for( let index_phase of this.array.phase[phase] )
                  if( flag ){
                    let grid_phase = this.convert_index( index_phase );
                    let d = this.path_between_domains( grid_domain, grid_phase, 1 ).length;
                    let estrangement = this.const.estrangement.phase;

                    if( this.array.domain[grid_phase.y][grid_phase.x].data.substance.const.genesis == genesis )
                      estrangement *= this.const.estrangement.genesis;
                    if( d <= estrangement )
                      flag = false;
                  }

                for( let index_genesis of this.array.genesis[genesis] )
                  if( flag ){
                    let grid_genesis = this.convert_index( index_genesis );
                    let d = this.path_between_domains( grid_domain, grid_genesis, 1 ).length;
                    let estrangement = this.const.estrangement.genesis;

                    if( this.array.domain[grid_genesis.y][grid_genesis.x].data.substance.const.phase == phase )
                      estrangement *= this.const.estrangement.phase;

                    if( d <= estrangement )
                      flag = false;
                  }

                if( flag ){
                  let path_length = Math.pow( this.const.size, 2 );

                  for( let descent of this.array.descent ){
                    let grid_descent = this.convert_index( descent );
                    let d = this.path_between_domains( grid_domain, grid_descent, 1 ).length;
                    if( path_length > d )
                      path_length = d;
                    }

                 objs.push( {
                   'index': domain.const.index,
                   'dist': path_length,
                   'phase': phase } );
                }
              }

          options.push( objs );
        }

        let sum = 0;

        for( let array of options ){
          sum += array.length;
          array = this.bubble_sort( array, 'dist' )
        }

        if( sum == 0 )
          return;

        let min_length = Math.pow( this.const.size, 2 );
        let nearests = [];

        for( let array of options )
          if( array.length > 0 )
            if( array[0]['dist'] < min_length )
              min_length = array[0]['dist'];

        for( let array of options )
          for( let option of array )
            if( option['dist'] == min_length )
              nearests.push( option );

        let rand = Math.floor( Math.random() * nearests.length );
        let grid = this.convert_index( nearests[rand]['index'] );
        let domain = this.array.domain[grid.y][grid.x];
        let concentration = 0;

        this.add_substance( domain, nearests[rand]['phase'], genesis, concentration );
      }

      counter++;
    }
  }

  init(){
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );
    this.const.m = ( this.const.size + 1 ) * 2 + 1;

    this.init_neighbors();
    this.init_domains();
    this.init_substances();
  }

  path_between_domains( begin, end, type ){
    let current_grid = begin.copy();
    let counter = 0;
    let stopper = this.const.m * 2;
    let current_d = current_grid.dist( end );
    let steps = [];

    while( current_d != 0 && counter < stopper ){
      let parity = ( current_grid.y + 1 ) % 2;
      let step = null;
      let min_d = Math.pow( this.const.m, 2 );

      for( let neighbor of this.array.neighbor[parity] ){
        let next_grid = current_grid.copy();
        next_grid.add( neighbor );

        if( this.check_border( next_grid ) ){
          let next_d = next_grid.dist( end );
          let flag = true;

          if( type == 0 )
            flag = !this.array.domain[next_grid.y][next_grid.x].flag.el_dorado;

          if( next_d < min_d && flag ){
            min_d = next_d;
            step = neighbor.copy();
          }
        }
      }

      current_grid.add( step );
      current_d = current_grid.dist( end );
      steps.push( step );
      counter++;
    }

    current_grid = begin.copy();

    for( let step of steps ){
      current_grid.add( step );
    }

  if( steps.length == stopper && type != 1 )
    console.log( 'steps error' );
    return steps;
  }

  add_foothold( angle, row, index ){
    let grid = this.convert_index( index );
    let domain = this.array.domain[grid.y][grid.x];
    let center = domain.const.center.copy();
    let shift = createVector(
      Math.sin( Math.PI * 2 / domain.const.n * ( -1 - angle + domain.const.n / 2 ) ) * domain.const.a,
      Math.cos( Math.PI * 2 / domain.const.n * ( -1 - angle + domain.const.n / 2 ) ) * domain.const.a );
    center.add( shift );

    this.array.foothold[this.array.foothold.length - 1].push( new foothold_h( this.var.current.foothold, center.copy(), row, this.const.a ) );
    this.var.current.foothold++;
  }

  add_substance( domain, phase, genesis, concentration ){
    this.array.substance.push( new substance_h( this.var.index.substance, this.const.a, domain, phase, genesis, concentration ) );
    this.array.phase[phase].push( domain.const.index );
    this.array.genesis[genesis].push( domain.const.index );
    this.var.index.substance++;
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
  convert_grid( grid ){
    if( grid == undefined )
      return null;

    return grid.y * this.const.m + grid.x;
  }

  convert_index_foothold( index ){
    if( index == undefined )
      return null;

    let i = index;
    let j = 0;
    let n = ( this.const.size + 1 ) * 2 + 1;
    let step = 2;
    let current_length = n;

    while( i >= current_length ){
      let sign = 1;

      if( this.const.size < j )
        sign =-1;

      i -= current_length;

      j++;
      //console.log( j, i, current_length, this.const.size, i, sign )
      if( this.const.size != j - 1 )
        current_length += sign * step;
    }

    return createVector( j, i );
  }

  convert_grid_foothold( grid ){
    if( grid == undefined )
      return null;

    let index = grid.y;
    let n = ( this.const.size + 1 ) * 2 + 1;
    let step = 2;
    let current_length = n;
    let j = 0;

    while( j < grid.x ){
      let sign = 1;

      if( this.const.size < j )
        sign =-1;

      index += current_length;

      j++;
      console.log( j, index, sign )
      if( this.const.size != j - 1 )
        current_length += sign * step;
    }

    return index;
  }

  check_border( grid ){
    let flag = ( grid.x >= this.const.m ) || ( grid.x < 0 ) || ( grid.y >= this.const.m ) || ( grid.y < 0 );

    return !flag;
  }

  check_substance_inception( domain, phase, genesis ){
    //
    let result = domain.data.substance != null;

    if( result || !domain.flag.visiable )
      return false;

    let estrangement = this.const.estrangement.base;

    if( phase != null )
      estrangement *= this.const.estrangement.phase;
    if( genesis != null )
      estrangement *= this.const.estrangement.genesis;

    let arounds = [ [ domain.const.index ]  ];

    for( let i = 0; i < estrangement; i++ ){
      arounds.push( [] );

      for( let j = arounds[i].length - 1; j >= 0; j-- ){
        let grid = this.convert_index( arounds[i][j] );
        let parity = ( grid.y + 1 ) % 2;

        for( let neighbor of this.array.neighbor[parity] ){
          grid = this.convert_index( arounds[i][j] );
          grid.add( neighbor );

          if( this.check_border( grid )  )
            if( this.array.domain[grid.y][grid.x].data.substance != null )
              if( !arounds[i + 1].includes( this.array.domain[grid.y][grid.x].const.index ) ){
                let substance = this.array.domain[grid.y][grid.x].data.substance;
                if(i <= this.const.estrangement.base )
                  result = true;

                if( result )
                  return false;
                else
                  arounds[i + 1].push( this.convert_grid( grid ) );
            }
        }
      }
    }

    return true;
  }

  shuffle( array ){
    for( let i = array.length - 1; i > 0; i-- ){
      let j = Math.floor(Math.random() * ( i + 1 ) );
      [ array[i], array[j] ] = [ array[j], array[i]] ;
    }
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
    if( this.var.current.layer == 1 )
      for( let pathway of this.array.pathway[0] )
        pathway.draw( offset );

    if( this.var.current.layer == 0 ){
      for( let footholds of this.array.foothold )
        for( let foothold of footholds )
          foothold.draw( offset );

      for( let pathway of this.array.pathway[1] )
        pathway.draw( offset );
    }

    if( this.var.current.layer == 0 ||
        this.var.current.layer == 1 ||
        this.var.current.layer == 3 )
      for( let domains of this.array.domain )
        for( let domain of domains )
          domain.draw( offset, this.var.current.layer );
  }
}
