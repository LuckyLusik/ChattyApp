import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Message from './Message.jsx';
// import Messagelist from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <body>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Message />
        <Chatbar />
      </body>
    );
  }
}
export default App;
