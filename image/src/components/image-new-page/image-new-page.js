import ImagePage from '../image-page/image-page.js';
import Heading from '../heading/heading.js';

export default class ImageNewPage {
  render() {
    const heading = new Heading();
    const image = new ImagePage();
    heading.render('image');
    image.render();
  }
};
