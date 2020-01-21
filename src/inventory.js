import React from 'react';
import { GameItem } from './gameplay.js';
import { images } from './data.js';

//Drag & Drop Inventory
//---------------------------------------------------------------------------------
export class GameHUDInventory extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {
        inventory: this.props.inventory,
        equipment: this.props.equipment
      }
    }
  
    onDragStart = (ev, slot , type) => {
        ev.dataTransfer.setData("slot", slot);
        ev.dataTransfer.setData("type", type);
    }
  
    onDragOver = (ev) => {
        ev.preventDefault();
    }
  
    onDrop = (ev, bSlot, bType, type) => {
      let inventory = this.state.inventory;
      let equipment = this.state.equipment;
      let aSlot = ev.dataTransfer.getData("slot");
      let aSlotType = ev.dataTransfer.getData("type");
      if(type === "inventory")
      {
        if(aSlotType === "equipment")
        {
          let item_1 = equipment[aSlot];
          let item_2 = inventory.slot[bSlot];
          equipment[aSlot] = item_2;
          inventory.slot[bSlot] = item_1;
        }
        else
        {
          let item_1 = inventory.slot[aSlot];
          let item_2 = inventory.slot[bSlot];
          inventory.slot[aSlot] = item_2;
          inventory.slot[bSlot] = item_1;
        }
      }
      else if(type === "equipment")
      {
        if(aSlotType === "equipment")
        {
          console.log(bType)
          console.log(bSlot)
          if (equipment[aSlot].type === bType)
          {
            let item_1 = equipment[aSlot];
            let item_2 = equipment[bSlot];
            equipment[aSlot] = item_2;
            equipment[bSlot] = item_1;
          }
        }
        else
        {
          if (inventory.slot[aSlot].type === bType)
          {
            let item_1 = inventory.slot[aSlot];
            let item_2 = equipment[bSlot];
            inventory.slot[aSlot] = item_2;
            equipment[bSlot] = item_1;
          }
        }       
      }
      this.props.onEquipmentChange();
    }
  
    createInventorySlot(j) {
      if(this.state.inventory.slot[j]){
        return(
          <div className="p-0" style={{width:'10%'}}>
            <div className="droppable"
              onDragOver={(e)=>this.onDragOver(e)}
              onDrop={(e)=>this.onDrop(e, j, this.state.inventory.slot[j].type, "inventory")}>
              <div 
                  onDragStart = {(e) => this.onDragStart(e, j, "inventory")}
                  draggable
                  className="draggable w-100 h-100 text-light"
              >
                  <GameItem key={this.state.inventory.slot[j]} item={this.state.inventory.slot[j]}/>
              </div>
            </div>
          </div>
        )
      }
      else{
        return(
          <div className="p-0" style={{width:'10%'}}>
            <div className="droppable"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, j, null, "inventory")}>
                <div className="w-100 ability-image">
                  <div className="position-absolute w-100 bg-dark-2 h-100 pixelated border border-secondary" style={{top:0,bottom:0,right:0,left:0}}></div>
                </div>
            </div>
          </div>
        )
      }
    }

    createEquipmentSlot(equipment, type) {
      if(this.state.equipment[equipment]){
        return(
          <div className="droppable p-0 mb-1 w-100"
              onDragOver={(e)=>this.onDragOver(e)}
              onDrop={(e)=>this.onDrop(e, equipment, type, "equipment")}>
              <div 
                  onDragStart = {(e) => this.onDragStart(e, equipment, "equipment")}
                  draggable
                  className="draggable w-100 h-100 text-light"
              >
                  <GameItem key={this.state.equipment[equipment]} item={this.state.equipment[equipment]}/>
              </div>
          </div>
        )
      }
      else{
        return(
          <div className="droppable p-0 mb-1 w-100" 
              onDragOver={(e)=>this.onDragOver(e)}
              onDrop={(e)=>this.onDrop(e, equipment, type, "equipment")}>
              <div className="w-100 ability-image">
                <div className="position-absolute w-100 bg-dark-2 h-100 pixelated border border-secondary" style={{top:0,bottom:0,right:0,left:0}}></div>
              </div>
          </div>
        )
      }
    }
  
    createRow(i) {
      let row = []
      let j = (i*10);
      let size = j + 10;
      if(((this.state.inventory.size - j)/10) < 1){
        size = j + (this.state.inventory.size % 10);
      }
      for (j; j < size; j++) {
        row.push(
          this.createInventorySlot(j)
        )
      }
      return row;
    }
  
    render() {
        var inventory = []
        var equipment = []
        for(let i=0; i < this.state.inventory.size/10; i++){
          inventory.push(
            <div className="w-100 row p-0 m-0 mb-1">
              {this.createRow(i)}
            </div>
          )
        }
        equipment.push(
          this.createEquipmentSlot("helmet","helmet")
        )
        equipment.push(
          this.createEquipmentSlot("chest","chest")
        )
        equipment.push(
          this.createEquipmentSlot("legs","legs")
        )
        equipment.push(
          this.createEquipmentSlot("gloves","gloves")
        )
        equipment.push(
          this.createEquipmentSlot("main_hand","main_hand")
        )
        equipment.push(
          this.createEquipmentSlot("off_hand","off_hand")
        )
        equipment.push(
          this.createEquipmentSlot("relic1","relic")
        )
        equipment.push(
          this.createEquipmentSlot("relic2","relic")
        )
  
        return (
            <div className="container-drag h-100">
                <div className="bg-dark mb-1 border border-secondary p-2 text-light">
                  <h1 className="m-0 p-0">Inventory</h1>
                </div>
                <div className="row m-0 h-100 bg-dark border border-secondary p-2 text-light">
                  <div className="col-4 p-0 pr-1">
                    <div className="h-100 d-flex justify-content-center bg-dark-2 border border-secondary">
                      <img className="pixelated d-block" style={{width:'auto',height:'100%'}}  src={images['body.png']} alt="" />
                    </div>
                  </div>
                  <div class="col-8 h-100 row p-0 m-0">
                    <div className="p-0" style={{width:'9%'}}>
                      {equipment}
                    </div>
                    <div style={{width:'1%'}}></div>
                    <div className="p-0" style={{width:'90%'}}>
                      {inventory}
                    </div>
                  </div>
                </div>
            </div>
        );
    }
  }
  