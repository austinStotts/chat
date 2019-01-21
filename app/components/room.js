import React, { PureComponent, Component } from 'react';

class Room extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      room: ''
    }
  }

  handleKey (key) {
    if(key === 'Enter') {
      this.setRoom();
    }
  }

  changeRoom (room) {
    this.setState({ room })
  }

  setRoom () {
    this.props.setRoom(this.state.room);
  }

  render () {
    return (
      <div className="room-wrapper">
        <input 
          type="text"
          className="room-input"
          placeholder="pick a room"
          defaultValue="home"
          onKeyDown={(e) => {this.setRoom(e.key)}}
        >
        </input>
        <button 
          className="join-btn"
          onClick={this.setRoom}
        >
        {'Join'}
        </button>
        <style jsx>{`
          .room-wrapper {
            display: inline-block;
            margin-right: 10px;
          }
          .room-input {
            border: 1px solid black;
            border-radius: 3px;
            padding: 3px 4px 3px 4px;
            outline: none;
          }
        `}</style>
      </div>
    )
  }
}

export default Room;
