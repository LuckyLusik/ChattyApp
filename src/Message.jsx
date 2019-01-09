import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.messAll.username}</span>
        <span className="message-content">{this.props.messAll.content}</span>
      </div>
    );
  }
}
export default Message;