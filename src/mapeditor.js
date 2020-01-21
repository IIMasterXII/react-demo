import React from 'react';
import { images, ITEMS } from './data.js';
import { WindowComponent } from './window.js';
import './index.css';

export class MapEditorStart extends React.Component {
    constructor(props) {
      super(props);
      this.handleGameStateChange = this.handleGameStateChange.bind(this);
    }
  
    handleGameStateChange(e) {
      this.props.onGameStateChange("MapEditor");
    }
  
    render() {
      return (
        <button className="w-100 bg-dark border-secondary p-3" onClick={this.handleGameStateChange}>
          <h1 className="text-uppercase text-light m-0">Map Editor</h1>
        </button>
      )
    }
}

const TILES = {
    grass: {name: 'grass', sprite: {backgroundImage:"url(" + images['tile_grass.jpg'] + ")",paddingTop:"100%",backgroundSize:"cover"}},
    dirt: {name: 'dirt', sprite: {backgroundImage:"url(" + images['tile_dirt.jpg'] + ")",paddingTop:"100%", backgroundSize:"cover"}},
    wood: {name: 'wood', sprite: {backgroundImage:"url(" + images['tile_wood.jpg'] + ")",paddingTop:"100%", backgroundSize:"cover"}},
    wood_wall: {name: 'wood_wall', sprite: {backgroundImage:"url(" + images['tile_wood_wall.jpg'] + ")",paddingTop:"100%", backgroundSize:"cover"}}
}

var NEW_MAP = {
    mapName: "new_map",
    mapSize: {x:2, y:2},
    mapTiles: [[{tile: TILES.grass, x: 0, y: 0, events: []},{tile: TILES.dirt, x: 1, y: 0, events: []}],[{tile: TILES.grass, x: 0, y: 1, events: []},{tile: TILES.dirt, x: 1, y: 1, events: []}]]
}

var TOOLS = {
    select: {style:{}, svg: images["editor_select.svg"]},
    paint: {style:{}, svg: images["editor_brush.svg"]},
    dropper: {style:{}, svg: images["editor_dropper.svg"]},
    bucket: {style:{}, svg: images["editor_bucket.svg"]}
}

export function RenderMap(map){
    let row = [];
    for(let y = 0; y < map.mapSize.y; y++){
        let col = []
        for(let x = 0; x < map.mapSize.x; x++){
            col.push(
                <div className="p-0" style={{width:'100px',height:'100px',}}>
                    <div className="w-100 h-100 pixelated" style={map.mapTiles[y][x].tile.sprite}></div>
                </div>
            )
        }
        row.push(
            <div className="p-0 m-0 d-flex">
                {col}
            </div>
        )
    }
    return row
}

class Map extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            map: this.props.map
        }
    }

    render() {
        let row = [];
        for(let y = 0; y < this.state.map.mapSize.y; y++){
            let col = []
            for(let x = 0; x < this.state.map.mapSize.x; x++){
                col.push(
                    <div className="p-0" style={{width:'100px',height:'100px',}} onClick={() => this.props.handleTileClick(y,x)}>
                        <div className="w-100 h-100 pixelated" style={this.state.map.mapTiles[y][x].tile.sprite}></div>
                    </div>
                )
            }
            row.push(
                <div className="p-0 m-0 d-flex">
                    {col}
                </div>
            )
        }
        return (
            <div className="w-100 h-100">
                {row}
            </div>
        )
    }

}

class MapViewport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 1,
            posX: 0,
            posY: 0,
            timer: null
        };
        this.mapZoom = this.mapZoom.bind(this);
        this.mapDrag = this.mapDrag.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    mapZoom(event) {
        var factor = 0.9
        if(event.deltaY < 0){
            factor = 1/factor;
        }
        let dx = (this.props.cursorX - this.state.posX) * (factor - 1)
        let dy = ((this.props.cursorY - 102) - this.state.posY) * (factor - 1)
        this.setState({
            scale: this.state.scale * factor,
            posX: this.state.posX - dx,
            posY: this.state.posY - dy,
        });
    }

    mapDrag(initCursor, initPos) {
        this.setState({
            posX: initPos.x + ((this.props.cursorX) - initCursor.x),
            posY: initPos.y + ((this.props.cursorY) - initCursor.y)
            // posX: this.props.cursorX - 15,
            // posY: this.props.cursorY - 102
        })
    }

    handleDragStart(event) {
        if(this.props.tool === "select"){
            let initCursor = {x: this.props.cursorX, y: this.props.cursorY}
            let initPos = {x: this.state.posX, y: this.state.posY}
            this.setState({
                timer: setInterval(() => this.mapDrag(initCursor, initPos), 20)
            });
        }
    }

    handleDragEnd(event) {
        clearInterval(this.state.timer)
    }

    _onMouseLeave(e) {
        clearInterval(this.state.timer)
    }

    render() {
        let cursor = {
            pointerEvents: 'none',
            zIndex:'2',
            width:'auto',
            height:'25px',
            left: this.props.cursorX - 15,
            top: this.props.cursorY - 102
        }
        let styleMap = {
            position: 'absolute',
            left: this.state.posX,
            top: this.state.posY,
            transformOrigin: "top left",
            transform: 'scale(' + this.state.scale + ')'
        }
        return (
            <div className="col-8 h-100 position-relative p-0 bg-viewport" style={{overflow:'hidden', cursor: 'none'}} onMouseLeave={this._onMouseLeave.bind(this)} onWheel={this.mapZoom} onMouseDown={this.handleDragStart} onMouseUp={this.handleDragEnd}>
                <img className="position-absolute pixelated" src={TOOLS[this.props.tool].svg} style={cursor}/>
                <div style={styleMap}>
                    <Map map={this.props.map} tool={this.props.tool} tile={this.props.tile} handleTileClick={this.props.handleTileClick}/>
                </div>
            </div>
        )
    }
}

class MapTileSelect extends React.Component {
    makeTileButton(tile){
        return(
            <button className="col-1 p-0 border-0" onClick={() => this.props.handleBrushChange(tile)}>
                <div className="w-100 h-100 pixelated" style={TILES[tile].sprite}></div>
            </button>
        )
    }

    render(){
        let tiles = [];
        for(var i in TILES)
            tiles.push(
                this.makeTileButton(i)
            )
        return(
            <div className="bg-dark border border-secondary p-2 text-light h-100">
                <h1 className="m-0 p-0">Select A Tile</h1>
                <div className="row p-0 m-0 mt-2">
                    {tiles}
                </div>
            </div>
        )
    }
}

class MapTileEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: "New Event",
            eventDescription: "A New Event has happened!",
            eventType: "text"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
    }

    handleSubmit(event){
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    handleChangeName(event) {
        this.setState({
            eventName: event.target.value
        });
    } 
    
    handleChangeDescription(event) {
        this.setState({
            eventDescription: event.target.value
        });
    }  

    handleChangeType(event) {
        this.setState({
            eventType: event.target.value
        });
    } 

    render(){
        return(
            <div className="bg-dark border border-secondary p-2 text-light h-100">
                <h1 className="m-0 p-0">Add Event</h1>
                <div className="row p-0 m-0 mt-2">
                    <div className="col-2 p-1">
                        <div className="w-100 h-100 pixelated" style={this.props.selected.tile.sprite}></div>
                    </div>
                    <div className="col-10 p-1">
                        <h4 className="text-orange">{this.state.eventName}</h4>
                        <h6 className="text-light">{this.state.eventDescription}</h6>
                    </div>
                </div>
                <form className="row p-0 m-0 mt-2" onSubmit={this.handleSubmit}>
                    <input className="col-12 p-0" type="text" value={this.state.eventName} placeholder="Event Name" onChange={this.handleChangeName}/>
                    <input className="col-12 p-0 mt-2" type="text" value={this.state.eventDescription} placeholder="Event Description"onChange={this.handleChangeDescription}/>
                    <select className="col-6 p-0 mt-2" value={this.state.eventType} onChange={this.handleChangeType}>
                        <option value="text">Dialogue</option>
                        <option value="item">Item</option>
                    </select>
                    <select className="col-6 p-0 mt-2" value={this.state.eventType} onChange={this.handleChangeType}>
                        <option value="text">Dialogue</option>
                        <option value="item">Item</option>
                    </select>
                    <input className="mt-2" type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

class MapSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeX: this.props.map.mapSize.x,
            sizeY: this.props.map.mapSize.y,
            tool: this.props.tool,
            tile: this.props.tile
        }
        this.handleSizeChange = this.handleSizeChange.bind(this);
    }
    
    handleSizeChange(event) {
        if(/^[0-9]+$|^$/.test(event.target.value)){
            if(!event.target.value)
                event.target.value = 1;
            this.props.handleSizeChange(event.target.value, event.target.name);
            this.setState({
                sizeX: this.props.map.mapSize.x,
                sizeY: this.props.map.mapSize.y
            })
        }
    }

    render() {
        let toolbar = []
        for(let tool in TOOLS)
        {
            toolbar.push(<button className="bg-dark col-1 p-2 border-0" onClick={() => this.props.handleToolChange(tool)}><img className="w-100 h-100" src={TOOLS[tool].svg}/></button>)
        }
        let paintTile = []
        if(this.props.tile)
        {
            paintTile.push(
                <div className="col-4 p-0 mt-2">
                    <div className="w-100 pixelated" style={TILES[this.props.tile].sprite}></div>
                    <h4 className="text-light text-uppercase mt-2">{TILES[this.props.tile].name}</h4>
                </div>
            )
        }
        let selectedTile = []
        if(this.props.selected)
        {
            paintTile.push(
                <div className="col-12 p-0 mt-2">
                    <h4 className="text-light text-uppercase mt-2">({this.props.selected.x}, {this.props.selected.y})</h4>
                    <WindowComponent 
                        windowContent={
                        <MapTileEvent selected={this.props.selected}/>
                        }
                        buttonContent={
                        <button className="w-100 bg-dark border-secondary">
                            <h5 className="text-uppercase text-light m-0">Add Event</h5>
                        </button>
                        }
                        width='800px'
                        height='800px'
                    />
                </div>
            )
        }
        return (
            <div className="col-4 h-100 bg-dark">
                <h1 className="text-orange">{this.props.map.mapName}</h1>
                <div className="w-100">
                    <h3 className="text-light">Width:</h3>
                    <input type="text" name="x" value={this.state.sizeX} onChange={(e) => {if(/^[0-9]+$|^$/.test(e.target.value))this.setState({sizeX: e.target.value})}} onBlur={this.handleSizeChange} />
                </div>
                <div className="w-100 mt-3">
                    <h3 className="text-light">Height:</h3>
                    <input type="text" name="y" value={this.state.sizeY} onChange={(e) => {if(/^[0-9]+$|^$/.test(e.target.value))this.setState({sizeY: e.target.value})}} onBlur={this.handleSizeChange} />
                </div>
                <div className="w-100 mt-3">
                    <WindowComponent 
                        windowContent={
                        <MapTileSelect handleBrushChange={this.props.handleBrushChange}/>
                        }
                        buttonContent={
                        <button className="w-100 bg-dark border-secondary">
                            <h5 className="text-uppercase text-light m-0">Tile Select</h5>
                        </button>
                        }
                        width='800px'
                        height='800px'
                    />
                </div>
                <div className="w-100 row m-0 mt-3">
                    <div className="col-12 p-0">{toolbar}</div>
                    {paintTile}
                    {selectedTile}
                </div>
                <div className="w-100 row m-0 mt-3">
                    <button className="w-100 bg-dark border-secondary">
                        <h5 className="text-uppercase text-light m-0" onClick={this.props.handleTestPlay}>Test Play</h5>
                    </button>
                </div>
            </div>
        )
    }
}
  
export class MapEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: NEW_MAP,
            tool: "select",
            tile: "grass",
            selected: null,
            cursorX: 0, 
            cursorY: 0, 
        };
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleBrushChange = this.handleBrushChange.bind(this);
        this.handleToolChange = this.handleToolChange.bind(this);
        this.handleTileClick = this.handleTileClick.bind(this);
        this.handleTestPlay = this.handleTestPlay.bind(this);
        this.bucketFill = this.bucketFill.bind(this);
    }

    adjustMapSize(size,t){
        let tempMap = Object.assign({}, this.state.map);
        let initSize = parseInt(tempMap.mapSize[t], 10);
        tempMap.mapSize[t] = parseInt(size, 10);
        if(t === 'x'){
            for(let i = 0; i <  tempMap.mapSize.y; i++){
                for(let j = initSize; j < tempMap.mapSize.x; j++){
                    tempMap.mapTiles[i][j] = {tile: TILES.grass, x: j, y: i, events: []};
                }
            }
        }
        else{
            for(let i = initSize; i <  tempMap.mapSize.y; i++){
                tempMap.mapTiles[i] = [];
                for(let j = 0; j < tempMap.mapSize.x; j++){
                    tempMap.mapTiles[i][j] = {tile: TILES.grass, x: j, y: i, events: []};
                }
            }
        }
        this.setState({
            map: tempMap
        })
    }

    handleSizeChange(size, i) {
        if(size > 50)
            size = 50;
        this.adjustMapSize(size,i);
    }

    handleBrushChange(tile) {
        this.setState({
            tile: tile
        })
    }

    handleToolChange(tool) {
        this.setState({
            tool: tool
        })
    }

    bucketFill(pos, tile, keyTile, tempMap){
        if((pos.x < tempMap.mapSize.x && pos.x >= 0) && (pos.y < tempMap.mapSize.y && pos.y >= 0)){
            if(tempMap.mapTiles[pos.y][pos.x].tile === keyTile){
                tempMap.mapTiles[pos.y][pos.x].tile = tile;
                this.bucketFill({x: pos.x + 1, y: pos.y}, tile, keyTile, tempMap);
                this.bucketFill({x: pos.x - 1, y: pos.y}, tile, keyTile, tempMap);
                this.bucketFill({x: pos.x, y: pos.y + 1}, tile, keyTile, tempMap);
                this.bucketFill({x: pos.x, y: pos.y - 1}, tile, keyTile, tempMap);
            }
        }
    }

    handleTileClick(y,x) {
        switch(this.state.tool){
            case "select":
            {
                this.setState({
                    selected: this.state.map.mapTiles[y][x]
                })
                break;
            }

            case "paint":
            {
                let tempMap = Object.assign({}, this.state.map);
                tempMap.mapTiles[y][x].tile = TILES[this.state.tile]
                this.setState({
                    map: tempMap
                })
                break;
            }
            case "dropper":
            {
                this.setState({
                    tile: this.state.map.mapTiles[y][x].tile.name,
                    tool: "paint"
                })
                break;
            }
            case "bucket":
            {
                let tempMap = Object.assign({}, this.state.map);
                if(this.state.map.mapTiles[y][x].tile !== TILES[this.state.tile])
                {
                    let keyTile = tempMap.mapTiles[y][x].tile;
                    this.bucketFill({x: x, y: y}, TILES[this.state.tile], keyTile, tempMap);
                }
                
                // tempMap.mapTiles[y][x].tile = TILES[this.state.tile]
                this.setState({
                    map: tempMap
                })
                break;
            }
        }
    }

    handleTestPlay(){
        this.props.handleTestPlay(this.state.map)
    }

    _onMouseMove(e) {
        this.setState({ cursorX: e.screenX, cursorY: e.screenY });
    }

    render() {
        return (
        <div className="game-window row m-0 p-0" onMouseMove={this._onMouseMove.bind(this)}>
            <MapViewport map={this.state.map} tool={this.state.tool} tile={this.state.tile} handleTileClick={this.handleTileClick} cursorX={this.state.cursorX} cursorY={this.state.cursorY}/>
            <MapSidebar map={this.state.map} handleSizeChange={this.handleSizeChange} handleTestPlay={this.handleTestPlay} handleBrushChange={this.handleBrushChange} handleToolChange={this.handleToolChange} tool={this.state.tool} tile={this.state.tile} selected={this.state.selected}/>
        </div>
        )
    }
}