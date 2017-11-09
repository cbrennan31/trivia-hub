import React, {Component} from 'react'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOnHover: null
    }

    this.showDesc = this.showDesc.bind(this)
    this.hideDesc = this.hideDesc.bind(this)
  }

  showDesc(event) {
    this.setState({showOnHover: event.target.id })
  }

  hideDesc() {
    this.setState({showOnHover: null})
  }

  render () {
    let playText = <h1 className="home-button-header">play</h1>
    let browseText = <h1 className="home-button-header">browse</h1>
    let createText = <h1 className="home-button-header">create</h1>

    if (this.state.showOnHover == 'play') {
      playText = <h4 className="home-button-text">try out classic mode, with hundreds of real <i>Jeopardy!</i> questions.</h4>
    } else if (this.state.showOnHover == 'browse') {
      browseText = <h4 className="home-button-text">check out and play user-submitted quizzes on a range of topics.</h4>
    } else if (this.state.showOnHover == 'create') {
      createText = <h4 className="home-button-text">show off my personal expertise by making a custom game.</h4>
    }

    return(
      <div id="home-page-intro">
        <h3><i><h3 className='q-and-a'>Q:</h3> What brings you here today?</i></h3>
        <h3 id="home-answer-intro"><i><h3 className='q-and-a'>A:</h3> I'm here to...</i></h3>
        <div className="row home-links">
          <div className="small-4 columns text-center">
            <div className="home-button">
              <a href="/game">
                <span className="link-panel"
                  id="play"
                  onMouseEnter={this.showDesc}
                  onMouseLeave={this.hideDesc}>
                </span>
              </a>
              <div className="home-button-text" >
                {playText}
              </div>
            </div>
          </div>

          <div className="small-4 columns text-center">
            <div className="home-button">
              <a href="/game">
                <span className="link-panel"
                  id="browse"
                  onMouseEnter={this.showDesc}
                  onMouseLeave={this.hideDesc}>
                </span>
              </a>

              <div className="home-button-text" id='browse'>
                {browseText}
              </div>
            </div>
          </div>

          <div className="small-4 columns text-center">
            <div className="home-button">
              <a href="/game">
                <span className="link-panel"
                  id="create"
                  onMouseEnter={this.showDesc}
                  onMouseLeave={this.hideDesc}>
                </span>
              </a>

              <div className="home-button-text" id='create'>
                {createText}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
