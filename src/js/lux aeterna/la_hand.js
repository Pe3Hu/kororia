//
class la_hand {
  constructor( board ){
    this.const = {
      default_hand_size: 4
    };
    this.var = {
      current: {
        hand_size: this.const.default_hand_size
      }
    };
    this.array = {
      card: [],
      ui: [ -1, -1, -1, -1 ],
      anchor: []
    };
    this.data = {
      board: board,
    }

    this.init();
  }

  init(){
    let board = this.data.board;
    let anchor_index = 6;
    let anchor_count = 8;

    for( let i = anchor_index; i < anchor_index + anchor_count; i++ )
      this.array.anchor.push( board.array.anchor[i] );
  }

  take_cards(){
    let board = this.data.board;
    let deck = board.array.deck;

    if( deck.length < this.var.current.hand_size ){
      console.log( 'game end' );
      return;
    }
    this.array.card = [];

    for( let i = this.var.current.hand_size - 1; i >= 0; i-- ){
      let card_index = deck.pop();
      if( board.array.card[card_index].data.type == 'Glitch card' ){

      }

      this.array.card.push( card_index );
    }

    //console.log(  this.array.card )
  }

  draw(){
    let cards = this.data.board.array.card;

    for( let i = 0; i < this.array.card.length; i++ )
      if( this.array.card[i] != -1 ){

        //console.log( this.array.anchor[i] )
        cards[this.array.card[i]].draw( this.array.anchor[i] )
      }

    for( let ui_card_index of this.array.ui )
      if( ui_card_index != -1 ){
        let card = cards[ui_card_index];
        let anchor_index;
        
        if( card.flag.event )
          anchor_index = 4;
        if( card.flag.action )
          anchor_index = 5;
        if( card.flag.cache )
          anchor_index = 6;
        if( card.flag.speed )
          anchor_index = 7;

        card.draw( this.array.anchor[anchor_index] );
      }
  }
}
