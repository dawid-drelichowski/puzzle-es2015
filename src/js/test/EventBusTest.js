import EventBus from 'EventBus';

describe('EventBus', function() {
  let eventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe('#on', () => {
    it('should return EventBus', () => {
      expect(eventBus.on('test.event')).to.be.instanceof(EventBus);
    });
  });

  describe('#trigger', () => {
    it('should return EventBus', () => {
      expect(eventBus.trigger('test.event')).to.be.instanceof(EventBus);
    });

    it('should call callback set in #on', (done) => {
      const value = {name: 'Patricia'};

      eventBus.on('test.event', (data) => {
        expect(data).to.deep.equal(value);
        done();
      });

      eventBus.trigger('test.event', value);
    });
  });
});