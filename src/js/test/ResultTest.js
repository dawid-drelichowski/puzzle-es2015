import Result from 'Result';
import resultFixture from 'test/fixture/result.html';

describe('Result', function() {
  let draggableCount = 3,
    progressElement,
    countElement,
    doneElement,
    result;

  beforeEach(() => {
    document.body.insertAdjacentHTML('beforeend', resultFixture);
    progressElement = document.querySelector('[data-in-progress]');
    countElement = document.querySelector('[data-count]');
    doneElement = document.querySelector('[data-done]');
    result = new Result(draggableCount, {
      progress: progressElement,
      count: countElement,
      done: doneElement
    });
  });

  afterEach(() => {
    document.body.removeChild(document.body.lastChild);
  });

  describe('#updateMessage', function() {
    it('should return Result', function() {
      expect(result.updateMessage()).to.be.instanceof(Result);
    });

    it('progress should be visible and draggable count decreased when called once', function() {
      result.updateMessage();
      expect(progressElement.classList.contains('hidden')).to.be.false;
      expect(parseInt(countElement.textContent, 10)).is.eq(draggableCount - 1);
    });

    it('done should be visible and progress hidden when called three times', function() {
      result.updateMessage();
      result.updateMessage();
      result.updateMessage();
      expect(progressElement.classList.contains('hidden')).to.be.true;
      expect(doneElement.classList.contains('hidden')).to.be.false;
    });
  });
});
