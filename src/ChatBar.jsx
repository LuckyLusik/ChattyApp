import React, {Component} from 'react';

class Chatbar extends Component {

  constructor() {
    super();
    this.state = {
      textValue: ''
    };

    this._updateTextValue = this._updateTextValue.bind(this);
    this._keyPress = this._keyPress.bind(this);
    this._nameNew = this._nameNew.bind(this);
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyDown={this._nameNew} defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
        <input className="chatbar-message"
               placeholder="Type a message and hit ENTER"
               onChange={this._updateTextValue}
               onKeyDown={this._keyPress}
               ref = "msg"/>
      </footer>
    );
  }

  // On input change - update a state of message content
  _updateTextValue(e) {
    this.setState({ textValue: e.target.value });
  }

  // On name change
  _nameNew = (e) => {
    // If Enter key was pressed
    if(e.keyCode === 13){
      this.props.newName(e.target.value);
      // Input with refs "msg" will be in focus
      this.refs["msg"].focus();
    }
   }

   // If Enter key was pressed -
   // update a state of message and clear input
  _keyPress(e){
    if(e.keyCode === 13){
      this.props.onEnter(this.state.textValue);
      this.setState({ textValue: '' });
      e.target.value = '';
    }
   }
}
export default Chatbar;