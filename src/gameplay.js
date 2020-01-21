import React from 'react';
import { ToolTipComponent } from './tooltip.js';

//Gameplay
//---------------------------------------------------------------------------------

export class GameAbility extends React.Component {
  render(){
    return(
      <ToolTipComponent 
            ttContent={
              <div className="w-100 ability-image">
                  <img className="position-absolute w-100 h-100 pixelated border border-secondary" style={{top:0,bottom:0,right:0,left:0}} src={this.props.ability.image} alt="" />
              </div>
            }
            ttInnerContent={
              <div style={{width:'300px'}}>
                <h5 className="text-orange">{this.props.ability.name}:</h5>
                <p className="text-light">{this.props.ability.description}</p>
              </div>
            }
      />
    )
  }
}
  
export class GameItem extends React.Component {

  getStats(){
    let stats = [];
    for(let stat in this.props.item.stats){
      switch(stat){
        case('damage_rating'):
          stats.push(
            <p className="text-light m-0">Damage Rating: <span className="text-orange">{this.props.item.stats.damage_rating}</span></p>
          );
          break;
        case('armor_rating'):
          stats.push(
            <p className="text-light m-0">Armor Rating: <span className="text-orange">{this.props.item.stats.armor_rating}</span></p>
          );
          break;
        case('value'):
          stats.push(
            <p className="text-light m-0">Value: <span className="text-orange">{this.props.item.stats.value}g</span></p>
          );
          break;
        default:
          break;
      }
    }
    return (stats);
  }

  render(){
    let stats = this.getStats();
    return(
      <ToolTipComponent 
            ttContent={
              <div className="w-100 ability-image">
                  <img className="position-absolute w-100 h-100 pixelated border border-secondary" style={{top:0,bottom:0,right:0,left:0}} src={this.props.item.image} alt="" />
              </div>
            }
            ttInnerContent={
              <div style={{width:'300px'}}>
                <img className="w-100 pixelated border border-secondary" src={this.props.item.image} alt="" />
                <h5 className="text-orange">{this.props.item.name}:</h5>
                <p className="text-light">{this.props.item.description}</p>
                {stats}
              </div>
            }
      />
    )
  }
}