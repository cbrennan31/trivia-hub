import React, {Component} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

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
      playText = <h4 className="home-button-desc">try out Classic Mode, with hundreds of real <b>Jeopardy!</b> questions.</h4>
    } else if (this.state.showOnHover == 'browse') {
      browseText = <h4 className="home-button-desc">check out and play user-submitted quizzes on a range of topics.</h4>
    } else if (this.state.showOnHover == 'create') {
      createText = <h4 className="home-button-desc">show off my personal expertise by making a custom game.</h4>
    }

    return(
      <div id="home-page-intro">
        <h3><i><h3 className='q-and-a'>Q:</h3> What brings you here today?</i></h3>
        <h3 id="home-answer-intro"><i><h3 className='q-and-a'>A:</h3> I'm here to...</i></h3>

        <div className="row home-links">
          <CSSTransitionGroup transitionAppear={true} transitionName="home-button-1" transitionAppearTimeout={1100} transitionLeaveTimeout={1}>
            <div className="medium-4 small-12 columns text-center">
              <div className="home-column-padding">
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
            </div>
          </CSSTransitionGroup>

          <CSSTransitionGroup transitionAppear={true} transitionName="home-button-2" transitionAppearTimeout={1900} transitionLeaveTimeout={1}>
            <div className="medium-4 small-12 columns text-center">
              <div className="home-column-padding">
                <div className="home-button">
                  <a href="/user_games">
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
            </div>
          </CSSTransitionGroup>

          <CSSTransitionGroup transitionAppear={true} transitionName="home-button-3" transitionAppearTimeout={2700} transitionLeaveTimeout={1}>
            <div className="medium-4 small-12 columns text-center">
              <div className="home-column-padding">
                <div className="home-button">
                  <a href="/user_games/new">
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
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default Home
