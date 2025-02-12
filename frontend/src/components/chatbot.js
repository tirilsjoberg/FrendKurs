import { useState } from "react";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    if (!question) return;

    try {
      const res = await fetch("http://localhost:3001/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setResponse(data.answer);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Feil ved henting av svar.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", textAlign: "center" }}>
      <h1>Chatbot</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Skriv inn ditt spørsmål..."
        style={{ width: "80%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleAsk} style={{ padding: "10px 15px" }}>
        Spør
      </button>
      <div style={{ marginTop: "20px", padding: "10px", background: "#f3f3f3", minHeight: "50px" }}>
        <strong>Svar:</strong> {response}
      </div>
    </div>
  );
};

export default Chatbot;