import React, { PureComponent, Component, Fragment } from 'react';

class Image extends PureComponent {
  constructor (props) {
    super(props);
  }

  changeImage (file) {
    let reader = new FileReader();
    const send = (data) => {
      this.props.addMessage({ type:'image', data, username: this.props.username})
    }
    reader.onload = function (file) {
      send(file.target.result);
    }
    reader.readAsDataURL(file);
  }

  render () {
    return (
      <div className="image-wrapper">
        <input className="input" type="file" onInput={(e) => {this.changeImage(e.target.files[0])}}></input>
        <style jsx>{`
          .input {
            color: transparent;
            outline: none;
          }
          .input::before {
            cursor: pointer;
            color: black;
            content: 'choose photo';
            display: inline-block;
            border: 1px solid black;
            padding: 3px 4px 3px 4px;
            border-radius: 3px;
            outline: none;
            cursor: pointer;
            margin: 6px 0px 2px 0px;
          }
          .input::-webkit-file-upload-button {
            visibility: hidden;
            outline: none;
          }
          .image-wrapper {
            padding: 0%;
            outline: none;
            display: inline-block;
          }
        `}</style>
      </div>
    )
  }
}

export default Image;
