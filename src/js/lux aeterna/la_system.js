//
class la_system {
  constructor( index, name, cards, current_card ){
    this.const = {
      index: index,
      name: name,
      current_card: current_card,
      dice_min: 0,
      dice_max: 6
    };
    this.var = {
      current: {
        dice: 2
      }
    };
    this.flag = {
      repair: true,
      operational: false,
      collapse: false
    }
    this.array = {
      card: cards
    };
    this.data = {
      card: cards[current_card]
    };
  }

  impact_on_dice( value ){
    this.var.current.dice += value;
  }

  activate(){
    if( this.var.current.dice < this.const.dice_min ){
      //collapse
    }
    if( this.var.current.dice > this.const.dice_max ){
      //operational
    }
  }

  repair_check(){
    if( this.var.current.dice < this.const.dice_min )
      this.flag.collapse = true;
    if( this.var.current.dice > this.const.dice_max )
      this.flag.operational = true;
  }
}
