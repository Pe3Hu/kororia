const CELL_SIZE = 24;
const DAO_NUM = 9;
const COLOR_MAX = 360;
const COLOR_BG = COLOR_MAX / 2;
const INFINITY = 999999999;
const FRAME_RATE = 60;
const FONT_SIZE = 10;
const MENU_LAYER = 99;

let CANVAS_SIZE;
let CANVAS_GRID;
let FONT;
let GAME_BOARD;

function preload() {
  FONT = loadFont('src/fonts/Chunkfive.otf');
}

function setup() {
  CANVAS_SIZE = createVector( 1280, 800 );//800 600
  CANVAS_GRID = createVector( Math.floor( CANVAS_SIZE.x / CELL_SIZE ), Math.floor( CANVAS_SIZE.y / CELL_SIZE ) );
  createCanvas( CANVAS_SIZE.x, CANVAS_SIZE.y );

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
  GAME_BOARD.moved();
}

function keyPressed() {
  GAME_BOARD.key();
}
