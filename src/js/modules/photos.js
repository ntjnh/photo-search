import { grid } from './grid';
import { getPhotoInfo } from './getPhotoInfo';

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
    })
    .catch(error => console.error('An error occured.', error));
}
