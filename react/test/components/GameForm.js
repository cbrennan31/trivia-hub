import GameForm from '../../src/components/GameForm.js'
import ReactRadioButtonGroup from 'react-radio-button-group'

describe ('GameForm', () => {
  let wrapper, handleChange

  beforeEach(() => {

    handleChange = jasmine.createSpy('handleChange spy')

    wrapper = shallow(<GameForm
      handleChange = {handleChange}
      title = "New Game"
      description = "Game Description"
      strikes = {3}
    />)
  })

  it ('should render a text input with the specific props', () => {
    expect(wrapper.find('input').props()).toEqual({
      className: 'input',
      type: "text",
      name: "title",
      onChange: handleChange,
      value: "New Game"
    })
  })

  it ('should render textarea with the specific props', () => {
    expect(wrapper.find('textarea').props()).toEqual({
      className: 'textarea',
      name: 'description',
      onChange: handleChange,
      value: 'Game Description'
    })
  })

  it ('should render a ReactRadioButtonGroup component with the specific props', () => {
    expect(wrapper.find(ReactRadioButtonGroup).props()).toEqual({
      options: ['1', '2', '3'],
      name: 'strikes',
      isStateful: false,
      value: '3',
      onChange: handleChange,
      fireOnMount: true,
      itemClassName: 'radio-item'
    })
  })
})
