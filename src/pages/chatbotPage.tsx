import { useState } from "react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

function ChatbotPage() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! 👋 Ada yang bisa saya bantu terkait informasi akademik?",
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    // tampilkan pesan user
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setInput("");

    try {
      const response = await fetch(
        "http://localhost:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userText,
          }),
        }
      );

      const data = await response.json();

      // tampilkan jawaban bot
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Maaf, terjadi kesalahan saat menghubungi server.",
        },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <div className="chat-header">
        <div className="logo-circle">LOGO</div>

        <div className="header-text">
          <h1>SSC Assistant</h1>
          <p>Tanya Apapun Seputar Akademik!</p>
        </div>

        <button className="admin-btn">
          <IoSettingsSharp />
          Admin
        </button>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        <div className="chat-date">Hari Ini</div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${
              msg.sender === "user" ? "user" : "bot"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="avatar">
                <FaRobot />
              </div>
            )}

            <div>
              <div
                className={`sender-name ${
                  msg.sender === "user"
                    ? "user-name"
                    : ""
                }`}
              >
                {msg.sender === "user"
                  ? "Anda"
                  : "SSC Assistant"}
              </div>

              <div
                className={`message-bubble ${
                  msg.sender === "user"
                    ? "user-bubble"
                    : "bot-bubble"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <input
          type="text"
          placeholder="Ketik pertanyaan Anda..."
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ChatbotPage;