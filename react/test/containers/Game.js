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
    spyOn(Game.prototype, 'handleIncorrectResponse').and.callThrough();
    spyOn(Game.prototype, 'handleCorrectReponse').and.callThrough();
    spyOn(Game.prototype, 'handleNextQuestion').and.callThrough();
    spyOn(Game.prototype, 'handleSelection').and.callThrough();
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


  it ('should render the correct Clue Container component when the corresponding category title is clicked', () => {
    let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
    let categoryTitle1 = categoryTitleDiv1.find('p')
    categoryTitle1.simulate('click', {target: {id: 1}})
    expect(Game.prototype.handleSelection).toHaveBeenCalled();
    expect(wrapper.state().selectedCategory).toEqual(1);

    let clueContainer = wrapper.find(ClueContainer)
    expect(clueContainer.prop('clue')).toEqual(wrapper.state().cat1Clues[0])
  })

  it('should add the clue to the correct clues array if the correct answer is received', () => {
    let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
    let categoryTitle1 = categoryTitleDiv1.find('p')
    categoryTitle1.simulate('click', {target: {id: 1}})
    let clueContainer = wrapper.find(ClueContainer).dive()

    clueContainer.setState({response: "Astros"})
    clueContainer.find('form').simulate('submit', { preventDefault() {} })

    expect(wrapper.state().correctClues[0]).toEqual(wrapper.state().cat1Clues[0]);
  })

  it ('should add the clue to the incorrect clues array if the incorrect answer is received', () => {
    let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
    let categoryTitle1 = categoryTitleDiv1.find('p')
    categoryTitle1.simulate('click', {target: {id: 1}})
    let clueContainer = wrapper.find(ClueContainer).dive()

    clueContainer.setState({response: "Red Sox"})
    clueContainer.find('form').simulate('submit', { preventDefault() {} })

    expect(wrapper.state().incorrectClues[0]).toEqual(wrapper.state().cat1Clues[0]);
  })

  it ('should increase the score if the correct answer is received', () => {
    let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
    let categoryTitle1 = categoryTitleDiv1.find('p')
    categoryTitle1.simulate('click', {target: {id: 1}})
    let clueContainer = wrapper.find(ClueContainer).dive()

    clueContainer.setState({response: "Astros"})
    clueContainer.find('form').simulate('submit', { preventDefault() {} })

    expect(wrapper.state().score).toEqual(wrapper.state().cat1Clues[0].value);
  })

  it ('should increase the strikes if the incorrect answer is received', () => {
    let categoryTitleDiv1 = wrapper.find({className: 'category-title'}).at(0)
    let categoryTitle1 = categoryTitleDiv1.find('p')
    categoryTitle1.simulate('click', {target: {id: 1}})
    let clueContainer = wrapper.find(ClueContainer).dive()

    clueContainer.setState({response: "Red Sox"})
    clueContainer.find('form').simulate('submit', { preventDefault() {} })

    expect(wrapper.state().strikes).toEqual(1);
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

  it ('renders a scoreboard container with specific props', () => {
    expect(wrapper.find(ScoreboardContainer).props()).toEqual({
      cat1Clues: wrapper.state().cat1Clues,
      correctClues: wrapper.state().correctClues,
      incorrectClues: wrapper.state().incorrectClues,
      currentQuestionIndex: wrapper.state().currentQuestionIndex,
      score: wrapper.state().score
    })
  })
});
