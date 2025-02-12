const handleAsk = async () => {
    if (!question) return;
  
    try {
      const res = await fetch("http://localhost:3001/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      });
  
      const data = await res.json();
      setResponse(data.results.map(item => `${item.name}: ${item.description}`).join("\n"));
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Feil ved henting av produktdata.");
    }
  };