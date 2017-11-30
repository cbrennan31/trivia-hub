import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ReactRadioButtonGroup from 'react-radio-button-group';

class DifficultyLevelModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      difficultyLevel: 'Standard'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(value) {
    this.setState({difficultyLevel: value})
  }

  handleSubmit() {
    this.props.selectDifficultyLevel(this.state.difficultyLevel)
  }

  render(){
    return (
      <ReactModal
        isOpen={this.props.showModal}
      >
        <div className="modal-content">
          <h4 className = "text-center">Select your difficulty level:</h4>

          <div className="text-left">
            <ReactRadioButtonGroup
              options={[
                {value: 'Easy', label: 'Easy (8 Qs, 3 strikes)'},
                {value: 'Standard', label: 'Standard (10 Qs, 3 strikes)'},
                {value: 'Hard', label: 'Hard (12 Qs, 2 strikes)'}
              ]}
              name='strikes'
              isStateful={false}
              value = {this.state.difficultyLevel}
              onChange={this.handleChange}
              fireOnMount={true}
              labelClassName="difficulty-label"
            />
          </div>

          <input className="modal-button button button-small" type="button" onClick={this.handleSubmit} value="Start!" />
        </div>
      </ReactModal>
    )
  }
}

export default DifficultyLevelModal
