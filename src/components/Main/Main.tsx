import React from 'react';
import './Main.scss'
import { Button } from 'antd/es';
import Invitation from '../Invitation/Invitation'

interface MainState {
  visible: boolean
}

export default class Main extends React.PureComponent<any, MainState> {
  state: MainState = {
    visible: false
  }
  handlePopupShow = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  render() {
    const { visible } = this.state
    return (
      <div className="App-main-container">
        <div>
          <div className="App-main-content-title">A Better way<br></br> to enjoy every day.</div>
          <div className="App-main-content-desc">Be the first to know when we launch.</div>
          <Button size="large" type="primary" onClick={this.handlePopupShow}>Request an invite</Button>
        </div>
        <Invitation
          visible={visible}
          onCancel={this.handlePopupShow}
        />

      </div>
    );
  }
}