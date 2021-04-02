//
class commander {
  constructor ( index, fraction, a, isle ){
    this.const = {
      index: index,
      fraction: fraction,
      a: a
    };
    this.var = {
    };
    this.flag = {
      player: false,
      ai: true
    }
    this.array = {
    };
    this.data = {
      isle: isle,
      command_post: new command_post( fraction, a, isle )
    }

    this.init();
  }

  init(){
  }

  draw( offset ){
    this.data.command_post.draw( offset );
  }
}
