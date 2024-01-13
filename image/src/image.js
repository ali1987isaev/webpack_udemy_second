import ImagePage from './components/image-page/image-page.js';
import Heading from './components/heading/heading.js';

const heading = new Heading();
const image = new ImagePage();

heading.render('image');
image.render();

// use exposes components from another running app
// import('HelloApp/HelloButton').then(HelloButtonModule => {
//   const HelloButton = HelloButtonModule.default;
//   const helloButton = new HelloButton();
//   helloButton.render();
// });