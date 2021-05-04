//
class list_h {
  constructor(){
    this.const = {
    };
    this.var = {
    };
    this.array = {
      facility: [],
      transport: [],
      robot: []
    };

    this.init();
  }

  init_lists(){
    this.array.facility = [
      {
        'name': 'mine_department',
        'workers': 1,
        'pace': 1,
        'depot_size': 10
      },
      {
        'name': 'assembly_department',
        'workers': 1,
        'pace': 1
      },
      {
        'name': 'research_department',
        'workers': 1,
        'pace': 1
      },
    ];
  }

  init(){
  }

  draw( offset ){
  }
}
