export function grid(imgUrl, imgUrlLg, photographer, imgAlt = `Photo by ${photographer}`) {
  const container = document.querySelector(".photo-grid");

  // Create div for each photo
  const photoDiv = document.createElement("div");
  photoDiv.className = "photo-thumb";

  // Add a link to go around each photo; href is larger version
  const photoLink = document.createElement("a");
  photoLink.className = "photo-link";
  photoLink.setAttribute("href", imgUrlLg);

  // Create img for each photo
  const photoEl = document.createElement("img");
  photoEl.setAttribute("src", imgUrl);
  photoEl.setAttribute("alt", imgAlt);

  photoLink.appendChild(photoEl);
  photoDiv.appendChild(photoLink);
  container.appendChild(photoDiv);
}
