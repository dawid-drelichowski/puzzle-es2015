import Draggable from 'Draggable';
import Dropzone from 'Dropzone';
import Result from 'Result';

export default class {
  constructor() {
    let draggable, dropzone;

    if (!this.dragAndDropSupported()) {
      alert('Sorry! Your browser is too old to support this puzzle game. Please upgrade it.');
      return;
    }
    draggable = document.querySelectorAll('[draggable]');
    dropzone = document.querySelectorAll('[data-valid]');

    new Result(draggable.length, {
      progress: document.querySelector('[data-in-progress]'),
      count: document.querySelector('[data-count]'),
      done: document.querySelector('[data-done]')
    });

    [...draggable].forEach((element) => {
      new Draggable(element);
    });

    [...dropzone].forEach((element) => {
      new Dropzone(element);
    });
  }
  dragAndDropSupported() { //taken from modernizr.com
    const div = document.createElement('div');
    return 'draggable' in div || 'ondragstart' in div && 'ondrop' in div;
  }
}
