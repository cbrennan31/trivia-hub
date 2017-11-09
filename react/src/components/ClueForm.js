import React, { Component } from 'react';
import ReactModal from 'react-modal';

class ClueForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleDelete () {
    this.setState({ showModal: false });
    this.props.deleteFunction()
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render(){

    let value = 200

    if (this.props.value) {
      value = this.props.value
    }

    return (
      <div>

        <div className='small-4 columns new-question-title'>
          <h4 className='new-question-title'>Clue Details</h4>
        </div>

        <div className='small-8 columns text-right' id = 'delete-div'>
          <input type="button" className="alert button button-small" onClick={this.handleOpenModal} value = "Delete Clue" data-confirm/>
        </div>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Delete"
        >
          <div className="modal-content">
            <p>Are you sure you want to delete this clue?</p>
            <input className="modal-button button button-small" type="button" onClick={this.handleDelete} value="Yes" />
            <input className="modal-button button button-small" type="button" onClick={this.handleCloseModal} value="No" />
          </div>
        </ReactModal>

        <div className="row value-category">
          <div className="small-2 columns value">
            <label className="my-label" >Value*
              <select
                value = {this.props.value}
                className="value-select"
                name="value"
                onChange={this.props.handleChange}
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
                onChange={this.props.handleChange}
                value={this.props.category}
              />
            </label>
          </div>
        </div>

        <label className="my-label">Question*
          <textarea
            className="textarea"
            name="question"
            onChange={this.props.handleChange}
            value={this.props.question}
          />
        </label>


        <label className="my-label">Answer*
          <input
            className="input"
            type="text"
            name="answer"
            onChange={this.props.handleChange}
            value={this.props.answer}
          />
        </label>
      </div>
    )
  }
}

export default ClueForm;
