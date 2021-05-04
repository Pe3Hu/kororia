//
class facility_h {
  constructor( obj ){
    this.const = {
      sector: obj.sector,
      type: obj.type
    };
    this.var = {
    };
    this.array = {
    };
    this.data = {
      foothold: obj.foothold
    }

    this.init();
  }

  init(){
  }

  draw( offset ){
  }
}
