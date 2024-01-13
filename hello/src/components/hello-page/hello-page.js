import HelloButton from '../hello-button/hello-button.js';
import Heading from '../heading/heading.js'

export default class HelloPage {
  render() {
    const helloButton = new HelloButton();
    const heading = new Heading();
    heading.render('hello');
    helloButton.render();
  }
};
