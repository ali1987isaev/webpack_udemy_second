const list = [
  {
    title: 'hello-page',
    url: 'hello-page'
  },
  {
    title: 'image page',
    url: 'image-new-page'
  }
];

export default class TheHeader {
  render() {
    const listItems = list.map(listItem => (`
      <li><a href=${listItem.url}>${listItem.title}</a></li>
    `));

    const ul = document.createElement('ul');
    ul.innerHTML = listItems.join('')
    document.querySelector('body').appendChild(ul)
  }
}