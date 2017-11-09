import React from 'react';

const Guidelines = props => {
  return(
    <div className = "text-left">
      <h6>The Basics</h6>

      <ul>
        <li>Choose a category to reveal the question (classic mode only).
          Submit a response and move up to the next score level.
        </li>

        <li>
          Missing a question earns a strike, and reaching the strikes limit ends the game - but you can always play again with new questions!
        </li>
      </ul>

      <h6>Responses</h6>
      <ul>
        <li>
          Type in an exact answer, including a first and last name for people.
        </li>

        <li>
          Answers are not case-sensitive.
        </li>

        <li>
          Articles ("a," "an," "the") are optional.
        </li>
      </ul>
    </div>
  )
}

export default Guidelines
