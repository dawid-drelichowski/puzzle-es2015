import EventAware from 'EventAware';

export default class extends EventAware {
  constructor(element) {
    super();
    this.currentDraggable = 0;

    this.event.on('draggable.current', this.setCurrentDraggable, this);
    element.addEventListener('dragover', (event) => {
      this.over(event);
    }, false);
    element.addEventListener('drop', (event) => {
      this.drop(event);
    }, false);
  }
  setCurrentDraggable(field) {
    this.currentDraggable = field;
  }
  over(event) {
    if (this.currentDraggable === event.target.getAttribute('data-valid')) {
      event.preventDefault();
    }
  }
  drop(event) {
    const target = event.target;
    let element;

    if (this.currentDraggable === target.getAttribute('data-valid')) {
      event.preventDefault();
      element = document.querySelector(`[data-field="${this.currentDraggable}"]`);
      target.appendChild(element);
      element.removeAttribute('draggable');
      this.event.trigger('dropzone.dropped');
    }
  }
}
