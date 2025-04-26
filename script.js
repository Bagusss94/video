function extractFileId(link) {
  const match = link.match(/\/file\/d\/(.+?)\//);
  return match ? match[1] : null;
}

function openModal(title, gdriveLink) {
  const fileId = extractFileId(gdriveLink);
  const iframeUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  document.getElementById("video-title").innerText = title;

  const playerContainer = document.getElementById("video-player");
  playerContainer.outerHTML = `
      <iframe id="video-player" src="${iframeUrl}" frameborder="0"
        allow="autoplay; encrypted-media" allowfullscreen
        style="width:100%; height:400px; border-radius:10px;">
      </iframe>
    `;

  document.getElementById("player-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("player-modal").classList.add("hidden");
  document.getElementById("video-player").innerHTML = "";
}

window.onload = () => {
  const container = document.getElementById("video-list");
  videoData.forEach((video) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${video.thumbnail}" class="thumbnail" />
        <div class="title">${video.title}</div>
      `;
    card.onclick = () => openModal(video.title, video.gdrive);
    container.appendChild(card);
  });
};
