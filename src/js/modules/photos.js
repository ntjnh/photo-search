import { grid } from './grid';
import { getPhotoInfo } from './getPhotoInfo';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

export function photos(searchTerm, accessKey) {

  const endpoint = `https://api.unsplash.com/search/photos/?query=${searchTerm}&client_id=${accessKey}`;

  fetch(endpoint, {
    method: 'GET',
    headers: {
      'Accept-Version': 'v1'
    }
  })
    .then(response => response.json())
    .then(data => {

      [...data.results].forEach(result => {

        const photoId = result.id;
        const urlSm = result.urls.small;
        const urlReg = result.urls.regular;
        const alt = result.alt_description;
        const name = result.user.name;

        grid(photoId, urlSm, urlReg, name, alt);
      });
      
      getPhotoInfo(accessKey);

      const photoGrid = document.querySelector(".photo-grid");
      const masonryLayout = new Masonry(photoGrid, {
        itemSelector: '.photo-thumb',
        columnWidth: '.photo-sizer',
        percentPosition: true,
        gutter: 16
      });

      const imgLoad = imagesLoaded(photoGrid);
      imgLoad.on("done", function() {
        masonryLayout.layout();
      });

    })
    .catch(error => console.error('An error occured.', error));
}
