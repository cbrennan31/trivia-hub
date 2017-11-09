import ClueContainer from '../../src/containers/ClueContainer.js'
import * as modify from '../../src/modules/modifyAnswersAndResponses.js'

describe('ClueContainer', () => {
  let wrapper, handleIncorrectResponse, handleCorrectResponse, handleNextQuestion

  let clue = {
    category: {title: "TV"},
    value: 400,
    question: "This critically-acclaimed HBO comedy was created by Issa Rae.",
    answer: "Insecure"
  }

  beforeEach(() => {
    spyOn(ClueContainer.prototype, 'handleChange').and.callThrough();
    spyOn(ClueContainer.prototype, 'handleSubmit').and.callThrough();

    handleIncorrectResponse = jasmine.createSpy('handleIncorrectResponse spy');
    handleCorrectResponse = jasmine.createSpy('handleCorrectResponse spy');
    handleNextQuestion = jasmine.createSpy('handleNextQuestion spy');

    wrapper = shallow(
      <ClueContainer
        clue={clue}
        strikes={0}
        gameOver={false}
        latestQuestionCorrect={false}
        maxStrikes={3}

        handleIncorrectResponse={handleIncorrectResponse}
        handleCorrectResponse={handleCorrectResponse}
        handleNextQuestion={handleNextQuestion}
      />
    );

    wrapper.setState({
      response: '',
      answerSubmitted: false
    })
  })

  it('should render a form with an input field and a button to submit a response', () => {
    let form = wrapper.find('form')

    expect(form.find('label').prop('value')).toEqual('Your response')
    expect(form.find('input').at(0).prop('className')).toEqual('answer-input')
    expect(form.find('input').at(1).prop('value')).toEqual('Submit Answer')
  })

  it('should trigger the handleChange function if a response is entered', () => {
    let input = wrapper.findWhere(input => input.prop('className') == "answer-input").at(0)
    input.simulate('change', {target: {value: 'Insecure'}})

    expect(ClueContainer.prototype.handleChange).toHaveBeenCalled()
  })

  describe('handleChange', () => {
    it ('should set the response in state to the value of the event target' , () => {
      let input = wrapper.findWhere(input => input.prop('className') == "answer-input").at(0)
      input.simulate('change', {target: {value: 'Insecure'}})

      expect(wrapper.state().response).toEqual('Insecure')
    })
  })

  it('should trigger the handleSubmit function when the answer form is submitted', () => {
    let form = wrapper.find('form')
    let input = form.find('input').at(0)
    input.simulate('change', {target: {value: 'Insecure'}})
    form.simulate('submit', { preventDefault() {} })

    expect(ClueContainer.prototype.handleSubmit).toHaveBeenCalled()
  })

  describe('handleSubmit', () => {

    it('should set the state of answerSubmitted to true', () => {
      let form = wrapper.find('form')
      let input = form.find('input').at(0)

      input.simulate('change', {target: {value: 'Insecure'}})
      form.simulate('submit', { preventDefault() {} })

      expect(wrapper.state().answerSubmitted).toEqual(true)
    })

    it('should trigger the handleCorrectResponse function from props if the answer is correct', () => {
      let form = wrapper.find('form')
      let input = form.find('input').at(0)

      input.simulate('change', {target: {value: 'Insecure'}})
      form.simulate('submit', { preventDefault() {} })

      expect(handleCorrectResponse).toHaveBeenCalled()
    })

    it('should reveal the appropriate message if the answer is correct', () => {
      wrapper.setProps({latestQuestionCorrect: true})

      expect(wrapper.find('p').at(1).text()).toEqual('Correct!')
    })

    it('should trigger the handleIncorrectResponse function from props if the answer is correct', () => {
      let form = wrapper.find('form')
      let input = form.find('input').at(0)

      input.simulate('change', {target: {value: 'Veep'}})
      form.simulate('submit', { preventDefault() {} })

      expect(handleIncorrectResponse).toHaveBeenCalled()
    })

    it('should reveal the appropriate message if the answer is incorrect', () => {
      let form = wrapper.find('form')
      form.simulate('submit', { preventDefault() {} })
      wrapper.setProps({latestQuestionCorrect: false})

      expect(wrapper.find('p').at(1).text()).toEqual('Sorry! The correct answer is Insecure.')
    })

    it('should reveal the appropriate message if the game is over and the latest question is right', () => {
      let form = wrapper.find('form')
      form.simulate('submit', { preventDefault() {} })
      wrapper.setProps({gameOver: true, latestQuestionCorrect: true})

      expect(wrapper.find('p').at(1).text()).toEqual('Correct! You win! Play again?')
    })

    it('should reveal the appropriate message if the game is over and the strikes limit has been reached', () => {
      let form = wrapper.find('form')
      form.simulate('submit', { preventDefault() {} })
      wrapper.setProps({strikes: 3})

      expect(wrapper.find('p').at(1).text()).toEqual('Sorry! The correct answer is Insecure.')
      expect(wrapper.find('p').at(2).text()).toEqual('Game over. Play again?')
    })
  })
})

// how to test for handleClearResponse since it is wrapped in an anonymous function on click?
