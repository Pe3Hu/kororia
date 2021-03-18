class button {
  constructor ( index, layer, name, type, center ){
    this.const = {
      index: index,
      layer: layer,
      name: name,
      center: center,
      type: type,
      a: CELL_SIZE,
      d: CELL_SIZE * 1,
      r: CELL_SIZE * 0.4,
      n: 5,
      m: 8
    };
    this.array = {
      vertex: []
    };
    this.var = {
      status: null,
      pressed: false,
      description: null,
      onScreen: true
    };
    this.color = {
      bg:{
        h: 0,
        s: COLOR_MAX * 0.75,
        l: COLOR_MAX * 0.5
      }
    };

    this.init();
  }

  init(){
    this.initVertexs();
    this.setColor();
  }

  initVertexs(){
    for( let i = 0; i < this.const.m; i ++ ){
      this.array.vertex.push([]);
      for( let j = 0; j < this.const.n; j ++ ){
        let angle = Math.PI * 2 / this.const.n *  j - Math.PI - Math.PI/4 * i;
        let r = this.const.a / 4;
        if ( j == 0 )
          r *= 2;
        let x = this.const.center.x + Math.sin( angle ) * r;
        let y = this.const.center.y + Math.cos( angle ) * r;
        let vec = createVector( x, y );
        this.array.vertex[i].push( vec.copy() );
      }
    }
  }

  setStatus( status ){
    this.var.pressed = !this.var.pressed;

    switch ( this.var.status ) {
      case 0:
      case 1:
        this.var.status = 2;
        break;
      case 2:
      case null:
          this.var.status = status;
        break;
    }

    switch ( this.var.status ) {
      case 0:
        this.color.bg.h = 120;
        break;
      case 1:
        this.color.bg.h = 30;
        break;
      case 2:
        this.color.bg.h = 60;
        break;
    }
  }

  setColor(){
    switch ( this.const.type ) {
      case 0:
        this.color.bg.h = 340;
        break;
      case 1:
        this.color.bg.h = 150;
        break;
      case 2:
        this.color.bg.h = 50;
        break;
      case 3:
        this.color.bg.h = 220;
        break;
      case 4:
        this.color.bg.h = 300;
        break;
      case 5:
        this.color.bg.h = 270;
        break;
      case 6:
        this.color.bg.h = 180;
        break;
      case 7:
        this.color.bg.h = 30;
        break;
      case 8:
        this.color.bg.h = 120;
        break;
      case 10:
        this.color.bg.h = 330;
        break;
      case 11:
        this.color.bg.h = 30;
        break;
      case 12:
        this.color.bg.h = 60;
        break;
      case 13:
        this.color.bg.h = 210;
        break;
      case 14:
        this.color.bg.h = 330;
        break;
    }
  }

  setDescription( txt ){
    this.var.description = txt;
  }


  draw( layer ){
    fill( this.color.bg.h, this.color.bg.s, this.color.bg.l );

    if ( ( this.const.layer == layer || this.const.layer == MENU_LAYER ) && this.var.onScreen ){
      let d = null;
      noStroke();

      //draw layer change buttons
      if ( this.const.type > -1 && this.const.type < 10 ){
        rect(
          this.const.center.x - this.const.a / 2,
          this.const.center.y - this.const.a / 2,
          this.const.a, this.const.a
        );
      }


      if( this.const.type > 9 && this.const.type < 15 ){
        switch ( this.const.type ) {
          case 10:
          case 11:
          case 12:
            rect(
              this.const.center.x - this.const.a / 2,
              this.const.center.y - this.const.a / 2,
              this.const.a, this.const.a
            );
              break;
          }

          /*switch ( this.const.type ){
            case 13:
            case 14:
              d = ( this.const.type - 13 ) * 4;
            noFill();
            stroke( 0 );
            ellipse( this.const.center.x, this.const.center.y, this.const.a, this.const.a );

            noStroke();
            fill( this.color.bg.h, this.color.bg.s, this.color.bg.l );
            triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
              this.array.vertex[d][1].x, this.array.vertex[d][1].y,
              this.array.vertex[d][2].x, this.array.vertex[d][2].y );
            triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
              this.array.vertex[d][3].x, this.array.vertex[d][3].y,
              this.array.vertex[d][2].x, this.array.vertex[d][2].y );
            triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
              this.array.vertex[d][3].x, this.array.vertex[d][3].y,
              this.array.vertex[d][4].x, this.array.vertex[d][4].y );
              break;
          }*/
      }
    }
  }
}
