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
    wrapper = mount(
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
      numberCorrect: 0,
      score: 0,
      selectedCategory: null,
      wonGame: false,
      maxStrikes: 3,
      guidelinesOpen: false
    })
    spyOn(Game.prototype, 'handleIncorrectResponse').and.callThrough();
    spyOn(Game.prototype, 'handleCorrectReponse').and.callThrough();
    spyOn(Game.prototype, 'handleNextQuestion').and.callThrough();
    spyOn(Game.prototype, 'handleSelection').and.callThrough();
    spyOn(Game.prototype, 'openGuidelines').and.callThrough();
  });

  it('should pass', () => {
    expect(true).toBe(true);
  });
});
