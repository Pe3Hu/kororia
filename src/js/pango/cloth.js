//
class cloth {
  constructor ( parent ){
    this.const = {
      m: parent.const.m,
      a: parent.const.a,
      scale: parent.const.scale
    };
    this.var = {
      current: {
        kink: 0,
        anchor: null
      }
    };
    this.array = {
      kink: []
    };
    this.data = {
      parent: parent
    }

    this.init();
  }

  init_kinks(){
    this.array.kink = [];
    let a = this.const.a * this.const.scale;

    for( let i = 0; i < this.const.m; i++ ){
      this.array.kink.push( [] );

      for( let j = 0; j < this.const.m; j++ ){
        let vec = createVector( a* j, a * i );

        this.array.kink[i].push( new kink( this.var.current.kink, vec, a ) );
        this.var.current.kink++;
      }
    }
  }

  init(){
    this.init_kinks();
  }

  get_anchor( grid ){
    return this.array.kink[grid.y][grid.x].const.center.copy();
  }

  border_crossing_check( hint ){
    let sign = ( hint.const.type + 1 ) % 2 * -2 +1;
    console.log( hint.const.anchor.index, hint.const.type, sign )

    let grid = hint.const.anchor.grid.copy();
    grid.x += 1;
    grid.y += hint.const.swing * sign;
    console.log( grid.y, grid.x )
    return this.check_border( grid );
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

  draw( offset ){
    let name = this.data.parent.constructor.name;
    let i_max = this.const.m;
    let j_max = this.const.m;

    if( name == 'hint' && !this.data.parent.const.anchor.flag ){
      i_max = this.data.parent.const.swing + 1;
      j_max = 2;
    }

    for( let i = 0; i < i_max; i++ )
      for( let j = 0; j < j_max; j++ )
        this.array.kink[i][j].draw( offset, this.data.parent.constructor.name );
  }
}
