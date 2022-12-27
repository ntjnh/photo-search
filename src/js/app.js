import key from './keez';
import { search } from './modules/search';

const accessKey = key.access;
search(accessKey);

const closeModal = document.querySelector(".close");
closeModal.addEventListener("click", function() {
  const body = document.getElementsByTagName("body")[0];
  const photoPanel = document.querySelector(".photo-details");
  const photoPanelContent = document.querySelector(".photo-details .content");

  body.style.overflow = "auto";
  photoPanelContent.classList.remove("slide-in");
  photoPanelContent.classList.add("slide-out");

  photoPanelContent.addEventListener("animationend", function(e) {

    if (e.animationName == "modalSlideOut") {
      photoPanel.style.display = "none";
    }

  });
});
