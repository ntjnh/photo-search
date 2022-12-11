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
        width,
        height,
        blur_hash: blurHash,
        description,
        alt_description: alt,
        urls: {
          regular: urlReg,
          full: urlFull,
        },
        links: {
          html: photoLink,
          download_location: download
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

      // let orientation;

      // if (width > height) {
      //   orientation = 'landscape';
      // } else {
      //   orientation = 'portrait';
      // }

      const photoEl = document.querySelector(".photo");
      photoEl.setAttribute("src", urlReg);
      photoEl.setAttribute("alt", alt);

      const descriptionEl = document.querySelector(".description");
      descriptionEl.textContent = description ? description : "No description provided.";
      document.querySelector(".photo-location").textContent = location;

      document.querySelector(".photographer img").setAttribute("src", profilePic);
      document.querySelector(".photographer-info .name").textContent = name;
      document.querySelector(".photographer-info .username a").textContent = `@${username}`;
      document.querySelector(".photographer-info .username a").setAttribute("href", profile);
      document.querySelector(".photographer-info .username a").setAttribute("target", "_blank");
      document.querySelector(".stats .likes").innerHTML = `<span style="font-weight:600;">Likes:</span> ${likes}`;
      document.querySelector(".stats .views").innerHTML = `<span style="font-weight:600;">Views:</span> ${views}`;
      document.querySelector(".stats .downloads").innerHTML = `<span style="font-weight:600;">Downloads:</span> ${downloads}`;
      document.querySelector(".download a").setAttribute("href", photoLink);
      document.querySelector(".download a").setAttribute("target", "_blank");

    })
    .catch(error => console.error('An error occured while retrieving photo information.', error));
}
