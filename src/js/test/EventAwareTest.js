import EventAware from 'EventAware';
import EventBus from 'EventBus';

describe('EventAware', function() {
  let eventAware;

  beforeEach(() => {
    eventAware = new EventAware();
  });

  describe('#get event', () => {
    it('should return EventBus', () => {
      expect(eventAware.event).to.be.instanceof(EventBus);
    });
  });
});