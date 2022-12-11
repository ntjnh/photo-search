export function grid(id, imgUrl, imgUrlLg, photographer, imgAlt) {
  const container = document.querySelector(".photo-grid");

  // Create div for each photo
  const photoDiv = document.createElement("div");
  photoDiv.className = "photo-thumb";

  // Create img for each photo
  const photoEl = document.createElement("img");
  photoEl.setAttribute("src", imgUrl);
  photoEl.setAttribute("data-photo-full", imgUrlLg);
  photoEl.setAttribute("data-photo-id", id);

  if (!imgAlt) {
    photoEl.setAttribute("alt", `Photo by ${photographer}`);
  } else {
    photoEl.setAttribute("alt", imgAlt);
  }

  photoDiv.appendChild(photoEl);
  container.appendChild(photoDiv);
}
