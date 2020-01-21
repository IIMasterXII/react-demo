import React from 'react';
import ReactDOM from 'react-dom';
//ToolTip Component
//---------------------------------------------------------------------------------

class ToolTip extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.state = {visible:false, x:0, y:0, type:"none"};
  }

  render()
  {
    let {state} = this;
      
    let visibility = state.visible === true ? "on" : "off";
      
    let style = {
      left: ((state.x) + 'px'),
      top: ((state.y) + 'px')
    };
      
    let classNames = {};
      
    if(state.type != null && state.type !== "none")
    {
      classNames[state.type] = true;
    }
      
    classNames[visibility] = true;
      
    return (
      <div id="tooltip" className={Object.keys(classNames).join(" ")} style={style}>
        <div className="bg-dark border border-secondary p-2 text-light">{this.props.ttInnerContent}</div>
      </div>
    );
  }
  componentDidMount()
  {
  	
  }
  componentWillUnmount()
  {
  	
  }
  show(hoverRect)
  {
    let {pastShow} = this;
  
    // setState will execute the pastShow with hoverRect as the tool tip becomes visible
    this.setState({visible:true}, pastShow.bind(this, hoverRect))
  }
  hide()
  {
    this.setState({visible:false})
  }
  pastShow(hoverRect)
{
  // position the tooltip after showing it
  let ttNode = ReactDOM.findDOMNode(this);

  if(ttNode != null)
  {
    let x = 0, y = 0;

    const docWidth = document.documentElement.clientWidth,
          docHeight = document.documentElement.clientHeight;

    // tool tip rectangel
    let ttRect = ttNode.getBoundingClientRect();

    let bRight = ((hoverRect.x + hoverRect.width + ttRect.width) <= (window.scrollX + docWidth)) && ((hoverRect.y + ttRect.height) <= (window.scrollY + docHeight));
    let bLeft = ((hoverRect.x - ttRect.width) >= 0) && ((hoverRect.y + ttRect.height) <= (window.scrollY + docHeight));
    let bAbove = (hoverRect.y - ttRect.height) >= 0;
    let bBellow = (hoverRect.y + hoverRect.height + ttRect.height) <= (window.scrollY + docHeight);

    let newState = {};

    // the tooltip doesn't fit to the right
    if(bRight)
    {
      x = hoverRect.width;

      y = (-ttRect.height + hoverRect.height)/2;

      newState.type = "right";
    }
    else if(bLeft)
    {
      x = 0 - ttRect.width;

      y = (-ttRect.height + hoverRect.height)/2;

      newState.type = "left";
    }
    else if(bBellow)
    {
      y = hoverRect.height;

      x = 0 - (ttRect.width - hoverRect.width)/2;

      newState.type = "bottom";
    }
    else if(bAbove)
    {
      y = 0 - ttRect.height;

      x = 0 - (ttRect.width - hoverRect.width)/2;

      newState.type = "top";
    }
    newState = {...newState, x:x, y:y};

    this.setState(newState);
  }
}
}

class ToolTipButton extends React.Component {
	events = {}
	constructor(props)
  {
	  super(props);
    
    this.events.onMouseOver = props.onMouseOver;
    this.events.onMouseOut = props.onMouseOut;
    this.events.onDragStart = props.onDragStart;
  }
  render()
  {
  	return <div className="w-100 h-100 tooltip-button" onDragStart={this.events.onDragStart} onMouseOver={this.events.onMouseOver} onMouseOut={this.events.onMouseOut}>{this.props.ttContent}</div>
  }
}

export class ToolTipComponent extends React.Component {
  constructor(props)
  {
    super(props);
    
    this.setupRefs();
    
    this.setupEvents();

    this.state = {
      timer: null
    }
  }

  setupRefs()
  {
  	this.toolTip = React.createRef();
  }
  setupEvents()
  {
  	this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    this.handleOnDragStart = this.handleOnDragStart.bind(this);
  }
  handleOnMouseOut(event)
  {
    clearTimeout(this.state.timer);
  	this.toolTip.current.hide();
  }
  handleOnMouseOver(event)
  {
  	// get hovered element reference
  	let element = event.currentTarget;
    
    if(element != null)
    {
      let rect = element.getBoundingClientRect();
      this.setState({
        timer: setTimeout(() => this.toolTip.current.show(rect), 700)
      });
    }
  }
  handleOnDragStart(event)
  {
    clearTimeout(this.state.timer);
  	this.toolTip.current.hide();
  }

  render()
  {
    return <div className="w-100 h-100 d-flex position-relative">
      <ToolTipButton ttContent={this.props.ttContent} onDragStart={this.handleOnDragStart} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}/>
      <ToolTip ttInnerContent={this.props.ttInnerContent} ref={this.toolTip} />
    </div>;
	}
  componentDidMount()
  {
  }
}