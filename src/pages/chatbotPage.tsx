import { FaPaperPlane, FaRobot } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

function ChatbotPage() {
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

        {/* Bot Message */}
        <div className="message-row bot">
          <div className="avatar">
            <FaRobot />
          </div>

          <div>
            <div className="sender-name">SSC Assistant</div>

            <div className="message-bubble bot-bubble">
              Halo! 👋
              <br />
              Ada yang bisa saya bantu terkait informasi akademik?
            </div>
          </div>
        </div>

        {/* User Message */}
        <div className="message-row user">
          <div className="message-wrapper">
            <div className="sender-name user-name">Anda</div>

            <div className="message-bubble user-bubble">
              Bagaimana prosedur pengajuan cuti?
            </div>
          </div>
        </div>

        {/* Bot Message */}
        <div className="message-row bot">
          <div className="avatar">
            <FaRobot />
          </div>

          <div>
            <div className="sender-name">SSC Assistant</div>

            <div className="message-bubble bot-bubble">
              Untuk pengajuan cuti akademik, mahasiswa dapat mengikuti
              prosedur sesuai pedoman akademik yang berlaku.
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="input-area">
        <input
          type="text"
          placeholder="Ketik pertanyaan Anda..."
        />

        <button>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ChatbotPage;