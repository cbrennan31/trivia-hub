import React, { Component } from 'react';
const ClueForm = props => {
  let value = 200

  if (props.value) {
    value = props.value
  }

  return (
    <div>

        <div className='small-4 columns new-question-title'>
          <h4 className='new-question-title'>Clue Details</h4>
        </div>

        <div className='small-8 columns text-right' id = 'delete-div'>
          <input type="button" className="alert button button-small" onClick={props.deleteFunction} value = "Delete Clue"/>
        </div>

      <div className="row value-category">
        <div className="small-2 columns value">
          <label className="my-label" >Value*
            <select
              value = {props.value}
              className="value-select"
              name="value"
              onChange={props.handleChange}
            >
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
            <input
              className="input"
              type="text"
              name="category"
              onChange={props.handleChange}
              value={props.category}
            />
          </label>
        </div>
      </div>

      <label className="my-label">Question*
        <textarea
          className="textarea"
          name="question"
          onChange={props.handleChange}
          value={props.question}
        />
      </label>


      <label className="my-label">Answer*
        <input
          className="input"
          type="text"
          name="answer"
          onChange={props.handleChange}
          value={props.answer}
        />
      </label>
    </div>
  )
}

export default ClueForm;
