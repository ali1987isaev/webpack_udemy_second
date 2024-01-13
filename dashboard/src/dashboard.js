import TheHeader from './compenents/header/header.js'

const url = window.location.pathname;
const theHeader = new TheHeader();
theHeader.render();

if (url === '/hello-page') {
  import('HelloApp/HelloPage').then(HelloPageModule => {
    const HelloPage = HelloPageModule.default;
    const helloPage = new HelloPage();
    helloPage.render();
  });
};

if (url === '/image-new-page') {
  import('ImageApp/ImageNewPage').then(ImageNewPageModule => {
    const ImageNewPage = ImageNewPageModule.default;
    const imageNewPage = new ImageNewPage();
    imageNewPage.render();
  });
};

console.log('dashboard')
