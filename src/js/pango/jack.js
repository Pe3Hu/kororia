//
class jack {
  constructor (  ){
    this.const = {
      n: 1,
      a: CELL_SIZE,
      player: 0
    };
    this.array = {
      duelist: []
    };
    this.flag = {
    };
    this.data = {
      ring: new ring( this ),
      succession_of_events: new succession_of_events( this )
    };

    this.init();
  }

  init_duelists(){
    for( let i = 0; i < this.const.n; i++ )
      this.array.duelist.push( new duelist( this ) );
  }

  init(){
    this.init_duelists();
  }

  click( offsets ){
    this.data.ring.click( offsets );
  }

  key(){
    this.data.ring.key();
  }

  moved( offsets ){
  }

  update(){
  }

  draw( offsets ){
    this.update();

    this.data.ring.draw( offsets[0].copy() );

    let player_duelist = this.array.duelist[this.const.player];
    player_duelist.draw( offsets[1].copy() );
  }
}
