import { useState } from "react";
import { motion } from "framer-motion";
import Forms from "./components/Forms.jsx";
import Devs from "./components/Devs.jsx";
import "./styles/TelaLogin.css";

export default function TelaLogin() {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => setFlipped((f) => !f);

  return (
    <div className="login-container">
      <div className="login-card-wrapper">
        <motion.div
          className={`login-card${flipped ? " flipped" : ""}`}
          animate={{ rotateY: flipped ? 180 : 0 }}
        >
          <div className="login-face">
            <Forms onFlip={handleFlip} />
          </div>
          <div className="login-face back">
            <Devs onFlip={handleFlip} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
