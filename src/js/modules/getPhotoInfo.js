import { photoData } from './photoData'

export function getPhotoInfo(key) {
  const photos = document.querySelectorAll(".photo-thumb");

  for (let i = 0; i < photos.length; i++) {
    photos[i].addEventListener("click", function(e) {  
      const id = e.target.dataset.photoId;
      const body = document.getElementsByTagName("body")[0];
      const photoPanel = document.querySelector(".photo-details");
      const photoPanelContent = document.querySelector(".photo-details .content");
  
      photoData(key, id);

      photoPanel.style.display = "block";
      photoPanelContent.classList.remove("slide-out");
      photoPanelContent.classList.add("slide-in");
      body.style.overflow = "hidden";
    });
  }
}
