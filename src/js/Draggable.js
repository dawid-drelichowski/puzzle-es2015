import EventAware from 'EventAware';

export default class extends EventAware {
  constructor(element) {
    super();
    element.addEventListener('dragstart', (event) => {
      this.start(event);
    }, false);
    element.addEventListener('dragleave',this.leave, false);
  }
  start(event) {
    const target = event.target;

    this.event.trigger('draggable.current', target.getAttribute('data-field'));
    target.classList.add('draggable-current');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';

    event.dataTransfer.setData('text', '1'); //Firefox effectAllowed and dropEffect bugfix
  }
  leave(event) {
    const classList = event.target.classList;

    if (classList) {
      classList.remove('draggable-current');
    }
  }
}