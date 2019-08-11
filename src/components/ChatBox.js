import React from "react";
import styles from "./styles/ChatBox.module.scss";

import SocketContext from "../contexts/socket";

export default function ChatBox() {
  const { socket } = React.useContext(SocketContext);
  const [chat, setChat] = React.useState([]);
  const chatBoxRef = React.useRef();
  const textRef = React.useRef();

  React.useEffect(() => {
    if (socket === null) return;

    socket.on("message", ({ sender, timestamp, message }) => {
      setChat((chat) => {
        const parsed = {
          time: new Date(timestamp).toLocaleTimeString(),
          sender,
          message,
        };
        return [...chat, parsed];
      });
    });
  }, [socket]);

  // Scroll to the bottom of the chat box when new chat is received
  React.useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chat, chatBoxRef]);

  /** Allow submitting chat with the 'enter' key */
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (socket === null) return;
    const message = textRef.current.value;
    if (message.trim().length >= 1) {
      socket.emit("chat", textRef.current.value);
      textRef.current.value = "";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div ref={chatBoxRef} className={styles.chatBox}>
        {chat.map(({ time, sender, message }, index) => (
          <div
            key={sender + index}
            className={
              sender === "[SYSTEM]"
                ? styles.systemMessage
                : sender === "You"
                ? ""
                : styles.otherMessage
            }
          >
            <span className={styles.time}>{time}</span>
            <span>{sender}:</span>
            <span>{message}</span>
          </div>
        ))}
      </div>
      <textarea
        className={styles.textInput}
        ref={textRef}
        onKeyDown={handleKeyPress}
        placeholder="Say something ..."
      />
    </div>
  );
}
