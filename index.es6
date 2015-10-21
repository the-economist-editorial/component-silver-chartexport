import React from 'react';
// import Dthree from 'd3';
export default class SilverChartexport extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      data: React.PropTypes.object.isRequired,
      test: React.PropTypes.string,
    };
  }
  // PROP TYPES ends

  // DEFAULT PROPS
  // By default, data is an empty object
  static get defaultProps() {
    return {
      data: {},
    };
  }
  // DEFAULT PROPS ends

  // CONSTRUCTOR
  // Set default state
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  // CONSTRUCTOR ends

  // *** EVENT CATCHERS ***

  // CATCH DATA CHANGE EVENT
  // Called from render > textarea > change event
  catchDataChangeEvent(event) {
    const data = this.state.data;
    const newData = this.tsvToDataArray(event.target.value);
    data.data = newData.data;
    const mmiObj = this.getScaleMinMaxIncr(0, newData.maxVal, 5);
    data.xDomain = [ 0, mmiObj.max ];
    this.setState({ data });
  }
  // CATCH DATA CHANGE EVENT ends

  // CATCH DATA KEY DOWN EVENT
  // Called from render > textarea > keydown event to
  // pre-empt default tab-insertion and put a tab in data field
  catchDataKeydownEvent(event) {
    if (event.keyCode === 9) {
      const target = event.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      const textBefore = value.substring(0, start);
      const textAfter = value.substring(end);
      // set textarea value to: text before caret + tab + text after caret
      target.value = `${textBefore}\t${textAfter}`;
      // put caret at right position again (add one for the tab)
      target.selectionStart = target.selectionEnd = start + 1;
      // prevent the focus lose
      event.preventDefault();
    }
  }
  // CATCH DATA KEY DOWN EVENT ends

// RENDER
// A note on structure. There's an outermost-wrapper to
// wrap *everything*. Then the mainouter-wrapper holds the main content;
// and there's a sticky footer-wrapper at the bottom...
render() {
  return (
    <div className="silverbullet-export-wrapper">
      <div className="silverbullet-export-button" id="silverbullet-export-png">
        <p onClick={this.pngExportClick.bind(this)}>"Export PNG"</p>
      </div>
    </div>
  );
}
// RENDER ends

}
