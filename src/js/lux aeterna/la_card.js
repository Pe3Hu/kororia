//
class la_card {
  constructor( index, sub_index, a, size, obj ){
    this.const = {
      index: index,
      sub_index: sub_index,
      a: a,
      size: createVector( size.x, size.y ),
      img_index: null
    };
    this.var = {
    };
    this.array = {
      stencil: [],
      size: []
    };

    this.init( obj );
  }

  init_stencil(){
    let y = 1214;
    let x = 848;
    this.array.size = [
       createVector( x, y ),
       createVector( y, x )
    ];

    this.array.stencil = [
      createVector( 1457, 506 ),
      createVector( 1457, 1791 ),
      createVector( 169, 392 ),
      createVector( 169, 1327 ),
      createVector( 169, 2262 )
    ];
  }

  init( obj ){
    this.init_stencil();
    this.set_type( obj );
    this.const.img_index = Math.floor( this.const.index / 5 );
  }

  set_type( obj ){

    switch ( obj.type ) {
      case 0:
        this.data.type = 'System card';
        break;
      case 1:
        this.data.type = 'Glitch card';
        break;
      case 2:
        this.data.sub_index = obj.sub_index;
        this.data.type = 'Main card';
        this.data.damage = obj.damage;
        this.data.speed = obj.speed;
        this.data.name = obj.name;

        for( let action of obj.actions )
          this.add_action( action );
        break;
    }
  }

  add_action( action_type, action_value ){
    switch ( action_type ) {
      case 0:
        description = 'Damage. Reduce indicated System dice';
        break;
      case 1:
        description = 'Speed. Move toward the black hole';
        break;
      case 2:
        description = 'Un speed. Move away the black hole';
        break;
      case 3:
        description = 'Re-roll System dice';
        break;
      case 4:
        description = 'Swap two System dices';
        break;
      case 5:
        description = 'Search the deck and remove the first Glitch';
        break;
      case 6:
        description = 'Add to a System dice';
        break;
      case 7:
        description = 'Substract one System dice, then add another System dice';
        break;
      case 8:
        description = 'Flip a System dice to its opposite face (not 1 to 6)';
        break;
    }

    this.array.action( {
      type: action_type,
      description: description,
      value: action_value
    } )
  }

  draw( offset ){
    let i_stencil = this.const.index % 5;
    if( this.const.img_index == 0  && ( i_stencil == 2 || i_stencil == 3 ) )
      i_stencil = ( 5 - i_stencil );
    if( this.const.img_index == 4 ||
        this.const.img_index == 6 ||
        this.const.img_index == 7 ||
        this.const.img_index == 9 )
      i_stencil = ( i_stencil + 1 ) % 5;
    let d_offset;
    let d_size;
    let i_size;
    push();
    translate( offset.x, offset.y );
    if( i_stencil > 1 ){
      d_offset = createVector( -this.const.size.y * 0.5, -this.const.size.x * 0.5 );
      d_size = createVector( this.const.size.y, this.const.size.x );
      i_size = 1;
      rotate( -Math.PI/2 );
    }
    else{
      d_offset = createVector( -this.const.size.x * 0.5, -this.const.size.y * 0.5 );
      d_size = createVector( this.const.size.x, this.const.size.y );
      i_size = 0;
    }
    let s_size = this.array.size[i_size];
    let s_offset = this.array.stencil[i_stencil];
    //rect( offset.x - this.const.size.x / 2, offset.y - this.const.size.y / 2, this.const.size.x, this.const.size.y )
    image( IMGS[this.const.img_index], d_offset.x, d_offset.y, d_size.x, d_size.y, s_offset.x, s_offset.y, s_size.x, s_size.y );

    pop();
  }
}
