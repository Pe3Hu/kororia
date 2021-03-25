//
class landed_estates {
  constructor ( index, domain, isle ){
    this.const = {
      index
    };
    this.array = {
      domain: []
    };
    this.data = {
      isle: isle
    };

    if( index != 0 )
      this.appropriate_domain( domain );
  }

  appropriate_domain( domain, flag ){
    this.array.domain.push( domain );
    domain.set_landed_estates( this.const.index, 2 );
  }

  reject_domain( domain ){
    let index = this.array.domain.indexOf( domain );
    this.array.domain.splice( index, 1 );
    domain.set_landed_estates( 0, 1 );
  }
}
