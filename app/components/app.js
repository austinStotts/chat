import React from 'react';
import Input from './input';
import Image from './image';
import Messages from './messages';
import Room from './room';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: 'austin',
      room: 'home',
      messages: [
        {
          type:'text',
          data: 'a very real message...',
          username: 'bestUser'
        }
      ],
    }

    this.addMessage = this.addMessage.bind(this);
  }

  addMessage ({ type, data, username }) {
    this.setState({messages: this.state.messages.concat([{ type, data, username }])})
  }

  render() {
    return (
      <div className="main-wrapper">
        <Messages ref={'input'} messages={this.state.messages}/>
        <div className="all-input-wrapper">
          <Input addMessage={this.addMessage} username={this.state.username}/>
          <Room />
          <Image addMessage={this.addMessage} username={this.state.username}/>
        </div>
        <style className="style" jsx>{`
          .all-input-wrapper {
            width: 100%;
            position: fixed;
            bottom:20px;
          }
          .main-wrapper {
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default App;