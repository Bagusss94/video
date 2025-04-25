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
      <div id="video-player" class="iframe-wrapper">
        <iframe src="${iframeUrl}" frameborder="0"
          allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>
      </div>
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
