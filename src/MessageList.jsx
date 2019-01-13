import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messagesAll = this.props.messagesAll;
    const messageList = messagesAll.map((message) => {
      return <Message key={message.id} messAll={message} />
    });

    return (
        <main className="messages">
          {messageList}
        </main>
    );
  }
}
export default MessageList;
