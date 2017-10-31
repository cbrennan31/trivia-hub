import React, { Component } from 'react';
const ClueForm = props => {

  return (
    <div className="clue-form">
      <h4 id="new-question-title">New Clue</h4>
      <div className="row value-category">
        <div className="small-2 columns value">
          <label className="my-label" >Value*
            <select className="value-select" name="value" onChange={props.handleChange}>
              <option value={200}>200</option>
              <option value={400}>400</option>
              <option value={600}>600</option>
              <option value={800}>800</option>
              <option value={1000}>1000</option>
            </select>
          </label>
        </div>

        <div className="small-10 columns category">
          <label className="my-label">Category*
            <input className="input" type="text" name="category" onChange={props.handleChange} />
          </label>
        </div>
      </div>

      <label className="my-label">Question*
        <textarea className="textarea" name="question" onChange={props.handleChange} />
      </label>


      <label className="my-label">Answer*
        <input className="input" type="text" name="answer" onChange={props.handleChange} />
      </label>
    </div>
  )
}

export default ClueForm;
