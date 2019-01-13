import React, {Component} from 'react';

  // Display a message when user's name has been changed
  function NameChanged(props) {
    return (<div className="message system">
              {props.check.content}
            </div>);
  }

  // Regular message with colored user's name
  function NameNotChanged(props) {
    return (
      <div className="message">
        <span style={ { color: props.check.color } } className="message-username">{props.check.username}</span>
        <span className="message-content">{props.check.content}</span>
      </div>
    );
  }

  // Displaying a message depending on a message type
  function NameChecking(props) {
    if(props.name.type === 'incomingNotification') {
      return <NameChanged check={props.name}/>;
    }
    return <NameNotChanged check={props.name}/>;
  }

class Message extends Component {
  render() {
    return <NameChecking name={this.props.messAll} />;
  }
}
export default Message;