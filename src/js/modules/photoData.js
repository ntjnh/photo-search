export function photoData(key, photoId) {

  const photoInfo = `https://api.unsplash.com/photos/${photoId}/?client_id=${key}`;

  fetch(photoInfo, {
    method: 'GET',
    headers: {
      'Accept-Version': 'v1'
    }
  })
    .then(response => response.json())
    .then(data => {
      const {
        alt_description: alt,
        urls: {
          regular: urlReg,
        },
        links: {
          html: photoLink
        },
        likes,
        user: {
          username,
          name,
          links: {
            html: profile
          },
          profile_image: {
            large: profilePic
          }
        },
        location: {
          name: location
        },
        views,
        downloads
      } = data;

      const photoEl = document.querySelector(".photo");
      photoEl.setAttribute("src", urlReg);
      photoEl.setAttribute("alt", alt);

      if (location) {
        document.querySelector(".photo-location").textContent = location;
      } else {
        document.querySelector(".photo-location").style.display = "none";
      }

      document.querySelector(".photographer img").setAttribute("src", profilePic);
      document.querySelector(".photographer .name span").textContent = name;
      document.querySelector(".photographer .username a").textContent = `@${username}`;
      document.querySelector(".photographer .username a").setAttribute("href", profile);
      document.querySelector(".photographer .username a").setAttribute("target", "_blank");
      document.querySelector(".stats .likes span").textContent = likes.toLocaleString();
      document.querySelector(".stats .views span").textContent = views.toLocaleString();
      document.querySelector(".stats .downloads span").textContent = downloads.toLocaleString();
      document.querySelector(".download a").setAttribute("href", photoLink);
      document.querySelector(".download a").setAttribute("target", "_blank");
    })
    .catch(error => console.error('An error occured while retrieving photo information.', error));
}
