import React from "react";

import styles from "./FaqPage.module.css";

/* async function fetchChatGPT(message) {
  const apiKey = "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";
  const url = "https://api.openai.com/v1/engines/text-davinci-003/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const data = {
    prompt: message,
    max_tokens: 50,
    n: 1,
    stop: "\n",
  };

  try {
    const response = await axios.post(url, data, { headers });
    const completions = response.data.choices;
    const aiResponse = completions[0].text.trim();
    return aiResponse;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
} */

function FaqPage() {
  return (
    <div className={styles.FaqPageContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.messageContainer}>
          <h1 className={styles.message}>La F.A.Q arrive bientôt...</h1>
        </div>
        {/* <div className={styles.chatWindow}>
          {chat.map((message, index) => (
            <div key={index}>
              <p>User: {message.user}</p>
              <p>AI: {message.ai}</p>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button> */}
      </div>
    </div>
  );
}

export default FaqPage;
