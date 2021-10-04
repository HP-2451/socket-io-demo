import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
const socket = io("http://localhost:4000", { transports: ["websocket"] });

function App() {
  const { TextArea } = Input;
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx

      socket.on("send-message", (message) => {
        console.log("sevrer-msg", message);
        setMessage(message);
      });
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    socket.emit("message", e.target.value, room);
    setMessage(e.target.value);
  };

  const createRoom = () => {
    socket.emit('join-room', room)
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="join-room">
          <Button type="primary" onClick={() => setShowTextArea(!showTextArea)}>
            Text
          </Button>
          <div className="room-container">
            <div className="input-content">
              <Input placeholder="Enter room name" value={room}  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}/>
            </div>
            <Button
              type="primary"
              onClick={createRoom}
            >
              Join Room
            </Button>
          </div>
        </div>

        <div className="textarea-container">
          {showTextArea && (
            <TextArea
              rows={10}
              cols={40}
              placeholder="Enter text..."
              value={message}
              onChange={handleChange}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
