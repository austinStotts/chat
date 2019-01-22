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
    if(this.state.text === '') return;
    if(key === 'Enter') {
      this.props.addMessage(
        {type:'text', data:this.state.text, username: this.props.username}
      )
      this.refs.input.value = '';
      this.setState({text: ''})
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
        <div className="btn-text-wrapper">
          <button className="text-button" onClick={() => this.handleKey('Enter')}>{'send'}</button>
        </div>
        <style jsx>{`
          .input-wrapper {
            display: inline-block;
            border: 1px solid black;
            width: 92%;
            border-radius: 5px;
            margin-left: 2%;
            margin-right: 3%;
          }
          .text-input {
            display: inline-block;
            font-size: 16px;
            color: black;
            width: 90%;
            border: none;
            outline: none;
            font-family: 'Roboto', sans-serif;
            padding: 3px 0px 3px 5px;
            margin-left: 4px;
          }
          .text-button {
            width: 100%;
            border: none;
            height: 100%;
            display: inline-block;
            font-size: 1rem;
            outline: none;
            cursor: pointer;
            min-width: 50px;
            padding: 3px 0px 4px 0px;
            border-radius: 0px 4px 4px 0px;
            border-left: 1px solid black;
            transition-duration: 0.5s;
          }
          .btn-text-wrapper {
            margin: 0%;
            padding: 0%;
            display: inline-block;
            float: right;
            width: 9%;
          }
          .text-button:hover {
            background-color: #0074D9;
            color: white;
          }
        `}</style>
      </div>
    )
  }
}

export default Input;
