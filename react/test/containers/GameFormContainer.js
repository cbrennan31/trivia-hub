import GameFormContainer from '../../src/containers/GameFormContainer.js'
import GameForm from '../../src/components/GameForm.js'
import ClueFormContainer from '../../src/containers/ClueFormContainer.js'
import ReactRadioButtonGroup from 'react-radio-button-group'
import ClueForm from '../../src/components/ClueForm.js'

describe('GameFormContainer', () => {
  let wrapper;
  let data = {
    user_game_id: 1
  }

  beforeEach(() => {
    spyOn(global, 'fetch').and.returnValue(data);
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
})
