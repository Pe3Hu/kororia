//
class la_board {
  constructor(){
    this.const = {
      workspace_offset: createVector( CELL_SIZE * 0.5, CELL_SIZE * 0.5 ),
      a: CELL_SIZE * 1,
      card_size: null,
      gap: 0.15,
      system_main_card_count: 10,
      system_count: 6,
      glitch_count: 7
    };
    this.var = {
      index: {
        card: 0,
        sub: 0,
        system: 0,
        black_hole_start: 0
      },
      selected: {
        parent_anchor: -1,
        child_anchor: -1,
        card: null
      },
      current: {
        black_hole: 0
      }
    };
    this.flag = {
      end_game: false
    }
    this.array = {
      anchor: [],
      card: [],
      black_hole_score: [],
      system: []
    };
    this.data = {
      hand: null
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

    this.add_anchor( createVector( 0, 0 ) );

    this.add_anchor( createVector( 0, -WORKSPACE.y * 0.5 + CELL_SIZE * 1.5 ) );
  }

  init_cards(){
    this.init_main_cards();
    this.init_system_cards();
    this.init_glitch_cards();
    this.init_ui_cards();

    let x = this.const.card_size.x * 0.5;
    let y = this.const.card_size.y * 0.5;
    this.const.d = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
  }

  init_main_cards(){
    //
    let damage = 1;
    let speed = 3;
    let event_type = 0;
    let event_value = 2;
    let name = 'Reroute the power condiuts';
    let events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events );

    damage = 1;
    speed = 2;
    event_type = 1;
    event_value = 1;
    name = null;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 1;
    event_type = 2;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 3;
    event_type = 3;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 4;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 6;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 3;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    event_type = 4;
    event_value = 1;
    events.push( {
      event_type: event_type,
      event_value: event_value
    } );
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 2;
    event_type = 5;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 5;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 0;
    speed = 0;
    event_type = 5;
    event_value = 3;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 0;
    speed = 0;
    event_type = 5;
    event_value = 3;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 3;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 1;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 1;
    event_type = 2;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 3;
    event_type = 3;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 4;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 6;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 3;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    event_type = 4;
    event_value = 1;
    events.push( {
      event_type: event_type,
      event_value: event_value
    } );
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 8;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 3;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 1;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    event_type = 1;
    event_value = 2;
    events.push( {
      event_type: event_type,
      event_value: event_value
    } );
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 1;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 1;
    event_type = 2;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 0;
    event_type = 3;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 4;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 6;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 3;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    event_type = 4;
    event_value = 1;
    events.push( {
      event_type: event_type,
      event_value: event_value
    } );
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 0;
    event_value = 3;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 3;
    event_type = 0;
    event_value = 4;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 3;
    event_type = 9;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 3;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 1;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 1;
    event_type = 2;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 3;
    event_type = 3;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 4;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 3;
    event_type = 7;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 2;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    event_type = 4;
    event_value = 1;
    events.push( {
      event_type: event_type,
      event_value: event_value
    } );
    this.add_main_card( name, damage, speed, events )

    damage = 0;
    speed = 0;
    event_type = 4;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    event_type = 4;
    event_value = -1;
    events.push( {
      event_type: event_type,
      event_value: event_value
    } );
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 7;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    event_type = 4;
    event_value = 1;
    events.push( {
      event_type: event_type,
      event_value: event_value
    } );
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 3;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 1;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 1;
    event_type = 2;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 2;
    event_type = 3;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 6;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 3;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    event_type = 4;
    event_value = 1;
    events.push( {
      event_type: event_type,
      event_value: event_value
    } );
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 4;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 0;
    speed = 1;
    event_type = 10;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 3;
    event_type = 11;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 3;
    event_type = 0;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 1;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 1;
    event_type = 2;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 3;
    event_type = 3;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 4;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 2;
    event_type = 6;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 2;
    speed = 3;
    event_type = 0;
    event_value = 3;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    event_type = 4;
    event_value = 1;
    events.push( {
      event_type: event_type,
      event_value: event_value
    } );
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 1;
    event_type = 12;
    event_value = 1;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 2;
    event_type = 12;
    event_value = 2;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )

    damage = 1;
    speed = 0;
    event_type = 12;
    event_value = 3;
    events = [ {
      event_type: event_type,
      event_value: event_value
    } ];
    this.add_main_card( name, damage, speed, events )
  }

  init_system_cards(){
    this.var.index.sub = 0;
    //
    let operational = 'Under operational Systems are worth +2 eacht the end of the game, instead +1';
    let collapse = 'collapsed System are worth -3 each at the end of the game';
    this.add_system_card( operational, collapse );
    operational = 'Opertaional Systems are worth +9 each at the  end of the game, instead of +7';
    collapse = 'When scoring at the end of the game, do not count points for System still under operational';
    this.add_system_card( operational, collapse );
    operational = 'Move your Starting Position Marker 1 space toward the black hole';
    collapse = 'Move your Starting Position Marker 2 spaces away from the black hole';
    this.add_system_card( operational, collapse );
    operational = 'Draw 5 cards each turn';
    collapse = 'The first card you draw each turn must be assigned to Speed';
    this.add_system_card( operational, collapse );
    operational = 'No effect';
    collapse = 'The card you assign to Speed has a value of 2 for the rest of the game';
    this.add_system_card( operational, collapse );
    operational = '(Once only) Put a collapsed System back into play with a dice of 1';
    collapse = '(Once only) Collapse the lowest value System (if more than one, you choose)';
    this.add_system_card( operational, collapse );
    operational = 'Event damage to any System on 4 or 5 is reduced to zero';
    collapse = 'Each turn: Ignore the System on the Event card; you must assign the damage to System with the lowest dice value (if tied, you choose)';
    this.add_system_card( operational, collapse );
    operational = 'All Event damage is reduced by 1 for the rest of the game';
    collapse = 'All Event damage is increased by 1 for the rest of the game';
    this.add_system_card( operational, collapse );
    operational = 'Whenever you re-roll a System dice and its a 6, that System becomes opertaional';
    collapse = 'Cannot use Flip for the rest of the game';
    this.add_system_card( operational, collapse );
    operational = 'No effect';
    collapse = 'Cannot use Flip for the rest of the game';
    this.add_system_card( operational, collapse );
    operational = 'Draw 5 cards each turn';
    collapse = 'You must assign the first card you draw each turn to the Event';
    this.add_system_card( operational, collapse );
    operational = 'Draw 5 cards each turn';
    collapse = 'Draw 3 cards each turn';
    this.add_system_card( operational, collapse );
    operational = '(Once only) Add 1 to each dice';
    collapse = '(Once only) Substract 1 from each dice';
    this.add_system_card( operational, collapse );
    operational = 'You may use the Cache card in your selection as a second event. If you do, move your starship 1 space toward to the black hole';
    collapse = 'You  must assign the first card you draw each turn to Event';
    this.add_system_card( operational, collapse );
    operational = 'No effect';
    collapse = 'Shuffle the ERR Glitch card into the Main deck';
    this.add_system_card( operational, collapse );
    operational = 'Flip the Main deck completely. The top, visible card counts as in your hand when allocating cards (draw as normal)';
    collapse = '(Once Only) Re-roll all dice on System cards; collapse any System that rolls a 1 otherwise set it to 2';
    this.add_system_card( operational, collapse );
    operational = 'You may have 2 face-up cards in your Cache instead of 1 for the rest of the game';
    collapse = 'Remove all cards in the Cache from the game. Then, flip console card to red side. You cannot save to Cache for rest of the game';
    this.add_system_card( operational, collapse );
    operational = 'Ignore all Glitch cards for the rest of the game (discard them when drawn)';
    collapse = 'You must remove Glitches from the Main deck for the rest of the game';
    this.add_system_card( operational, collapse );
    operational = 'Search the Main deack for the first 2 Glitches and remove them from the game';
    collapse = 'Shuffle the ERR Glitch card into the Main deck';
    this.add_system_card( operational, collapse );
    operational = 'No effect';
    collapse = 'Remove all cards in the Cache from the game. Then, flip the Console card to the red side. You cannot savae to Cache for the rest of the game';
    this.add_system_card( operational, collapse );
    operational = 'Decrease the stated number of spaces on all Speed cards by 1 for the rest of the game (minimum 0)';
    collapse = 'increase the stated number of spaces on all Speed cards by 1 for the rest of the game';
    this.add_system_card( operational, collapse );
    operational = 'The card you assign to Speed has a value of 1 for the rest of the game';
    collapse = 'The card you assign to Speed has a value of 3 for the rest of the game';
    this.add_system_card( operational, collapse );
    operational = '(Once only) Move 4 spaces away from the black hole';
    collapse = '(Once only) Move 3 space toward the black hole';
    this.add_system_card( operational, collapse );
    operational = '(Once only) Discard the top 4 cards ot the Main deck';
    collapse = '(Once only) Shuffle all cards in the Cache and those used this turn into the Main deck';
    this.add_system_card( operational, collapse );
    operational = 'No effect';
    collapse = 'increase all movement toward the black hole by 1 for the rest of the game';
    this.add_system_card( operational, collapse );
    operational = '(Once only) Remove the top 4 cards of the Main deck from the game';
    collapse = '(Once only) Shuffle the 8 set-aside cards into the main deck';
    this.add_system_card( operational, collapse );
    operational = '(Once only) Set any one dice to 5';
    collapse = 'Set any one dice not already on 1 to 1';
    this.add_system_card( operational, collapse );
    operational = 'whenever you flip a dice from 1 to 6, the System becomes opertaional';
    collapse = 'Cannot use any flips for the rest of the game';
    this.add_system_card( operational, collapse );
    operational = 'Put any one dice on 4 and another dice on 3';
    collapse = 'Put any one dice on 2 and another on 1';
    this.add_system_card( operational, collapse );
    operational = 'No effect';
    collapse = 'Cannot use exchange swap for the rest of the game';
    this.add_system_card( operational, collapse );
  }

  init_glitch_cards(){
    this.var.index.sub = 0;
    let name = 'Glitch ERR';
    let breakdown = 'If drawn, carry out 2 of these options immediately';
    this.add_glitch_card( name, breakdown );
    name = 'Coolant Leak';
    breakdown = 'Your Cache is destroyed. Flip console card to red side. You cannot save to Cache for rest of the game';
    this.add_glitch_card( name, breakdown );
    name = 'Blackout';
    breakdown = 'You cannot take an action this turn (carry out event, move and cache as usual )';
    this.add_glitch_card( name, breakdown );
    name = 'Time Dilation';
    breakdown = 'Shuffle the top 4 cards of discard pile into the main deack';
    this.add_glitch_card( name, breakdown );
    name = 'Gravity Surge';
    breakdown = 'Move your starship 4 spaces toward the black hole';
    this.add_glitch_card( name, breakdown );
    name = 'Reactor Breach';
    breakdown = 'Each of your lowest value Systems take 1 damage';
    this.add_glitch_card( name, breakdown );
    name = 'Power Surge';
    breakdown = 'each of your highest value Systems take 1 damage';
    this.add_glitch_card( name, breakdown );
  }

  init_ui_cards(){
    this.var.index.sub = 0;
    let name = '';
    this.add_ui_card( name );
    name = '';
    this.add_ui_card( name );
    name = '';
    this.add_ui_card( name );
    name = '';
    this.add_ui_card( name );
    name = '';
    this.add_ui_card( name );
  }

  init_black_hole(){
    this.data.black_hole_fail = 23;
    this.var.default_start = 5;
    let values = [ 0, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    let repeats = [ 3, 1, 1, 4, 1, 4, 3, 2, 1, 1, 1, 1 ];
    let score = 0;

    for( let i = 0; i < repeats.length; i++ )
      for( let j = 0; j < repeats[i]; j++ ){
        score += values[i];
        this.array.black_hole_score.push( score )
      }
    this.array.black_hole_score.push( '-' );
  }

  init_systems(){
    for( let i = 0; i < this.const.system_count; i++ )
      this.add_system( i )
  }

  set_main_deck(){
    this.array.deck = [];
    this.array.discard = [];
    let card_index = 0;
    let card_count = this.const.system_count * this.const.system_main_card_count;

    for( let i = card_index; i < card_index + card_count; i++ )
      this.array.deck.push( i );

    card_count = 4;
    this.shuffle( this.array.deck );
    for( let i = 0; i < card_count; i++ )
      this.array.discard.push( this.array.deck.pop() );

    let top = [];
    card_count = this.array.deck.length / 4;

    for( let i = 0; i < card_count; i++ )
      top.push( this.array.deck.pop() );

    card_index = 91;
    card_count = this.const.glitch_count - 1;
    let bot = [];

    for( let i = card_index; i < card_index + card_count; i++ )
      bot.push( i );

    this.shuffle( bot );
    let dafult_glitche_count = 4;
    card_count = bot.length - dafult_glitche_count;

    for( let i = 0; i < card_count; i++ )
      this.array.discard.push( this.array.deck.pop() );

    for( let i = this.array.deck.length - 1; i >= 0; i-- )
      bot.push( this.array.deck.pop() );

    this.shuffle( bot );

    for( let i = bot.length - 1; i >= 0; i-- )
      this.array.deck.push( bot.pop() );

    for( let i = top.length - 1; i >= 0; i-- )
      this.array.deck.push( top.pop() );
  }

  start_game(){
    this.data.hand = new la_hand( this );
    this.data.hand.take_cards();
  }

  init(){
    let x = 1;
    let y = 1211/845;
    this.const.a = Math.floor( ( WORKSPACE.y - 3 * CELL_SIZE ) / ( 3 + 4 * this.const.gap ) ) / y;
    this.const.card_size = createVector( this.const.a * x, this.const.a * y );

    this.init_anchors();
    this.init_cards();
    this.init_black_hole();
    this.init_systems();
    this.set_main_deck();
    this.start_game();
    //console.log( this.array.card )
  }

  add_anchor( shift ){
    let anchor = createVector( WORKSPACE.x * 0.5, WORKSPACE.y * 0.5 );
    anchor.add( shift );
    this.array.anchor.push( anchor );
  }

  add_main_card( name, damage, speed, events ){
    let obj = {
      card_type: 2,
      system: this.var.index.system,
      name: name,
      damage: damage,
      speed: speed,
      events: events
    };
    this.array.card.push(  new la_card( this.var.index.card, this.var.index.sub, this.const.a, this.const.card_size, obj ) );
    this.var.index.card++;
    this.var.index.sub++;
    if( this.var.index.sub == 10 ){
      this.var.index.sub = 0;
      this.var.index.system++;
    }
  }

  add_system_card( operational, collapse ){
    let system = this.var.index.system;
    let name;

    switch ( system ) {
      case 0:
        name = 'CAD FN-SH-' + ( this.var.index.sub + 1 );
        break;
      case 1:
        name = 'OXY FD-LN-' + ( this.var.index.sub + 1 );
        break;
      case 2:
        name = 'VHF MW-LW-' + ( this.var.index.sub + 1 );
        break;
      case 3:
        name = 'OXY FD-LN-' + ( this.var.index.sub + 1 );
        break;
      case 4:
        name = 'CAD FN-SH-' + ( this.var.index.sub + 1 );
        break;
      case 5:
        name = 'OXY FD-LN-' + ( this.var.index.sub + 1 );
        break;
    }

    let obj = {
      card_type: 0,
      system: system,
      name: name,
      operational: operational,
      collapse: collapse
    };
    this.array.card.push(  new la_card( this.var.index.card, this.var.index.sub, this.const.a, this.const.card_size, obj ) );
    this.var.index.card++;
    this.var.index.sub++;
    if( this.var.index.sub == 5 ){
      this.var.index.sub = 0;
      this.var.index.system++;
    }
  }

  add_glitch_card( name, breakdown ){
    let obj = {
      card_type: 1,
      name: name,
      operational: breakdown
    };
    this.array.card.push(  new la_card( this.var.index.card, this.var.index.sub, this.const.a, this.const.card_size, obj ) );
    this.var.index.card++;
    this.var.index.sub++;
  }

  add_ui_card( name ){
    let obj = {
      card_type: 3,
      name: name
    };
    this.array.card.push(  new la_card( this.var.index.card, this.var.index.sub, this.const.a, this.const.card_size, obj ) );
    this.var.index.card++;
    this.var.index.sub++;
  }

  add_system( index ){
    let name;

    switch ( index ) {
      case 0:
        name = 'POW';
        break;
      case 1:
        name = 'COM';
        break;
      case 2:
        name = 'ENG';
        break;
      case 3:
        name = 'LIF';
        break;
      case 4:
        name = 'MEM';
        break;
      case 5:
        name = 'NAV';
        break;
    }

    let cards = [];
    let n = 5;
    let first_card = 60 + index * n;

    for( let i = first_card; i < n + first_card; i++ )
      cards.push( this.array.card[i] );

    let current_card = Math.floor( Math.random() * n );

    this.array.system.push( new la_system( index, name, cards, current_card ) );
  }

  turn_sequence(){
    this.resolve_event();
    this.apply_action();
    this.move_starship();
    this.save_cache();
    this.discard();
    this.end_game_check();
  }

  resolve_event(){
    let hand = this.data.hand;
    let card = this.array.card[hand.array.ui[0]];
    this.array.system[card.data.system].impact_on_dice( -card.data.damage );
  }

  apply_action(){

  }

  move_starship(){
    let hand = this.data.hand;
    let card = this.array.card[hand.array.ui[3]];
    this.var.current.black_hole += card.data.speed;

    if( this.var.current.black_hole > this.array.black_hole_score.length )
      this.var.current.black_hole = this.array.black_hole_score.length - 1;
  }

  save_cache(){

  }

  discard(){
    let hand = this.data.hand;
    hand.array.ui[0] = -1;
    hand.array.ui[1] = -1;
    hand.array.ui[3] = -1;
  }

  end_game_check(){
    let counter = {
      operational: 0,
      collapse: 0
    }
    for( let system of this.array.system ){
      system.repair_check();

      if( system.flag.operational )
        counter.operational++;
      if( system.flag.collapse )
          counter.collapse++;
    }

    if( counter.operational == 3 || counter.collapse == 3 )
      this.flag.end_game = true;

    if( this.var.current.black_hole == this.array.black_hole_score.length - 1 )
      this.flag.end_game = true;

    if( !this.flag.end_game )
      this.data.hand.take_cards();
  }

  shuffle( array ){
    for( let i = array.length - 1; i > 0; i-- ){
      let j = Math.floor( Math.random() * ( i + 1 ) );
      [ array[i], array[j] ] = [ array[j], array[i]];
    }
  }

  click(){
    let mouse = createVector( mouseX, mouseY );
    let anchor_index = 0;
    let anchor_count = 14;
    let click_flag = false;

    for( let i = anchor_index; i < anchor_index + anchor_count; i++ ){
      //if( this.array.system[i].flag.repair )
      let d = mouse.dist( this.array.anchor[i] );

      if( d < this.const.d )
        if( true ){
          //console.log( i )
          let x;
          let y;
          let flag = true;

          if( ( i < 6 && this.array.system[i].flag.repair ) || i == 10 || i == 13 ) //
            flag = false;

          if( flag ){
            x = this.const.card_size.x * 0.5;
            y = this.const.card_size.y * 0.5;
          }
          else{
            x = this.const.card_size.y * 0.5;
            y = this.const.card_size.x * 0.5;
          }
          let left_top = this.array.anchor[i].copy();
          left_top.sub( createVector( x, y ) );
          let right_bot = this.array.anchor[i].copy();
          right_bot.add( createVector( x, y ) );

          if( mouseX >= left_top.x &&
              mouseX <= right_bot.x &&
              mouseY >= left_top.y &&
              mouseY <= right_bot.y ){
            click_flag = true;

            if( this.var.selected.parent_anchor == -1 ){
              let hand = this.data.hand;

              if( i < this.const.system_count )
                this.var.selected.card = this.array.system[i].data.card;
              else
                if ( i < this.const.system_count + hand.var.current.hand_size && hand.array.card[i - this.const.system_count] != -1 )
                  this.var.selected.card = this.array.card[hand.array.card[i - this.const.system_count]];
                else
                  if ( i >= this.const.system_count + hand.var.current.hand_size && hand.array.ui[i - this.const.system_count - hand.var.current.hand_size] != -1 )
                    this.var.selected.card = this.array.card[hand.array.ui[i - this.const.system_count - hand.var.current.hand_size]];

              this.var.selected.parent_anchor = i;
              this.var.selected.card.select_switcher();
            }
            else
              if( this.var.selected.parent_anchor != i ){
                this.var.selected.child_anchor = i;
                if( this.var.selected.card.data.type == 'Main card' )
                  this.transfer_card();
                console.log( 'do smthg' )
                this.var.selected.parent_anchor = -1;
                this.var.selected.child_anchor = -1;
                this.var.selected.card.select_switcher();
                this.var.selected.card = null;
              }
              else
                click_flag = false;
          }
        }
    }

    if( click_flag == false  ){
      this.var.selected.parent_anchor = -1;

      if( this.var.selected.card != null ){
        this.var.selected.card.select_switcher();
        this.var.selected.card = null;
      }
    }
  }

  key(){
    switch ( keyCode  ) {
      case 32:
        this.turn_sequence();
        break;
    }
  }

  transfer_card(){
    let child_hand = false;
    let parent_hand = false;
    let hand_anchors = [ 6, 7, 8, 9 ];

    for( let anchor of hand_anchors ){
      if( this.var.selected.child_anchor == anchor )
        child_hand = true;
      if( this.var.selected.parent_anchor == anchor )
        parent_hand = true;
    }

    let hand = this.data.hand;
    let child_index = this.var.selected.child_anchor - this.const.system_count;
    let parent_index = this.var.selected.parent_anchor - this.const.system_count;
    let card_index;

    if( child_hand == false ){
      child_index -= hand.var.current.hand_size;

      if( parent_hand == false ){
        parent_index -= hand.var.current.hand_size;
        card_index = hand.array.ui[parent_index];
        hand.array.ui[child_index] = card_index;
        hand.array.ui[parent_index] = -1;
      }
      else{
        card_index = hand.array.card[parent_index];
        hand.array.ui[child_index] = card_index;
        hand.array.card[parent_index] = -1;
      }

      this.var.selected.card.set_ui( child_index );
    }
    else{
      parent_index -= hand.var.current.hand_size;
      card_index = hand.array.ui[parent_index];
      hand.array.card[child_index] = card_index;
      hand.array.ui[parent_index] = -1;
      this.var.selected.card.set_ui( -1 );
    }

  }

  draw_systems(){
    for( let i = 0; i < this.array.system.length; i++ ){
      this.array.system[i].data.card.draw( this.array.anchor[i] );

      noStroke();
      fill( COLOR_MAX );
      text( this.array.system[i].var.current.dice, this.array.anchor[i].x, this.array.anchor[i].y + FONT_SIZE / 3 );
    }
  }

  draw_UI(){
    let card_index = 97;
    let anchor_index = 14;
    this.array.card[card_index].draw( this.array.anchor[anchor_index] );
    /*
    card_index = 98;
    anchor_index = 13;
    this.array.card[card_index].draw( this.array.anchor[anchor_index] );
    */
    anchor_index = 15;
    let offset = this.array.anchor[anchor_index].copy();
    let a = CELL_SIZE * 2;
    offset.x -= this.array.black_hole_score.length / 2 * a;

    for( let i = 0; i < this.array.black_hole_score.length; i++ ){
      noFill()
      stroke( COLOR_MAX );
      rect( offset.x - a * 0.5, offset.y - a * 0.5, a, a );

      if( this.var.index.black_hole_start == i )
        rect( offset.x - a * 0.375, offset.y - a * 0.375, a * 0.75, a * 0.75 );
      if( this.var.current.black_hole == i )
        ellipse( offset.x, offset.y, a * 0.5, a * 0.5 );

      noStroke();
      fill( COLOR_MAX );
      text( this.array.black_hole_score[i], offset.x, offset.y + FONT_SIZE / 3 );

      offset.x += a;
    }
  }

  draw_hand(){

  }

  draw(){
    fill( 0 )
    rect( CELL_SIZE * 0.5, CELL_SIZE * 0.5, WORKSPACE.x, WORKSPACE.y );

    if( !this.flag.end_game ){
      this.draw_systems();
      this.draw_UI();
      this.data.hand.draw();
    }

    /*fill( COLOR_MAX );
    for( let anchor of this.array.anchor )
      ellipse( anchor.x, anchor.y, 10, 10 )*/
  }
}
