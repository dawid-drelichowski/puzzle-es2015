import EventBus from 'EventBus';

const eventBus = new EventBus();

export default class {
  get event() {
    return eventBus;
  }
}