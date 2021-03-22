//
class landed_estates {
  constructor ( index, domain ){
    this.const = {
      index
    };
    this.array = {
      domain: []
    };

    if( index != 0 )
      this.appropriate_domain( domain );
  }

  appropriate_domain( domain ){
    this.array.domain.push( domain );
    domain.set_landed_estates( this.const.index );
  }
}
