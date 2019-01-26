import React from 'react';
import Axios from 'axios';
import Moment from 'moment';

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
          data: 'a very eal message...',
          username: 'bestUser'
        }
      ],
    }

    this.ws = new WebSocket("ws://localhost:3000/connect")
    this.ws.addEventListener("message", (data) => {
      console.log(data.data);
    })

    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount () {
    Axios.get(`http://localhost:3000/api/room?id=${this.room}`, { responseType: 'json'})
    .then(data => {
      console.log(data)
      let str = String.fromCharCode.apply(String, data);
      console.log(console.log(str))
    })
  }

  addMessage ({ type, data, username }) {
    console.log("Add message")
    this.setState({messages: this.state.messages.concat([{ type, data, username}])}, () =>{
      Axios.post(`http://localhost:3000/api/new?message=${data}&username=${username}&created=${Moment().format("MM:DD:YYYY mm:HH:ss")}&room=home&type=${type}`)
      .then(() => {
        console.log("sending message")
        this.ws.send("helo")
      }).catch(err => console.log(err))
    })
  }

  render() {
    return (
      <div className="main-wrapper">
        <Messages ref={'input'} messages={this.state.messages}/>
        <div className="all-input-wrapper">
          <Input addMessage={this.addMessage} username={this.state.username} room={this.state.room}/>
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