import { photos } from './photos';

export function search(accessKey) {
  const form = document.getElementById("search");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Remove old results
    const oldResults = document.querySelectorAll(".photo-thumb");
    for (const result of [...oldResults]) {
      result.remove();
    }

    const searchTerm = e.target.children[0].value;

    // Search for photos
    photos(searchTerm, accessKey);

    // Clear the form after the search
    e.target.children[0].value = "";
  });
}
