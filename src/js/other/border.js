class border {
  constructor ( index, layer, name, offset, size ){
    this.const = {
      index: index,
      layer: layer,
      name: name,
      offset: offset,
      size: size
    };
    this.var = {
      onScreen: true
    }
    this.color = {
      bg:{
        h: 0,
        s: 0,
        l: COLOR_MAX / 3 * 2
      }
    };
  }

  setSize( size ){
    this.const.size = size;
  }

  setOffset( offset ){
    this.const.offset = offset.copy();
  }

  draw( layer ){
    noStroke();

    if ( ( this.const.layer == layer || this.const.layer == MENU_LAYER ) && this.var.onScreen ){
      fill( this.color.bg.h, this.color.bg.s, this.color.bg.l );
      rect( this.const.offset.x, this.const.offset.y, this.const.size.x, this.const.size.y );
    }
  }
}
