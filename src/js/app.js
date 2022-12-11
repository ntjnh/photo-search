import key from './keez';
import { search } from './modules/search';

const accessKey = key.access;
search(accessKey);


document.querySelector(".close").addEventListener("click", function() {
  const body = document.getElementsByTagName("body")[0];
  const photoPanel = document.querySelector(".photo-details");

  body.style.overflow = "auto";
  photoPanel.style.display = "none";
});
