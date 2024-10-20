const apiUrl = "https://emoji-api.com/emojis";
const apiKey = "826513442054a9c19588c4fe0ee02f82dab8b8e7"; // Replace with your emoji API key

document.getElementById("search").addEventListener("input", function () {
  const query = this.value.trim();
  if (query.length > 0) {
    fetchEmojis(query);
  } else {
    document.getElementById("emojiList").innerHTML = "";
  }
});

async function fetchEmojis(query) {
  const url = `${apiUrl}?search=${query}&access_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const emojis = await response.json();
    displayEmojis(emojis);
  } catch (error) {
    console.error("Error fetching emojis:", error);
  }
}

function displayEmojis(emojis) {
  const emojiList = document.getElementById("emojiList");
  emojiList.innerHTML = "";
  emojis.forEach((emoji) => {
    const emojiElement = document.createElement("span");
    emojiElement.classList.add("emoji");
    emojiElement.textContent = emoji.character;
    emojiElement.addEventListener("click", () =>
      copyToClipboard(emoji.character)
    );
    emojiList.appendChild(emojiElement);
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Emoji copied to clipboard!");
  });
}
