//
class pathway {
  constructor ( index, domains, ends ){
    this.const = {
      index
    };
    this.flag = {
      visiable: true
    };
    this.array = {
      domain: domains,
      end: ends
    };
  }

  betray_neighbor( domain ){
    let index = this.array.domain.indexOf( domain );
    let neighbor = this.array.domain.length - index - 1;

    return this.array.domain[neighbor];
  }

  draw( offset ){
    let vec = offset.copy();
    stroke( 0 );
    line( this.array.end[0].x + vec.x, this.array.end[0].y + vec.y,
          this.array.end[1].x + vec.x, this.array.end[1].y + vec.y );
  }
}
