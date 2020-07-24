export default class ModalComponent {
  constructor(element) {
    this.element = element;
  }

  get folderName() {return this.element.$('span').getText();}
}
