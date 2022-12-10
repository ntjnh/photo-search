import { grid } from './grid';

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

        const urlSm = result.urls.small;
        const urlReg = result.urls.regular;
        const alt = result.alt_description;
        const name = result.user.name;

        grid(urlSm, urlReg, name, alt);
      });

    })
    .catch(error => console.error('An error occured.', error));
}
