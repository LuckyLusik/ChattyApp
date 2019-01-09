import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messagesAll = this.props.messagesAll
    const messageList = messagesAll.map((message) => {
      return <Message key={message.id} messAll={message}/>
    });

    return (
        <main className="messages">
          {messageList}
          <div className="message system">
            Anonymous1 changed their name to nomnom.
          </div>
        </main>
    );
  }
}
export default MessageList;

// state.messages = [
//   {
//     type: "incomingMessage",
//     content: "I won't be impressed with technology until I can download food.",
//     username: "Anonymous1"
//   },
//   {
//     type: "incomingNotification",
//     content: "Anonymous1 changed their name to nomnom",
//   },
//   {
//     type: "incomingMessage",
//     content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
//     username: "Anonymous2"
//   },
//   {
//     type: "incomingMessage",
//     content: "...",
//     username: "nomnom"
//   },
//   {
//     type: "incomingMessage",
//     content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
//     username: "Anonymous2"
//   },
//   {
//     type: "incomingMessage",
//     content: "This isn't funny. You're not funny",
//     username: "nomnom"
//   },
//   {
//     type: "incomingNotification",
//     content: "Anonymous2 changed their name to NotFunny",
//   },
// ]