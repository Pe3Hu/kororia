//
class la_board_game {
  constructor(){
    this.const = {
      a: CELL_SIZE
    };
    this.data = {
      la_board: null,
    }

    this.init();
  }

  init(){
    FONT_SIZE *= 1.5;
    textSize( FONT_SIZE );
    this.data.la_board = new la_board( this );
  }

  click( offsets ){
    this.data.la_board.click();

  }

  key(){
    this.data.la_board.key();
  }

  moved( offsets ){
  }

  update(){
  }

  draw( offsets ){
    this.update();

    this.data.la_board.draw();
  }
}
