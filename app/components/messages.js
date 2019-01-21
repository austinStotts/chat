import React, { PureComponent, Component, forwardRef } from 'react';

const  Messages = forwardRef((props, ref) => {
  return (
    <div>
      {props.messages.map((value) => {
        if(value.type === 'image') {
          return (
            <div>
              <p className="pic-username">{`@${value.username}:`}</p>
              <img src={value.data} alt="error loading image"></img>
            </div>
          )
        }

        else if (value.type === 'text') {
          return (
            <div className="message-wrapper">
              <p className="username">{`@${value.username}:`}</p>
              <p className="message">{value.data}</p>
            </div>
          )
        }
      })}
      <style jsx>{`
        img {
          max-width: 300px;
          max-height: 200px;
          width: auto;
          height: auto;
          display: inline-block;
        }
        .username {
          font-family: 'Roboto', sans-serif;
          display: inline-block;
          margin: 0px 0px 0px 0px;
          padding: 0%;
          color: gray;
        }
        .message {
          font-family: 'Roboto', sans-serif;
          display: inline-block;
          margin: 0px 0px 0px 10px;
          font-size: 18px;
        }
        .message-wrapper {
          margin: 1px 0px 1px 0px;
          padding: 0%;
        }
        .pic-username {
          font-family: 'Roboto', sans-serif;
          margin: 0px 0px 2px 0px;
          padding: 0%;
          color: gray;
        }
      `}</style>
    </div>
  )
})

export default Messages;
