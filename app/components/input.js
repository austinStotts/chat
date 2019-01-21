import React, { PureComponent, Component, Fragment } from 'react';

class Input extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  changeText (text) {
    this.setState({ text });
  }

  handleKey (key) {
    if(key === 'Enter') {
      this.props.addMessage(
        {type:'text', data:this.state.text, username: this.props.username}
      )
      this.refs.input.value = '';
    }
  }



  render () {
    return (
      <div className="input-wrapper" onKeyDown={(e) => this.handleKey(e.key)}>
        <input 
          className="text-input"
          ref='input'
          placeholder={'@'+this.props.username} 
          onChange={(e) => this.changeText(e.currentTarget.value)} 
          type="text"
        >
        </input>
        <button className="text-button" onClick={() => this.handleKey('Enter')}>{'send'}</button>
        <style jsx>{`
          .input-wrapper {
            display: inline-block;
            border: 1px solid black;
            width: 95%;
            border-radius: 5px;
            padding: 3px 0px 3px 4px;
          }
          .text-input {
            display: inline-block;
            font-size: 16px;
            color: black;
            width: 90%;
            border: none;
            outline: none;
            margin-left: auto;
            font-family: 'Roboto', sans-serif;
          }
          .text-button {
            right:0px;
            width: 9%;
            border: none;
            height: 100%;
            display: inline-block;
            font-size: 1rem;
            outline: none;
            border-left: 2px solid black;
            cursor: pointer;
            min-width: 50px;
            margin-right: auto;
          }
        `}</style>
      </div>
    )
  }
}

export default Input;
