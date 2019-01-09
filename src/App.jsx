import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ],
      currentUser: {name: "Bob"},

      idCounter: 3
    };

    this._newMessage = this._newMessage.bind(this);
  }

componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  render() {
    const currentUser = this.state.currentUser;
    const messagesAll = this.state.messages;
    const idCount = this.state.idCounter;
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messagesAll={messagesAll}/>
        <Chatbar idCount={idCount} onEnter={this._newMessage} currentUser={currentUser} />
      </div>
    );
  }

  _newMessage = (value, count) => {
    this.setState({ messages: [...this.state.messages,
      { id: count, username: "Bob", content: value }], idCounter: count });
  };
}


export default App;
