//playing field displayed on screen
class board {
  constructor (){
    this.const = {
      a: CELL_SIZE,
      menu: {
        buttons: 10,
        inscription: 0
      },
      grid: {
        x: null,
        y: null
      }
    };
    this.var = {
      layer: 0,
      id: {
        button: 0,
        border: 0,
        inscription: 0
      },
      menu: {
        button: 0
      }
    };
    this.array = {
      layer: [],
      button: [],
      border: [],
      inscription: [],
      offset: []
    };

    this.init();
  }

  init(){
    this.initGrid();
    this.initLayers();
    this.initOffsets();
    this.initButtons();
    this.initBorders();
    this.initInscriptions();
  }

  initGrid(){
    this.const.grid.x = Math.floor( CANVAS_SIZE.x / CELL_SIZE );
    this.const.grid.y = Math.floor( CANVAS_SIZE.y / CELL_SIZE );
  }

  initOffsets(){
    this.array.offset = [];

    for( let i = 0; i < this.array.layer.length; i++ )
      this.array.offset.push( [] );

    let layer = 0;
    let isle = this.array.layer[layer].data.isle;
    let offset = createVector( CELL_SIZE / 2, CELL_SIZE /2  );
    //createVector( CELL_SIZE * Math.floor( this.const.grid.x / 2 ), CELL_SIZE * 2.5 );
    //offset.sub( isle.const.center.copy() );
    this.array.offset[layer].push( offset.copy() );
  }

  initLayers(){
    this.array.layer.push( new borderland() );
  }

  initBorders(){
    //
    let layer = MENU_LAYER;
    let name = 'layerMenu';
    let offset = createVector( CELL_SIZE * ( CANVAS_GRID.x - 2.25 ), CELL_SIZE * 0.5 );
    let size = createVector( CELL_SIZE * 2, CELL_SIZE * ( this.var.menu.button + 1 ) );
    this.addBorder( layer, name, offset, size );

    this.updateBorders();
  }

  addBorder( layer, name, offset, size ){
    this.array.border.push( new border( this.var.id.border, layer, name, offset, size ));
    this.var.id.border++;
  }

  cleanBorders(){
    for( let i = 0; i < this.array.border.length; i++ )
      if( this.array.border[i].const.layer != MENU_LAYER )
        this.array.border[i].var.onScreen = false;
  }

  updateBorders(){
    let offsetID = null;
    this.cleanBorders();

    switch ( this.var.layer ) {
      case 0:
        break;
    }
  }

  initButtons(){
    //
    let layer, name, type, vec, offset;

    //set layer change buttons
    layer = MENU_LAYER;
    name = '';
    type = 0;
    vec = createVector( CELL_SIZE * ( CANVAS_GRID.x - 1.25 ), CELL_SIZE * ( 1.5 + type ) );
    this.addButton( layer, name, type, vec.copy() );

    for( let i = 0; i < this.array.button.length; i++ )
      if( this.array.button[i].const.layer == MENU_LAYER )
        this.array.button[i].var.onScreen = true;

    this.updateButtons();
  }

  addButton( layer, name, type, center ){
    this.array.button.push( new button( this.var.id.button, layer, name, type, center ));
    this.var.id.button++;
    if( layer == MENU_LAYER )
      this.var.menu.button++;
  }

  cleanButtons(){
    let begin = this.var.menu.buttons;

    for( let i = begin; i < this.array.button.length; i++ )
      this.array.button[i].var.onScreen = false;
  }

  updateButtons(){
    this.cleanButtons();

    let offsetID = this.var.menu.button;
    let count = null;

    for( let i = offsetID; i < this.array.button.length; i++ ){
        if( this.array.button[i].const.layer ==  this.var.layer )
          this.array.button[i].var.onScreen = true;
    }
  }

  initInscriptions(){
    let layer, content, center, size;
    let a = this.const.a * 1.25;

    layer = 3;
    size = FONT_SIZE;

    this.updateInscription();
  }

  addInscription( layer, content, center, size ){
    this.array.inscription.push( new inscription( this.var.id.inscription, layer, content, center, size ));
    this.var.id.inscription++;
  }

  cleanInscriptions(){
    for( let i = this.const.menu.inscription; i < this.array.inscription.length; i++ )
      this.array.inscription[i].var.onScreen = false;
  }

  updateInscription(){
    let offsetID = null;
    this.cleanInscriptions();

    switch ( this.var.layer ) {
      case 3:
        break;
    }
  }

  update(){
    this.updateButtons();
    this.updateBorders();
    this.updateInscription();
  }

  buttonClickCheck(){
    let x = mouseX;// - this.offset.x;
    let y = mouseY;// - this.offset.y;
    let vec = createVector( x, y );
    let minDist = INFINITY;
    let buttonID = null;

    for( let i = 0; i < this.array.button.length; i++ )
      if ( vec.dist( this.array.button[i].const.center ) < minDist ){
        minDist = vec.dist( this.array.button[i].const.center );
        buttonID = i;
      }
    if ( minDist > CELL_SIZE / 2 || !this.array.button[buttonID].var.onScreen )
        return;

    //change board layer
    if( buttonID >= 0 && buttonID < this.const.menu.buttons )
      this.switchLayer( buttonID );

    this.update();
  }

  click(){
    this.buttonClickCheck();

    this.array.layer[this.var.layer].click( this.array.offset[this.var.layer] );
  }

  key(){
    this.array.layer[this.var.layer].key();
  }

  moved(){
    this.array.layer[this.var.layer].moved( this.array.offset[this.var.layer] );
  }

  switchLayer( buttonID ){
    let buttonOffset = 0;
    this.var.layer = buttonID - buttonOffset;
  }

  //drawing game frame
  draw(){
    //draw borders
    for( let border of this.array.border )
        border.draw( this.var.layer );

    //draw buttons
    for( let button of this.array.button )
        button.draw( this.var.layer );

    //draw inscriptions
    for( let inscription of this.array.inscription )
        inscription.draw( this.var.layer );

    //draw layer
    this.array.layer[this.var.layer].draw( this.array.offset[this.var.layer] );
  }
}
