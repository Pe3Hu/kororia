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
      stencil_index: 0
    };
    this.flag = {
    };
    this.array = {
      stencil: [],
      size: []
    };
    this.data = {};

    this.init( obj );
  }

  init_stencil(){
    let y = 1211;
    let x = 845;
    this.array.size = [
       createVector( x, y ),
       createVector( y, x )
    ];

    this.array.stencil = [
      createVector( 1459, 508 ),
      createVector( 1459, 1793 ),
      createVector( 171, 394 ),
      createVector( 171, 1329 ),
      createVector( 171, 2264 ),
      createVector( 1063, 367 ),
      createVector( 1063, 1292 )
    ];
  }

  init( obj ){
    this.init_stencil();
    this.set_type( obj );
    this.set_ui( -1 );
    this.const.img_index = Math.floor( this.const.index / 5 );
  }

  set_type( obj ){
    //
    this.data.name = obj.name;

    switch ( obj.card_type ) {
      case 0:
        this.data.type = 'System card';
        this.data.system = obj.system;
        this.data.operational = obj.operational;
        this.data.collapse = obj.collapse;
        break;
      case 1:
        this.data.type = 'Glitch card';
        this.data.breakdown = obj.breakdown;
        break;
      case 2:
        this.data.type = 'Main card';
        this.data.system = obj.system;
        this.data.damage = obj.damage;
        this.data.speed = obj.speed;
        this.array.event = [];

        for( let event of obj.events )
          this.add_event( event );
        break;
      case 3:
        this.data.type = 'UI card';
        break;
    }
  }

  set_ui( index ){
    this.flag.event = false;
    this.flag.action = false;
    this.flag.cache = false;
    this.flag.speed = false;

    switch ( index ) {
      case -1:
        break;
      case 0:
        this.flag.event = true;
        break;
      case 1:
        this.flag.action = true;
        break;
      case 2:
        this.flag.cache = true;
        break;
      case 3:
        this.flag.speed = true;
        break;
    }
  }

  add_event( event_type, event_value ){
    let description;

    switch ( event_type ) {
      case -2:
        description = 'Damage. Reduce indicated System dice';
        break;
      case -1:
        description = 'Speed. Move toward the black hole';
        break;
      case 0:
        description = 'Un speed. Move away the black hole';
        break;
      case 1:
        description = 'Re-roll System dice';
        break;
      case 2:
        description = 'Swap two System dices';
        break;
      case 3:
        description = 'Search the deck and remove the first Glitch';
        break;
      case 4:
        description = 'Add to a System dice';
        break;
      case 5:
        description = 'Substract one System dice, then add another System dice';
        break;
      case 6:
        description = 'Flip a System dice to its opposite face (not 1 to 6)';
        break;
      case 7:
        description = 'Flip a System dice to its opposite face';
        break;
      case 8:
        description = 'Carry any one card into next turn: draw as normal';
        break;
      case 9:
        description = 'You do not move toward the black hole this turn';
        break;
      case 10:
        description = 'Add X to a dice, where X is the Event damage on your chosen Cache card';
        break;
      case 11:
        description = 'Take a card from the Cache: use its event then return to the Cache';
        break;
      case 12:
        description = 'Move X closer to the black hole, then add Y to a System dice';
        break;
    }

    this.array.event.push( {
      type: event_type,
      description: description,
      value: event_value
    } )
  }

  select_switcher(){
    this.flag.selected = !this.flag.selected;
  }

  draw_system(){
    rotate( Math.PI/2 );
  }

  draw_glitch(){

  }

  draw_main(){
    //
    if( this.const.img_index == 0  && ( this.var.stencil_index == 2 || this.var.stencil_index == 3 ) )
      this.var.stencil_index = ( 5 - this.var.stencil_index );
    if( this.const.img_index == 3 ||
        this.const.img_index == 5 ||
        this.const.img_index == 6 ||
        this.const.img_index == 8 )
      this.var.stencil_index = ( this.var.stencil_index + 1 ) % 5;

    if( this.flag.event )
      rotate( Math.PI/2 );
    if( this.flag.speed )
      rotate( -Math.PI/2 );
  }

  draw_UI(){
    if( this.const.img_index == 20 )
      this.var.stencil_index += 5;
    if( this.const.index == 97 )
      rotate( Math.PI/2 );
  }

  draw( offset ){
    this.var.stencil_index = this.const.index % 5;
    let d_offset;
    let d_size;
    let i_size;

    push();
    translate( offset.x, offset.y );

    switch ( this.data.type ) {
      case 'System card':
        this.draw_system();
        break;
      case 'Glitch card':
        this.draw_glitch();
        break;
      case 'Main card':
        this.draw_main();
        break;
      case 'UI card':
        this.draw_UI();
        break;
    }

    if( this.var.stencil_index > 1 ){
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

    let s_size = this.array.size[i_size].copy();
    let s_offset = this.array.stencil[this.var.stencil_index];

    if( this.const.index == 98 )
      d_size.mult( 2 );

    if( this.flag.selected ){
      let shift = 10;
      noFill();
      stroke( COLOR_MAX );
      rect( d_offset.x - shift, d_offset.y - shift, d_size.x + shift * 2, d_size.y + shift * 2 )
    }
    image( IMGS[0][this.const.img_index], d_offset.x, d_offset.y, d_size.x, d_size.y, s_offset.x, s_offset.y, s_size.x, s_size.y );
    pop();
  }
}
