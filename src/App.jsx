import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [], // messages coming from the server will be stored here as they arrive
      people: 0,
      color: ''
    };

    this._newMessage = this._newMessage.bind(this);
    this._newName = this._newName.bind(this);
  }

componentDidMount() {
  // Created WebSocket connection
  this.socket = new WebSocket('ws://localhost:3001');
  // Connection opened
  this.socket.onopen = () => {
    console.log('Connected to WebSocket');
  };
  // When server sends a message to client
  // we set states depends on type of message
  this.socket.onmessage = payload => {
    console.log('Got message from server');
    const json = JSON.parse(payload.data);
    switch (json.type) {
      case 'incomingMessage':
        this.setState({
          messages: [...this.state.messages, json]
        });
        break;
      case 'initialMessages':
        this.setState({ messages: json.messages });
        this.setState({ color: json.colorName });
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
  // // Connection closed
  this.socket.onclose = () => {
    console.log('Disconnected from the WebSocket');
  };
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

  // On name changed
  _newName = (nameNew) => {
    // When user has changed his name
    if(nameNew !== this.state.currentUser.name) {
      // If there is an empty name string -
      // current user name will be Anonymous
      if(!nameNew) {
        const nameChanged = {
          type: 'postNotification',
          content: `${this.state.currentUser.name} has changed their name to Anonymous.`
        };
        this.socket.send(JSON.stringify(nameChanged));
        this.setState(prevState => ({
          currentUser: { ...prevState.currentUser, name: 'Anonymous' }
          }))
      } else {
        const nameChanged = {
          type: 'postNotification',
          content: `${this.state.currentUser.name} has changed their name to ${nameNew}.`
        };
      this.socket.send(JSON.stringify(nameChanged));
      this.setState(prevState => ({
        currentUser: { ...prevState.currentUser, name: nameNew }
        }))
      }
    }
    // If new name is equal to old name - nothing happends
  };

  // On new message:
  // sending a new object to server
  _newMessage = (value) => {
    const objectToSend = {
      type: 'postMessage',
      content: value,
      username: this.state.currentUser.name,
      color: this.state.color
    };
    this.socket.send(JSON.stringify(objectToSend));
  };
}


export default App;
