import GameFormContainer from '../../src/containers/GameFormContainer.js'
import GameForm from '../../src/components/GameForm.js'
import ClueFormContainer from '../../src/containers/ClueFormContainer.js'

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
    let titleInput = gameForm.find('input').at(0)
    titleInput.simulate('change', {target: {value: "New Game", name: 'title'}})
    expect(GameFormContainer.prototype.handleChange).toHaveBeenCalled()
  })

  it ('should trigger the handle change function when the description is changed', () => {

  })

  it ('should trigger the handle change function when the strikes are changed', () => {

  })

  describe('handleChange', () => {
    it ('should get the state of the title to the value of the event target', () => {
      let gameForm = wrapper.find(GameForm).dive()
      let titleInput = gameForm.find('input').at(0)
      titleInput.simulate('change', {target: {value: "New Game", name: 'title'}})
      expect(wrapper.state().title).toEqual("New Game")
    })
  })
})
