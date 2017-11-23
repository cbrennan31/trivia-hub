import GameFormContainer from '../../src/containers/GameFormContainer.js'
import GameForm from '../../src/components/GameForm.js'
import ClueFormContainer from '../../src/containers/ClueFormContainer.js'
import ReactRadioButtonGroup from 'react-radio-button-group'
import ClueForm from '../../src/components/ClueForm.js'
import fetchMock from 'fetch-mock';

describe('GameFormContainer', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(GameFormContainer.prototype, 'handleChange').and.callThrough();
    spyOn(GameFormContainer.prototype, 'handleClueChange').and.callThrough();
    spyOn(GameFormContainer.prototype, 'openClueForm').and.callThrough();
    spyOn(GameFormContainer.prototype, 'handleClearForm').and.callThrough();
    spyOn(GameFormContainer.prototype, 'handleGameRequest').and.callThrough();
    spyOn(GameFormContainer.prototype, 'deleteNewClue').and.callThrough();
    spyOn(GameFormContainer.prototype, 'validateForm').and.callThrough();
    spyOn(GameFormContainer.prototype, 'assignError').and.callThrough();

    wrapper = shallow(
      <GameFormContainer/>
    )

    wrapper.setState({
      title: '',
      description: '',
      strikes: null,
      clues: [],
      clueFormsDisplayed: 0,
      thanksMessage: null,
      userGameId: null,
      errors: {
        titleError: null,
        descriptionError: null,
        strikesError: null,
        numberOfCluesError: null,
        categoryError: null,
        questionError: null,
        answerError: null
      }
    })
  })

  it ('should render a GameForm component with the specific props', () => {
    expect(wrapper.find(GameForm).props()).toEqual({
      handleChange: jasmine.any(Function),
      title: wrapper.state().title,
      description: wrapper.state().description,
      strikes: wrapper.state().strikes
    })
  })

  it ('should trigger the handle change function when the title is changed', () => {
    let gameForm = wrapper.find(GameForm).dive()
    let titleInput = gameForm.find('input')
    titleInput.simulate('change', {target: {value: "New Game", name: 'title'}})

    expect(GameFormContainer.prototype.handleChange).toHaveBeenCalled()
  })

  it ('should trigger the handle change function when the description is changed', () => {
    let gameForm = wrapper.find(GameForm).dive()
    let descInput = gameForm.find('textarea')
    descInput.simulate('change', {target: {value: "New Description", name: 'description'}})

    expect(GameFormContainer.prototype.handleChange).toHaveBeenCalled()
  })

  it ('should trigger the handle change function when the strikes are changed', () => {
    let gameForm = wrapper.find(GameForm).dive()
    let strikes = gameForm.find(ReactRadioButtonGroup)
    strikes.simulate('change', '2')

    expect(GameFormContainer.prototype.handleChange).toHaveBeenCalled()
  })

  describe('handleChange', () => {
    it ('should set the state of the title to the value of the event target', () => {
      let gameForm = wrapper.find(GameForm).dive()
      let titleInput = gameForm.find('input')
      titleInput.simulate('change', {target: {value: "New Game", name: 'title'}})

      expect(wrapper.state().title).toEqual("New Game")
    })

    it ('should set the state of the description to the value of the event target', () => {
      let gameForm = wrapper.find(GameForm).dive()
      let descInput = gameForm.find('textarea')
      descInput.simulate('change', {target: {value: "New Description", name: 'description'}})

      expect(wrapper.state().description).toEqual("New Description")
    })

    it ('should set the state of strikes to the value of the argument', () => {
      let gameForm = wrapper.find(GameForm).dive()
      let strikes = gameForm.find(ReactRadioButtonGroup)
      strikes.simulate('change', '2')

      expect(wrapper.state().strikes).toEqual('2')
    })
  })

  it('should trigger the openClueForm function when the addClue button is clicked', () => {
    let addClue = wrapper.findWhere(div => div.prop('className') == "add-new-question")
    addClue.simulate('click')

    expect(GameFormContainer.prototype.openClueForm).toHaveBeenCalled()
  })

  describe('openClueForm', () => {
    beforeEach(() => {
      let addClue = wrapper.findWhere(div => div.prop('className') == "add-new-question")
      addClue.simulate('click')
    })

    it('should increase the number of clueFormsDisplayed in state by 1', () => {
      expect(wrapper.state().clueFormsDisplayed).toEqual(1)
    })

    it('should render a ClueFormContainer component', () => {
      expect(wrapper.find(ClueFormContainer).length).toEqual(1)
    })
  })

  it ('should trigger the handleGameRequest function if the form is submitted', () => {
    let form = wrapper.find('form')
    form.simulate('submit', { preventDefault() {} })

    expect(GameFormContainer.prototype.handleGameRequest).toHaveBeenCalled()
  })

  it ('should trigger the validateForm function if the form is submitted', () => {
    let form = wrapper.find('form')
    form.simulate('submit', { preventDefault() {} })

    expect(GameFormContainer.prototype.validateForm).toHaveBeenCalled()
  })

  describe ('validateForm', () => {
    it ('should call the assignError function if there is a missing field for the game overall', () => {
      wrapper.setState({
        clues: [
          {value: 200, category: 'a', question: 'a', answer: 'a'},
          {value: 400, category: 'b', question: 'b', answer: 'b'}
        ]
      })

      let form = wrapper.find('form')
      form.simulate('submit', { preventDefault() {} })

      expect(GameFormContainer.prototype.assignError).toHaveBeenCalled()
    })

    it ('should call the assignError function if there are fewer than two clues', () => {
      wrapper.setState({
        title: 'title',
        description: 'description',
        strikes: 2,
        clues: [
          {value: 200, category: 'a', question: 'a', answer: 'a'}
        ]
      })

      let form = wrapper.find('form')
      form.simulate('submit', { preventDefault() {} })

      expect(GameFormContainer.prototype.assignError).toHaveBeenCalled()
    })

    it ('should call the assignError function if any clue is missing a field', () => {
      wrapper.setState({
        title: 'title',
        description: 'description',
        strikes: 2,
        clues: [
          {value: 200, category: 'a', question: 'a', answer: 'a'},
          {value: 400, category: 'b', question: 'b', answer: ''}
        ]
      })

      let form = wrapper.find('form')
      form.simulate('submit', { preventDefault() {} })

      expect(GameFormContainer.prototype.assignError).toHaveBeenCalled()
    })

    it ('should not call the assignError function if the form submission has no errors', () => {
      wrapper.setState({
        title: 'title',
        description: 'description',
        strikes: 2,
        clues: [
          {value: 200, category: 'a', question: 'a', answer: 'a'},
          {value: 400, category: 'b', question: 'b', answer: 'b'}
        ]
      })

      let form = wrapper.find('form')
      form.simulate('submit', { preventDefault() {} })

      expect(GameFormContainer.prototype.assignError).not.toHaveBeenCalled()
    })
  })

  describe ('assignError', () => {
    beforeEach(() => {
      wrapper.setState({
        title: 'title',
        description: 'description',
        strikes: 2,
        clues: [
          {value: 200, category: 'a', question: 'a', answer: 'a'}
        ]
      })

      let form = wrapper.find('form')
      form.simulate('submit', { preventDefault() {} })
    })

    it ('should assign the appropriate error in state when an incomplete form is submitted', () => {
      expect(wrapper.state().errors.numberOfCluesError).toEqual("Your game should include at least two clues.")
    })

    it ('should render a p tag with the text of the error message', () => {
      expect(wrapper.find('p').text()).toBe("Your game should include at least two clues.")
    })
  })

  it ('should trigger the deleteNewClue function when the delete button is clicked in the ClueForm and confirmed', () => {
    let addClue = wrapper.findWhere(div => div.prop('className') == "add-new-question")
    addClue.simulate('click')

    let clueFormContainer = wrapper.find(ClueFormContainer).dive()
    let clueForm = clueFormContainer.find(ClueForm).dive()
    let deleteClueButton = wrapper.find('input').at(0)
    deleteClueButton.simulate('click')
    let yes = clueForm.find('input').at(1)
    yes.simulate('click')

    expect(GameFormContainer.prototype.deleteNewClue).toHaveBeenCalled()
  })

  describe ('deleteNewClue', () => {
    beforeEach(() => {
      let addClue = wrapper.findWhere(div => div.prop('className') == "add-new-question")
      addClue.simulate('click')

      let clueFormContainer = wrapper.find(ClueFormContainer).dive()
      let clueForm = clueFormContainer.find(ClueForm).dive()
      let deleteClueButton = wrapper.find('input').at(0)
      deleteClueButton.simulate('click')
      let yes = clueForm.find('input').at(1)
      yes.simulate('click')
    })

    it ('should remove a clue from the clues array in state', () => {
      expect(wrapper.state().clues.length).toEqual(0)
    })

    it ('should reduce the number of clueFormsDisplayed in state by 1', () => {
      expect(wrapper.state().clueFormsDisplayed).toEqual(0)
    })
  })
})
