import React, { Component } from 'react';
import ReactRadioButtonGroup from 'react-radio-button-group';
const GameForm = props => {

  return (
    <div>
      <label className="my-label">
        Title*
        <input
          className="input"
          type="text"
          name="title"
          onChange={props.handleChange}
          value={props.title}
        />
      </label>

      <label className="my-label">
        Description*
        <textarea
          className="textarea"
          name="description"
          onChange={props.handleChange}
          value={props.description}
        />
      </label>

      <label className="my-label" name="strikes" onChange={props.handleChange}>
        Strikes*
        <ReactRadioButtonGroup
          options={['1', '2', '3']}
          name='strikes'
          isStateful={false}
          value={props.strikes}
          onChange={props.handleChange}
          fireOnMount={true}
          itemClassName="radio-item"
        />
      </label>
    </div>
  )
}

export default GameForm;
