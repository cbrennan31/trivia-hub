import Game from '../../src/containers/Game.js'
import ClueContainer from '../../src/containers/ClueContainer.js'
import ScoreboardContainer from '../../src/containers/ScoreboardContainer.js'
import Guidelines from '../../src/components/Guidelines.js'

describe('Game', () => {
  let wrapper
  let clue1 = {
    category: {title: "baseball"},
    value: 200,
    question: "Who won the World Series this year?",
    answer: "Astros"
  }

  let clue2 = {
    category: {title: "music"},
    value: 200,
    question: "Whose remix of Despacito topped the charts in 2017?",
    answer: "Justin Bieber"
  }

  let clue3 = {
    category: {title: "board games"},
    value: 400,
    question: "This game earns you $200 when you pass GO.",
    answer: "Monopoly"
  }

  let clue4 = {
    category: {title: "TV"},
    value: 400,
    question: "This critically-acclaimed HBO comedy was created by Issa Rae.",
    answer: "Insecure"
  }

  beforeEach(() => {
    spyOn(Game.prototype, 'handleSelection').and.callThrough();
    spyOn(Game.prototype, 'handleCorrectResponse').and.callThrough();
    spyOn(Game.prototype, 'handleIncorrectResponse').and.callThrough();
    spyOn(Game.prototype, 'handleNextQuestion').and.callThrough();
    spyOn(Game.prototype, 'openGuidelines').and.callThrough();

    wrapper = shallow(
      <Game/>
    );

    wrapper.setState({
      cat1Clues: [clue1, clue3],
      cat2Clues: [clue2, clue4],
      correctClues: [],
      incorrectClues: [],
      currentQuestionIndex: 0,
      latestQuestionCorrect: false,
      strikes: 0,
      score: 0,
      selectedCategory: null,
      gameOver: false,
      maxStrikes: 2,
      guidelinesOpen: false
    })
  });

  it ('should trigger the handle selection function when a category title is clicked', () => {
    let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
    let categoryTitle1 = categoryTitleDiv1.find('p')
    categoryTitle1.simulate('click', {target: {id: 1}})

    expect(Game.prototype.handleSelection).toHaveBeenCalled();
  })

  describe('handleSelection', () => {
    it('should set render the appropriate clue container component', () => {
      let categoryTitleDiv2 = wrapper.find({className: 'category-title'}).at(1)
      let categoryTitle2 = categoryTitleDiv2.find('p')
      categoryTitle2.simulate('click', {target: {id: 2}})

      let clueContainer = wrapper.find(ClueContainer)
      expect(clueContainer.prop('clue')).toEqual(wrapper.state().cat2Clues[0])
    })
  })


  it('should trigger the handle correct response function upon correct response', () => {
    let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
    let categoryTitle1 = categoryTitleDiv1.find('p')
    categoryTitle1.simulate('click', {target: {id: 1}})
    let clueContainer = wrapper.find(ClueContainer).dive()

    clueContainer.setState({response: "Astros"})
    clueContainer.find('form').simulate('submit', { preventDefault() {} })

    expect(Game.prototype.handleCorrectResponse).toHaveBeenCalled()
  })

  describe('handleCorrectResponse', () => {
    it('should set latest question to correct, increase the score, and add one to the correct clues array', () => {
      let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
      let categoryTitle1 = categoryTitleDiv1.find('p')
      categoryTitle1.simulate('click', {target: {id: 1}})
      let clueContainer = wrapper.find(ClueContainer).dive()

      clueContainer.setState({response: "Astros"})
      clueContainer.find('form').simulate('submit', { preventDefault() {} })

      expect(wrapper.state().latestQuestionCorrect).toEqual(true)
      expect(wrapper.state().score).toEqual(wrapper.state().cat1Clues[0].value);
      expect(wrapper.state().correctClues[0]).toEqual(wrapper.state().cat1Clues[0]);
    })

    it ('should change the state of game over to true if an answer to the final question is submitted', () => {
      wrapper.setState({currentQuestionIndex: 1})
      let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
      let categoryTitle1 = categoryTitleDiv1.find('p')
      categoryTitle1.simulate('click', {target: {id: 1}})
      let clueContainer = wrapper.find(ClueContainer).dive()

      clueContainer.find('form').simulate('submit', { preventDefault() {} })

      expect(wrapper.state().gameOver).toEqual(true)
    })
  })

  it ('should trigger the handle incorrect response function when the incorrect respone is received', () => {
    let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
    let categoryTitle1 = categoryTitleDiv1.find('p')
    categoryTitle1.simulate('click', {target: {id: 1}})
    let clueContainer = wrapper.find(ClueContainer).dive()

    clueContainer.setState({response: "Red Sox"})
    clueContainer.find('form').simulate('submit', { preventDefault() {} })

    expect(Game.prototype.handleIncorrectResponse).toHaveBeenCalled()
  })

  describe ('handleIncorrectResponse', () => {
    beforeEach(() => {
      let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
      let categoryTitle1 = categoryTitleDiv1.find('p')
      categoryTitle1.simulate('click', {target: {id: 1}})
      let clueContainer = wrapper.find(ClueContainer).dive()

      clueContainer.setState({response: "Red Sox"})
      clueContainer.find('form').simulate('submit', { preventDefault() {} })
    })

    it ('should increase the strikes if the incorrect answer is received', () => {
      expect(wrapper.state().strikes).toEqual(1);
    })

    it ('should add the clue to the incorrect clues array if the incorrect answer is received', () => {
      expect(wrapper.state().incorrectClues[0]).toEqual(wrapper.state().cat1Clues[0]);
    })

    it ('should change the state of game over to true if an answer to the final question is submitted', () => {
      wrapper.setState({currentQuestionIndex: 1})
      let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
      let categoryTitle1 = categoryTitleDiv1.find('p')
      categoryTitle1.simulate('click', {target: {id: 1}})
      let clueContainer = wrapper.find(ClueContainer).dive()

      clueContainer.find('form').simulate('submit', { preventDefault() {} })

      expect(wrapper.state().gameOver).toEqual(true)
    })
  })

  it ('should trigger the handleNextQuestion function when the button in the clueContainer is clicked', () => {
    let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
    let categoryTitle1 = categoryTitleDiv1.find('p')
    categoryTitle1.simulate('click', {target: {id: 1}})
    let clueContainer = wrapper.find(ClueContainer).dive()

    clueContainer.setState({response: "Red Sox"})
    clueContainer.find('form').simulate('submit', { preventDefault() {} })

    let nextQuestionButton = clueContainer.findWhere(input => input.prop('value') == "Next Question").at(0)
    nextQuestionButton.simulate('click')

    expect(Game.prototype.handleNextQuestion).toHaveBeenCalled()
  })

  describe('handleNextQuestion', () => {
    beforeEach(() => {
      let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
      let categoryTitle1 = categoryTitleDiv1.find('p')
      categoryTitle1.simulate('click', {target: {id: 1}})
      let clueContainer = wrapper.find(ClueContainer).dive()

      clueContainer.setState({response: "Red Sox"})
      clueContainer.find('form').simulate('submit', { preventDefault() {} })

      let nextQuestionButton = clueContainer.findWhere(input => input.prop('value') == "Next Question").at(0)
      nextQuestionButton.simulate('click')
    })

    it ('should set latestQuestionCorrect to false and selectedCategory to null in state', () => {
      expect(wrapper.state().latestQuestionCorrect).toEqual(false)
      expect(wrapper.state().selectedCategory).toEqual(null)
    })

    it ('should increase the currentQuestionIndex in state if there are questions remaining', () => {
      expect(wrapper.state().currentQuestionIndex).toEqual(1)
    })
  })

  it ('should trigger the openGuidelines functions when the showGuidelines link is clicked', () => {
    let guidelinesLink = wrapper.findWhere(link => link.prop('id') == "guidelines-header")
    guidelinesLink.simulate('click')

    expect(Game.prototype.openGuidelines).toHaveBeenCalled()
  })

  describe ('openGuidelines', () => {
    beforeEach( ()=> {
      let guidelinesLink = wrapper.findWhere(link => link.prop('id') == "guidelines-header")
      guidelinesLink.simulate('click')
    })

    it ('should set the state of guidelinesOpen to true', () => {
      expect(wrapper.state().guidelinesOpen).toEqual(true)
    })

    it('should render a Guidelines component with the rules', () => {

      let guidelines = wrapper.find(Guidelines).dive()
      expect(guidelines.find('h6').at(0).text()).toBe('The Basics')
    })
  })

  it ('renders a scoreboard container with specific props', () => {
    expect(wrapper.find(ScoreboardContainer).props()).toEqual({
      cat1Clues: wrapper.state().cat1Clues,
      cat2Clues: wrapper.state().cat2Clues,
      correctClues: wrapper.state().correctClues,
      incorrectClues: wrapper.state().incorrectClues,
      currentQuestionIndex: wrapper.state().currentQuestionIndex,
      score: wrapper.state().score
    })
  })
});
