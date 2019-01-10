import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [], // messages coming from the server will be stored here as they arrive
      people: 0
    };

    this._newMessage = this._newMessage.bind(this);
    this._newName = this._newName.bind(this);
  }

componentDidMount() {

  this.socket = new WebSocket('ws://localhost:3001');

  this.socket.onopen = peopload => {
    console.log('Connected to WebSocket');
  };

  this.socket.onmessage = payload => {
    console.log('Got message from server', payload);
    const json = JSON.parse(payload.data);
    switch (json.type) {
      case 'incomingMessage':
        this.setState({
          messages: [...this.state.messages, json]
        });
        break;
      case 'initialMessages':
        this.setState({ messages: json.messages });
        break;
      case 'incomingNotification':
        this.setState({
          messages: [...this.state.messages, json]
        });
        break;
      case 'userConnected':
        this.setState({ people: json.people });
        break;
      case 'userDisconnected':
        this.setState({ people: json.people });
        break;
      default:
    }
  };

  this.socket.onclose = () => {
    console.log('Disconnected from the WebSocket');
  };

  // console.log("componentDidMount <App />");
  // setTimeout(() => {
  //   console.log("Simulating incoming message");
  //   // Add a new message to the list of messages in the data store
  //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //   const messages = this.state.messages.concat(newMessage)
  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages})
  // }, 3000);
}

  render() {
    const currentUser = this.state.currentUser;
    const messagesAll = this.state.messages;
    const numberOfPeople = this.state.people;

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="navbar-user">{numberOfPeople} users online</div>
        </nav>
        <MessageList messagesAll={messagesAll}/>
        <Chatbar newName={this._newName} onEnter={this._newMessage} currentUser={currentUser} />
      </div>
    );
  }

  _newName = (nameNew) => {
    if(nameNew !== this.state.currentUser.name) {
      const nameChanged = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} has changed their name to ${nameNew}.`
    };
    this.socket.send(JSON.stringify(nameChanged));
    this.setState(prevState => ({
      currentUser: { ...prevState.currentUser, name: nameNew }
      }))
    }
  };

  _newMessage = (value) => {
    const objectToSend = {
      type: 'postMessage',
      content: value,
      username: this.state.currentUser.name
    };
    this.socket.send(JSON.stringify(objectToSend));
  };
}


export default App;
