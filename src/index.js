import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { PLAYER_CHARACTER, CHARACTERS, images } from './data.js';
import { ToolTipComponent } from './tooltip.js';
import { WindowComponent } from './window.js';
import { GameHUDInventory } from './inventory.js';
import { MapEditor, MapEditorStart, RenderMap } from './mapeditor.js';
import { GameAbility, GameItem} from './gameplay.js';

//Data Collection
//---------------------------------------------------------------------------------
function getCharacterData(name){
  const character = CHARACTERS.filter(function (character) {
    return character.name === name;
  });
  return character[0];
}

//Player Character Data
//---------------------------------------------------------------------------------

function getMaxHealth(level, strength){
  return((strength + level) * 100);
}

function getMaxMana(level, intelligence){
  return((intelligence + level) * 100);
}

function initializePlayerCharacter(character){
  PLAYER_CHARACTER.image =                character.image;
  PLAYER_CHARACTER.sprite =               character.sprite;
  PLAYER_CHARACTER.name =                 character.name;
  PLAYER_CHARACTER.attributes =           character.attributes;
  PLAYER_CHARACTER.abilities =            character.abilities;
  PLAYER_CHARACTER.level =                1;
  PLAYER_CHARACTER.maxHealth =            getMaxHealth(PLAYER_CHARACTER.level, PLAYER_CHARACTER.attributes[0].value);
  PLAYER_CHARACTER.maxMana =              getMaxMana(PLAYER_CHARACTER.level, PLAYER_CHARACTER.attributes[1].value);
  PLAYER_CHARACTER.currentHealth =        PLAYER_CHARACTER.maxHealth;
  PLAYER_CHARACTER.currentMana =          PLAYER_CHARACTER.maxMana;
  PLAYER_CHARACTER.inventory =            character.inventory;
}

//Character Menu
//---------------------------------------------------------------------------------

class CharacterButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleCharacterChange = this.handleCharacterChange.bind(this);
  }
  
  handleCharacterChange(e) {
    this.props.onCharacterChange(this.props.name);
  }

  render() {
    
    return (
      <div className="col-12 col-md-4 p-0">
        <button className={((this.props.selectedCharacter === this.props.name) ? "on" : "") + " shadow-sm character-button p-0 w-100 h-100 border border-secondary position-relative"} onClick={this.handleCharacterChange}>
            <img className="w-100 pixelated" src={this.props.image} alt="" />
        </button>
      </div>
    )
  }
}

class CharacterGrid extends React.Component {
  constructor(props) {
    super(props);
    this.handleCharacterChange = this.handleCharacterChange.bind(this);
  }
  
  handleCharacterChange(e) {
    this.props.handleCharacterChange(e);
  }

  render() {
    const rows = [];
    var i = 0;
    this.props.characters.forEach((character) => {
      rows.push(
        <CharacterButton key={i} image={character.image} name={character.name} selectedCharacter={this.props.selectedCharacter} onCharacterChange={this.handleCharacterChange}/>
      )
      i++;
    })

    return (
      <div>
        <div className="row m-0 w-100">
          {rows}
        </div>
      </div>
    )
  }
}

class CharacterInfo extends React.Component {
  render() {
    const selectedCharacter = this.props.selectedCharacter;
    const character = getCharacterData(selectedCharacter);
    return (
      <div className="p-0 container">
        <div className="row">
          <div className="p-2 col border border-secondary bg-dark">
            <img className="w-100 pixelated" src={character.image} alt="" />
          </div>
        </div>
        <div className="row">
          <div className="p-2 col border border-secondary bg-dark">
            <h1 className="text-red m-0 text-uppercase">
              {character.name}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="p-2 col-4 border border-secondary bg-dark">
            <div className="row p-1 m-0 d-flex align-items-center">
              <div className="col p-1">
                <ToolTipComponent
                  ttContent={
                  <div style={{width:"50px", height:"50px"}}>
                    <img src={images['strength.svg']} alt="" />
                  </div>
                  }
                  ttInnerContent={
                    <div style={{width:'300px'}}>
                      <h5 className="text-orange">Strength:</h5>
                      <p className="text-light">Affects weapon damage, weapon durability (degradation rate upon each successful hit; higher strength results in higher weapon degradation), and carrying capacity. It also helps determine maximum Fatigue and starting Health.</p>
                    </div>
                  }
                />
              </div>
              <h2 className="text-light text-right col m-0">
                {character.attributes[0].value}
              </h2>
            </div>
            <div className="row p-1 m-0 d-flex align-items-center">
              <div className="col p-1">
                <ToolTipComponent 
                  ttContent={
                  <div style={{width:"50px", height:"50px"}}>
                    <img src={images['intelligence.svg']} alt="" />
                  </div>
                  }
                  ttInnerContent={
                    <div style={{width:'300px'}}>
                      <h5 className="text-orange">Intelligence:</h5>
                      <p className="text-light">Affects maximum Magicka. 15% of Intelligence is the amount of magicka gained per hour of sleep. Intelligence also affects Alchemy and Enchanting results.</p>
                    </div>
                  }
                />
              </div>
              <h2 className="text-light text-right col m-0">
                {character.attributes[1].value}
              </h2>
            </div>
            <div className="row p-1 m-0 d-flex align-items-center">
              <div className="col p-1">
                <ToolTipComponent 
                  ttContent={
                  <div style={{width:"50px", height:"50px"}}>
                    <img src={images['dexterity.svg']} alt=""/>
                  </div>
                  }
                  ttInnerContent={
                    <div style={{width:'300px'}}>
                      <h5 className="text-orange">Dexterity:</h5>
                      <p className="text-light">Affects weapon hit rate, evasion, resistance to staggering and knock down, and success rate of Sneaking, Pickpocketing, Lockpicking, Blocking, and Jumping. Dexterity also affects maximum Fatigue.</p>
                    </div>
                  }
                />
              </div>
              <h2 className="text-light text-right col m-0">
                {character.attributes[2].value}
              </h2>
            </div>
          </div>
          <div className="p-2 col-8 border border-secondary bg-dark">
            <h5 className="text-orange text-uppercase">Description:</h5>
            <p className="text-light">
              {character.description}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

class CharacterStart extends React.Component {
  constructor(props) {
    super(props);
    this.handleGameStateChange = this.handleGameStateChange.bind(this);
  }

  handleGameStateChange(e) {
    const selectedCharacter = this.props.selectedCharacter;
    const character = CHARACTERS.filter(function (character) {
      return character.name === selectedCharacter;
    });
    initializePlayerCharacter(character[0]);
    this.props.onGameStateChange("GameStart");
  }

  render() {
    return (
      <button className="w-100 bg-dark border-secondary p-3" onClick={this.handleGameStateChange}>
        <h1 className="text-uppercase text-light m-0">Start Game</h1>
      </button>
    )
  }
}

class CharacterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCharacter: 'Warrior'
    };

    this.setupRefs();

    this.setupEvents();

  }

  setupRefs() {
 
  }

  setupEvents() {
    this.handleCharacterChange = this.handleCharacterChange.bind(this);
    this.handleGameStateChange = this.handleGameStateChange.bind(this);
  }

  handleCharacterChange(selectedCharacter) {
    this.setState({
      selectedCharacter: selectedCharacter
    });
  }

  handleGameStateChange(e) {
    this.props.handleGameStateChange(e);
  }
  

  render() {
    return (
        <div className="container p-5">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-6">
              <div className="col-12">
                <CharacterGrid characters={this.props.characters} selectedCharacter={this.state.selectedCharacter} handleCharacterChange={this.handleCharacterChange}/>
              </div>
              <div className="col-12 d-flex">
                <CharacterStart selectedCharacter={this.state.selectedCharacter} onGameStateChange={this.handleGameStateChange}/>
              </div>
              <div className="col-12 d-flex">
                <MapEditorStart onGameStateChange={this.handleGameStateChange}/>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-6">
              <CharacterInfo characters={this.props.characters} selectedCharacter={this.state.selectedCharacter}/>
            </div>
          </div>
        </div>
    )
  }
}

//Game HUD
//---------------------------------------------------------------------------------

class GameHUDPortrait extends React.Component{
  render(){
    return(
      <div>
        <img className="pixelated border border-secondary w-100" src={this.props.character.image} alt=""/>
        <div className="w-100 m-0 row">
          <h5 className="m-0 text-red">{this.props.character.name}</h5>
          <p className="mb-0 ml-2 text-orange"><small>LVL. {this.props.character.level}</small></p>
        </div>
      </div>
    )
  }
}

class GameHUDSkillBar extends React.Component{
  render(){
    return(
      <div className="h-100 w-100 d-flex justify-content-center align-items-center">
        <div className="col">
          <GameAbility ability={this.props.character.abilities[0]}/>
        </div>
        <div className="col">
          <GameAbility ability={this.props.character.abilities[0]}/>
        </div>
        <div className="col">
          <GameAbility ability={this.props.character.abilities[0]}/>
        </div>
        <div className="col">
          <GameAbility ability={this.props.character.abilities[0]}/>
        </div>
      </div>
    )
  }
}

class GameHUDHealthBar extends React.Component{
  render(){
    return(
      <ToolTipComponent 
            ttContent={
              <div className="w-100 h-100 border border-secondary d-flex align-items-center justify-content-center" style={{background:'#ff5653'}}>
                <div className="text-center text-light">
                  {this.props.character.currentHealth}/{this.props.character.maxHealth}
                </div>
              </div>
            }
            ttInnerContent={
              <div style={{width:'300px'}}>
                <h5 className="text-orange">Health:</h5>
                <p className="text-light">The amount of damage you can take before dying</p>
              </div>
            }
      />
    )
  }
}

class GameHUDManaBar extends React.Component{
  render(){
    return(
      <ToolTipComponent 
            ttContent={
              <div className="w-100 h-100 border border-secondary d-flex align-items-center justify-content-center" style={{background:'rgb(83, 174, 255)'}}>
                <div className="text-center text-light">
                {this.props.character.currentMana}/{this.props.character.maxMana}
                </div>
              </div>
            }
            ttInnerContent={
              <div style={{width:'300px'}}>
                <h5 className="text-orange">Mana:</h5>
                <p className="text-light">The energy used to cast spells and abilities.</p>
              </div>
            }
      />
    )
  }
}

class GameHUDStatusBar extends React.Component{
  render(){
    return(
      <div className="w-100 p-2">
        <div className="mb-1">
          <GameHUDHealthBar character={this.props.character}/>
        </div>
        <div>
          <GameHUDManaBar character={this.props.character}/>
        </div>
      </div>
    )
  }
}

class GameHUDEquipmentSlot extends React.Component{
  render(){
    if(this.props.id !== undefined)
    {
      return(
        <GameItem key={this.props.id} item={this.props.id}/>
      )
    }
    else
    {
      return(
        <div className="w-100 ability-image">
          <div className="position-absolute w-100 bg-dark-2 h-100 pixelated border border-secondary" style={{top:0,bottom:0,right:0,left:0}}></div>
        </div>
      )
    }
  }
}

class GameHUDEquipmentBar extends React.Component{
  constructor(props)
  {
    super(props);

    this.setupEvents();

    this.state = {
      inventory: this.props.inventory,
      equipment: this.props.equipment
    }
  }

  setupEvents()
  {
  	this.handleOnEquipmentChange = this.handleOnEquipmentChange.bind(this);
  }

  handleOnEquipmentChange()
  {
    this.setState({
      inventory: this.props.inventory,
      equipment: this.props.equipment
    });
  }

  render(){
    return(
      <div className="h-100 w-100">
        <div className="w-100 row p-0 m-0">
          <div className="col p-1">
            <GameHUDEquipmentSlot id={this.props.character.equipment.helmet}/>
          </div>
          <div className="col p-1">
            <GameHUDEquipmentSlot id={this.props.character.equipment.chest}/>
          </div>
          <div className="col p-1">
            <GameHUDEquipmentSlot id={this.props.character.equipment.legs}/>
          </div>
          <div className="col p-1">
            <GameHUDEquipmentSlot id={this.props.character.equipment.gloves}/>
          </div>
        </div>
        <div className=" w-100 row p-0 m-0">
          <div className="col p-1">
            <GameHUDEquipmentSlot id={this.props.character.equipment.main_hand}/>
          </div>
          <div className="col p-1">
            <GameHUDEquipmentSlot id={this.props.character.equipment.off_hand}/>
          </div>
          <div className="col p-1">
            <GameHUDEquipmentSlot id={this.props.character.equipment.relic1}/>
          </div>
          <div className="col p-1">
            <GameHUDEquipmentSlot id={this.props.character.equipment.relic2}/>
          </div>
        </div>
        <div className="w-100 row p-0 m-0 mt-2">
          <WindowComponent 
            windowContent={
              <GameHUDInventory onEquipmentChange={this.handleOnEquipmentChange} inventory={PLAYER_CHARACTER.inventory} equipment={PLAYER_CHARACTER.equipment}/>
            }
            buttonContent={
              <button className="w-100 bg-dark border-secondary">
                <h5 className="text-uppercase text-light m-0">Inventory</h5>
              </button>
            }
            width='800px'
            height='800px'
          />
        </div>
      </div>
    )
  }
}

class GameHUD extends React.Component{
  render(){
    return(
      <div className="d-flex position-fixed p-0" style={{bottom:0,left:'0',right:'0', margin:'auto', width:'1000px', height:'200px'}}>
        <div className="position-absolute bg-dark border border-secondary p-3" style={{bottom: 0, left: 0, right:'75%'}}>
          <GameHUDPortrait character={PLAYER_CHARACTER}/>
        </div>
        <div className="position-absolute bg-dark border border-secondary p-2" style={{bottom: 0, left: '25%', right:'25%', top:0}}>
          <div className="position-absolute p-0" style={{top:0,bottom:'40%',right:0,left:0}}>
            <GameHUDSkillBar character={PLAYER_CHARACTER}/>
          </div>
          <div className="position-absolute d-flex justify-content-center p-0" style={{top:'60%',bottom:0,right:0,left:0}}>
            <GameHUDStatusBar character={PLAYER_CHARACTER}/>
          </div>
        </div>
        <div className="position-absolute bg-dark border border-secondary p-2" style={{bottom: 0, left: '75%', right:0, top:0}}>
          <GameHUDEquipmentBar inventoryRef={this.props.inventoryRef} character={PLAYER_CHARACTER}/>
        </div>
      </div>
    )
  }
}

const CONTROLS = {
  UP: 87,
  DOWN: 83,
  LEFT: 65,
  RIGHT: 68
}

class GameController extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      position: this.props.position,
      size: this.props.size,
      moving: null
    }
    this.InputFunction = this.InputFunction.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  InputFunction(key){
    switch(key){
      case CONTROLS.UP:
        this.props.handlePlayerPosition({X:this.state.position.X, Y:this.state.position.Y - 1})
        break;
      case CONTROLS.DOWN:
        this.props.handlePlayerPosition({X:this.state.position.X, Y:this.state.position.Y + 1})
        break;
      case CONTROLS.LEFT:
        this.props.handlePlayerPosition({X:this.state.position.X - 1, Y:this.state.position.Y})
        break;
      case CONTROLS.RIGHT:
        this.props.handlePlayerPosition({X:this.state.position.X + 1, Y:this.state.position.Y})
        break;
      default:
        return;
    }
  }

  handleKeyDown(event){
    this.InputFunction(event.keyCode)
  }

  handleKeyUp(){

  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.InputFunction, false);
    document.removeEventListener("keyup", this.handleKeyUp, false);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ position: nextProps.position });  
  }
  render(){
    console.log(this.state.position)
    let style = {
      width: ((this.state.size.X) + 'px'),
      height: ((this.state.size.Y) + 'px'),
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50px, -50px)',
      transformOrigin: 'center'
    }
    return(
      <div style={style}>
        <img className="w-100 h-100" src={PLAYER_CHARACTER.sprite}/>
      </div>
    )
  }
}

class GameMap extends React.PureComponent{
  render(){
    let map = RenderMap(this.props.map)
    return(
      <div className="w-100 h-100">{map}</div>
    )
  }
}

class GameWorld extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      playerPosition: {X:0, Y:0},
      mapPosition: {X: -50, Y: -50},
    };
    this.handlePlayerPosition = this.handlePlayerPosition.bind(this);
  }
  handlePlayerPosition(pos){
    console.log(pos)
    if((pos.X < this.props.map.mapSize.x && pos.X >= 0) && (pos.Y < this.props.map.mapSize.y && pos.Y >= 0))
    {
      this.setState({
        playerPosition: pos,
        mapPosition: {X: (-pos.X*100) - 50, Y: (-pos.Y*100) - 50}
      })
    }
  }

  render(){
    if(this.props.map){
      let style = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(' + this.state.mapPosition.X + 'px, ' + this.state.mapPosition.Y + 'px)',
        transformOrigin: 'center'
      }
      return(
        <div className="w-100 h-100" style={{background:'lightblue'}}>
          <div className="w-100 h-100" style={style}>
            <GameMap map={this.props.map}/>
          </div>
          <GameController player={PLAYER_CHARACTER} size={{X:100,Y:100}} position={this.state.playerPosition} handlePlayerPosition={this.handlePlayerPosition}/>
        </div>
      )
    }
    else
      return(
        <div className="w-100 h-100" style={{background:'teal'}}>
          <h1 className="text-light">No Map loaded!</h1>
        </div>
      )
  }
}

class GameView extends React.Component{
  constructor(props)
  {
    super(props);
    
    this.setupRefs();
    this.state = { cursorX: 0, cursorY: 0 };
  }

  setupRefs()
  {
  	this.player_inventory = React.createRef();
  }

  _onMouseMove(e) {
    this.setState({ cursorX: e.screenX, cursorY: e.screenY });
  }

  render(){
    let cursor = {
      pointerEvents: 'none',
      zIndex:'2',
      width:'auto',
      height:'50px',
      left: this.state.cursorX - 15,
      top: this.state.cursorY - 102
    }
    return(
      <div className="game-window cursor-hide d-flex" onMouseMove={this._onMouseMove.bind(this)}>
          <div className="w-100 h-100">
            <img className="position-absolute pixelated" src={images['cursor_point.png']} style={cursor}/>
            {/* <h1 className="text-light">Mouse coordinates: { this.state.cursorX } { this.state.cursorY }</h1> */}
            <GameWorld map={this.props.map}/>
            <GameHUD/>
          </div>
      </div>
    )
  }
}
//Game State Handler
//---------------------------------------------------------------------------------

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: "CharacterMenu",
      gameSave: [],
      mapTest: null
    };
    this.setupEvents();
  }

  setupEvents() {
    this.handleGameStateChange = this.handleGameStateChange.bind(this);
    this.handleTestPlay = this.handleTestPlay.bind(this);
  }

  handleGameStateChange(gameState) {
    this.setState({
      gameState: gameState
    });
  }

  handleTestPlay(map) {
    initializePlayerCharacter(CHARACTERS[0]);
    this.setState({
      mapTest: map
    })
    this.handleGameStateChange('GameTest')
  }

  render() {
    switch(this.state.gameState){
      case 'CharacterMenu':
        return <CharacterMenu characters={CHARACTERS} handleGameStateChange={this.handleGameStateChange}/>;
      case 'GameStart':
        return <GameView map={null}/>;
      case 'GameTest':
        return <GameView map={this.state.mapTest}/>;
      case 'MapEditor':
        return <MapEditor handleTestPlay={this.handleTestPlay}/>;
      default:
        return null;
    }
  }
}

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);
