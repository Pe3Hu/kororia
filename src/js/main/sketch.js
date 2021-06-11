const CELL_SIZE = 24;
const DAO_NUM = 9;
const COLOR_MAX = 360;
const COLOR_BG = COLOR_MAX / 2;
const INFINITY = 999999999;
const FRAME_RATE = 60;
const FONT_SIZE = 10;
const MENU_LAYER = 99;
const STROKE_WEIGHT = 0.5 * 13 / 8;

let CANVAS_SIZE;
let FONT;
let GAME_BOARD = null;
let WORKSPACE;
let WORKSPACE_GRID;
let IMGS = [ [] ];

function preload() {
}
function preload() {
  FONT = loadFont('src/fonts/Chunkfive.otf');

  let images_count = 12;

  for ( let i = 1; i < images_count; i++ ) {
    IMGS[i - 1] = loadImage( "src/images/lux aeterna/LUX-"  + i + ".png" );
  }
}

function setup() {
  CANVAS_SIZE = createVector( 1600, 960 );//800 600
  createCanvas( CANVAS_SIZE.x, CANVAS_SIZE.y );

  WORKSPACE = createVector( CANVAS_SIZE.x - CELL_SIZE * 3.5, CANVAS_SIZE.y - CELL_SIZE );
  WORKSPACE_GRID = createVector( Math.floor( WORKSPACE.x / CELL_SIZE ), Math.floor( WORKSPACE.y / CELL_SIZE ) );

  textFont( FONT );
  textSize( FONT_SIZE );
  textAlign( CENTER );

  colorMode( HSL, COLOR_MAX );
  frameRate( FRAME_RATE );

  GAME_BOARD = new board();
}

function draw() {
  background( COLOR_BG );
  GAME_BOARD.draw();
}

function mouseClicked() {
  GAME_BOARD.click();
}

function mouseMoved() {
  if( GAME_BOARD != null )
    GAME_BOARD.moved();
}

function keyPressed() {
  GAME_BOARD.key();
}
