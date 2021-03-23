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
      association: [],
      primary_alignment: []
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

  init_landed_estates(){
    for( let domains of this.array.domain )
      for( let domain of domains )
        if( domain.flag.eye_of_the_storm ){
          this.add_landed_estates( domain );
          let landed_estates = this.array.landed_estates[this.array.landed_estates.length - 1];
          this.increase_landed_estates( landed_estates, true );

        }

    for( let landed_estates of this.array.landed_estates )
      if( landed_estates.const.index > 1 )
        this.increase_landed_estates( landed_estates, true );

    this.primary_distribute();
  }

  init_associations(){
    //
    let cluster = 1;
    this.array.association = [];

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
  }

  init(){
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );
    this.const.m = ( this.const.size + 1 ) * 2 + 1;

    this.init_neighbors();
    this.init_domains();
    this.init_pathways();
    this.init_landed_estates();;
      console.log( this.array.association );
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

  increase_landed_estates( landed_estates, flag_add ){
    let neighbors = [];

    for( let domain of landed_estates.array.domain )
      for( let pathway_index of domain.array.pathway ){
        let neighbor_index = this.array.pathway[0][pathway_index].betray_neighbor( domain.const.index );
        let neighbor_grid = this.convert_index( neighbor_index );
        let neighbor_domain = this.array.domain[neighbor_grid.y][neighbor_grid.x];
        let alredy_index = neighbors.indexOf( neighbor_index )

        if( neighbor_domain.var.landed_estates == 0 &&
            neighbor_domain.var.status == 1 &&
            alredy_index == -1 )
          neighbors.push( neighbor_index );
      }
    if( flag_add )
      if( neighbors.length > 0 ){
        let rand = Math.floor( Math.random() * neighbors.length );
        let neighbor_index = neighbors[rand];
        let neighbor_grid = this.convert_index( neighbor_index );
        let neighbor_domain = this.array.domain[neighbor_grid.y][neighbor_grid.x];
        this.array.landed_estates[landed_estates.const.index].appropriate_domain( neighbor_domain );
      }
      else
        console.log( 'increase_landed_estates error' )
    else
      return neighbors;
  }

  primary_distribute(){
    for( let i = 0; i < this.array.landed_estates.length - 2; i++ )
      this.landed_estates_coverage();


    this.init_associations();
    this.distances_between_associations();
  }

  landed_estates_coverage(){
    this.array.primary_alignment = [];

    for( let landed_estates of this.array.landed_estates ){
      let flag = landed_estates.array.domain.length > 3;

      this.array.primary_alignment.push( flag );
    }

    let options = [];

    for( let landed_estates of this.array.landed_estates )
      if( landed_estates.array.domain.length < 4 )
        options.push( this.increase_landed_estates( landed_estates, false ) );
      else{
        options.push( [] );
        this.array.primary_alignment[landed_estates.const.index] = true;
      }

    let min = {
      i: null,
      length: Math.pow( this.const.m, 2 )
    };

    for( let i = 0; i < options.length; i++ )
      if( options[i].length < min.length && options[i].length > 0 )
        min = {
          i: i,
          length: options[i].length
        };

    if( min.i != null ){
      this.init_associations();
      let mins = [];

      for( let option_index of options[min.i] ){
        let option_grid = this.convert_index( option_index );
        let option_domain = this.array.domain[option_grid.y][option_grid.x];

        for( let association of this.array.association )
          if( association.includes( option_domain ) )
            mins.push( {
              'domain': option_domain,
              'length': association.length
            } );
      }
      mins = this.bubble_sort( mins, 'length' );

      this.array.landed_estates[min.i].appropriate_domain( mins[0]['domain'] );
    }
  }

  distances_between_associations(){
    let distances = [];
    let l = this.array.association.length;

    if( this.array.association.length > 1 )
      for( let i = 0; i < l - 1; i++ )
        for( let j = i + 1; j < l; j++ ){
          let associations = [ i, j ];

          if( this.array.association[i].length > this.array.association[j] )
            associations = [ j, i ];

          let obj = this.measure_distances_between( associations );
          distances.push( obj );
          //console.log( 'result',obj.begin.const.index, obj.end.const.index, obj.steps.length )
        }

    console.log( distances )
    let links = [];

    for( let i = 0; i < l; i++ ){
      let link = [];

      for( let j = 0; j < distances.length; j++ )
        if( distances[j].begin_association == i || distances[j].end_association == i )
          link.push( {
            'distance_index': j,
            'steps_length': distances[j].steps.length
          } );

        link = this.bubble_sort( link, 'steps_length' );

        if( link.length > 2 )
          link.splice( 2, link.length - 1 );

        links.push( link )
    }
    console.log( links )
    let distance_indexs = [];

    for( let link of links )
      for( let distance of link ){
        let index = distance_indexs.indexOf( distance.distance_index );

        if( index == -1 )
          distance_indexs.push( distance.distance_index );
      }

    let chain = [];

    for( let distance_index of distance_indexs )
      chain.push( distances[distance_index] );

    console.log( chain )
    let min_charge = {
      steps_length: Math.pow( this.const.m, 2 ),
      chain_link: null
    };

    for( let chain_link of chain ){
      let charge = false;

      if( chain_link.begin_charge != 0 &&  chain_link.end_charge != 0 ){
        if( chain_link.begin_charge == 2 &&
            chain_link.end_charge == 2 )
          charge = true;

        /*if( Math.sign( chain_link.begin_charge ) == Math.sign( chain_link.end_charge ) * -1 &&
            Math.min( chain_link.begin_charge, chain_link.end_charge ) == - 1 )*/

        if( ( Math.abs( chain_link.begin_charge ) == 1 || Math.abs( chain_link.end_charge ) == 1 ) &&
            chain_link.begin_charge != chain_link.end_charge )
          charge = true;
      }


      if( charge && chain_link.steps.length < min_charge.steps_length )
          min_charge = {
            step: chain_link.steps.length,
            chain_link: chain_link
          }
    }

    console.log( 'association for immigration', min_charge.chain_link )
    if( min_charge.chain_link == null )
      console.log(chain )
  }

  measure_distances_between( associations ){
    let begins = this.array.association[associations[0]];
    let ends = this.array.association[associations[1]];
    let result = {
      steps: null,
      begin: null,
      end: null
    };

    for( let begin of begins ){
      let begin_grid = this.convert_index( begin.const.index );

      for( let end of ends ){
        let end_grid = this.convert_index( end.const.index );
        let steps = this.distance_between_domains( begin_grid, end_grid );
        let flag = false;
        //console.log( begin_grid.x, begin_grid.y, end_grid.x, end_grid.y, steps )

        if( result.steps != null )
          if( result.steps.length > steps.length )
            flag = true;

        if( result.steps == null )
          flag = true;

        if( flag )
          result = {
            steps: steps,
            begin: begin,
            end: end
          }
      }
    }

    let norm = 4;
    let b_length = begins.length % norm;
    if( b_length > norm / 2 )
      b_length -= norm;
    let e_length = ends.length % norm;
    if( e_length > norm / 2 )
      e_length -= norm;
    result.begin_charge = b_length;
    result.end_charge = e_length;

    result.begin_association = associations[0];
    result.end_association = associations[1];

    return result;
  }

  distance_between_domains( begin, end ){
    let current_grid = begin.copy();
    let counter = 0;
    let stopper = 50;
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
          let eots = this.array.domain[next_grid.y][next_grid.x].flag.eye_of_the_storm;

          if( next_d < min_d && !eots ){
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

  if( steps.length == 50 )
    console.log( this.array.domain[begin.y][begin.x].const.index,
     this.array.domain[current_grid.y][current_grid.x].const.index,
     this.array.domain[end.y][end.x].const.index, steps )
    return steps;
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
