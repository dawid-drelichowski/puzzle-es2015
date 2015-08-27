import EventAware from 'EventAware';

export default class extends EventAware {
  constructor(draggableCount, elements) {
    super();
    this.draggableCount = draggableCount;
    this.elements = elements;
    this.event.on('dropzone.dropped', this.updateMessage, this);
  }
  updateMessage() {
    const classList = this.elements.done.classList;
    this.draggableCount--;

    if (this.draggableCount === 0) {
      if (classList) {
        this.elements.progress.classList.add('hidden');
        classList.remove('hidden');
      }
      return this;
    }
    this.elements.count.textContent = this.draggableCount;
    return this;
  }
}