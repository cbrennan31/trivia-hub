import React from 'react';

const Guidelines = props => {
  return(
    <div className = "text-left">
      <br/>
      <br/>
      <h6><b>The Basics</b></h6>

      <ul>
        <li>Choose a category to reveal the question (classic mode only).
          Submit a response and move up to the next score level.
        </li>

        <li>
          Missing a question earns a strike, and reaching the strikes limit ends the game - but you can always play again with new questions!
        </li>
      </ul>

      <h6><b>Responses</b></h6>
      <ul>
        <li>
          Type in an exact response, including a first and last name for people.
        </li>

        <li>
          Responses do not need to be in question form - just state the answer!
        </li>

        <li>
          Answers are not case-sensitive, and articles ("a," "an," "the") are optional.
        </li>
      </ul>
    </div>
  )
}

export default Guidelines
