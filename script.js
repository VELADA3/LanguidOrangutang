document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const prompt = document.getElementById("prompt").value;
    const conversationHistory = document.getElementById("conversationHistory").value;
    const resolution = document.getElementById("resolution").value;
    const format = document.getElementById("format").value;
    const theme = document.getElementById("theme").value;

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: conversationHistory + prompt,
        resolution,
        format,
        theme
      })
    });

    if (response.ok) {
      const { imageURL } = await response.json();
      const imgElement = document.getElementById("generatedImage");
      imgElement.src = imageURL;
    } else {
      console.error("Failed to generate image");
    }
  });
});
