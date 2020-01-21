import React from 'react';
import ReactDOM from 'react-dom';

class Window extends React.Component{
    constructor(props)
    {
      super(props);
      this.hide= this.hide.bind(this);
      this.state = {visible:false};
    }
  
    render()
    {
      let {state} = this;
        
      let visibility = state.visible === true ? "on" : "off";
        
      let classNames = {};
        
      classNames[visibility] = true;
        
      return (
        <div id="window" className={Object.keys(classNames).join(" ")}>
          <div className="w-100 h-100" style={{ background: '#222222c9' }} onClick={this.hide}></div>
          <div className="position-absolute d-flex flex-column" style={{width:'800px', height:'500px'}}>
            {this.props.content}
          </div>
        </div>
      );
    }
    componentDidMount()
    {
        
    }
    componentWillUnmount()
    {
        
    }
    show()
    {
      this.setState({visible:true})
    }
  
    hide()
    {
      this.setState({visible:false})
    }
}
  
class WindowButton extends React.Component{
    events = {}
    constructor(props)
    {
        super(props);
      
      this.events.onWindowOpen = props.onWindowOpen;
    }
    render(){
      return(
        <div className="w-100 h-100" onClick={this.events.onWindowOpen}>
          {this.props.content}
        </div>
      )
    }
}
  
export class WindowComponent extends React.Component{
    constructor(props)
    {
      super(props);
      
      this.setupEvents();
      this.setupRefs();
    }
  
    setupRefs()
    {
        this.window = React.createRef();
    }
  
    setupEvents()
    {
        this.handleOnWindowOpen = this.handleOnWindowOpen.bind(this);
      this.handleOnWindowClose = this.handleOnWindowClose.bind(this);
    }
  
    handleOnWindowClose(event)
    {
        this.window.current.hide();
    }
  
    handleOnWindowOpen(event)
    {
      this.window.current.show();
    }
  
    render(){
      return(
        <div className="w-100 h-100">
          <WindowButton content={this.props.buttonContent} onWindowOpen={this.handleOnWindowOpen}/>
          <Window content={this.props.windowContent} width={this.props.width} height={this.props.height} ref={this.window}/>
        </div>
      )
    }
}