import React, {Component} from 'react';

class Chatbar extends Component {

  constructor() {
    super();

    this.state = {
      textValue: ''
    };

    this._updateTextValue = this._updateTextValue.bind(this);
    this._keyPress = this._keyPress.bind(this);
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
        <input className="chatbar-message"
               placeholder="Type a message and hit ENTER"
               onChange={this._updateTextValue}
               onKeyDown={this._keyPress} />
      </footer>
    );
  }

  _updateTextValue(e) {
    this.setState({ textValue: e.target.value });
  }

  _keyPress(e){
    if(e.keyCode === 13){
      const counter = this.props.idCount + 1;
      this.props.onEnter(this.state.textValue, counter);
      this.setState({ textValue: '' });
      e.target.value = '';
    }
   }
}
export default Chatbar;