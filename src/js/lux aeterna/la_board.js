//
class la_board {
  constructor(){
    this.const = {
      workspace_offset: createVector( CELL_SIZE * 0.5, CELL_SIZE * 0.5 ),
      a: CELL_SIZE *12,
      card_size: null,
      gap: 0.1
    };
    this.var = {
      index: {
        card: 0,
        sub: 0
      }
    };
    this.array = {
      anchor: [],
      card: []
    };

    this.init();
  }

  init_anchors(){
    let d = Math.max( this.const.card_size.x, this.const.card_size.x );
    let y = 0;
    let gap = this.const.gap * this.const.card_size.y ;

    y = 0;
    let anchor = createVector( -1.5 * this.const.card_size.y - 2 * gap - this.const.card_size.x * 0.5 , y );
    this.add_anchor( anchor.copy() );
    y = -this.const.card_size.y - gap;

    anchor = createVector( -2.5 * this.const.card_size.y - 3 * gap - this.const.card_size.x * 0.5 , y );
    for( let i = -2; i <= 2; i++ ){
      if( i != 0 ){
        anchor.x += this.const.card_size.y + gap;
        this.add_anchor( anchor.copy() );
      }
      else
        anchor.x += this.const.card_size.x + gap;
    }

    y = 0;
    anchor = createVector( 1.5 * this.const.card_size.y + 2 * gap + this.const.card_size.x * 0.5 , y );
    this.add_anchor( anchor.copy() );

    y = this.const.card_size.y + gap;

    anchor = createVector( -2 * ( this.const.card_size.x + gap ) , y );
    for( let x = -2; x < 3; x++ ){
      if( x != 0 )
        this.add_anchor( anchor.copy() );

      anchor.x += this.const.card_size.x + gap;
    }

    for( let x = -1; x < 2; x++ )
      for( let y = -1; y < 2; y++ )
        if( ( x == 0 || y == 0 ) && ( x + y != 0 ) )
          this.add_anchor( createVector( ( ( this.const.card_size.x + this.const.card_size.y ) * 0.5 + gap ) * x, ( this.const.card_size.y * 0.5 + gap ) * y ) );
  }

  init_cards(){
    let card_type = 0;
    let system = 0;
    let damage = 1;
    let speed = 3;
    let action_type = 2;
    let action_value = 2;
    let name = 'Reroute the power condiuts';
    let obj = {
      card_type: card_type,
      system: system,
      name: name,
      sub_index: this.var.sub_index,
      damage: damage,
      speed: speed,
      action_type: action_type,
      action_value: action_value
     };

    let n = 60;

    for( let i = 0; i < n; i++ )
      this.add_card( obj );

    let repair;
    let failure;
    let breakdown;
  }

  init(){
    let x = 1;
    let y = 1214/848;
    this.const.a = Math.floor( WORKSPACE.y / ( 3 + 4 * this.const.gap ) ) / y;
    this.const.card_size = createVector( this.const.a * x, this.const.a * y );

    this.init_anchors();
    this.init_cards();
  }

  add_anchor( shift ){
    let anchor = createVector( WORKSPACE.x * 0.5, WORKSPACE.y * 0.5 );
    anchor.add( shift );
    this.array.anchor.push( anchor );
  }

  add_card( obj ){
    this.array.card.push(  new la_card( this.var.index.card, this.var.index.sub, this.const.a, this.const.card_size, obj ) );
    this.var.index.card++;
    this.var.index.sub++;
  }

  draw(){
    fill( 0 )
    rect( CELL_SIZE * 0.5, CELL_SIZE * 0.5, WORKSPACE.x, WORKSPACE.y )
    let card_begin = 0;
    let card_count = 14;
    let anchor_begin = 0;

    for( let i = 0; i < card_count; i++ )
      this.array.card[card_begin + i].draw( this.array.anchor[anchor_begin + i] );

    fill( COLOR_MAX )
    for( let anchor of this.array.anchor )
      ellipse( anchor.x, anchor.y, 10, 10 )
  }
}
