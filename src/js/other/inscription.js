class inscription {
  constructor ( index, layer, content, center, size ){
    this.const = {
      index: index,
      layer: layer,
      content: content,
      center: center,
      size: size
    };
    this.var = {
      onScreen: true
    };
  }

  draw( layer ){
    if ( ( this.const.layer == layer || this.const.layer == MENU_LAYER ) && this.var.onScreen ){
      textSize( this.const.size );
      strokeWeight( 1 );
      fill( 0 );
      text( this.const.content, this.const.center.x, this.const.center.y + this.const.size / 3 );
      textSize( FONT_SIZE );
    }
  }
}
