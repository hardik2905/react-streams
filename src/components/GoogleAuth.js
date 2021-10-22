import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    // loading and initialising auth library
    window.gapi.load('client:auth2', () => {
      // callback
      window.gapi.client.init({
        clientId: '18295969776-ju425lkjgipg4dcil3cebs2csr4g75af.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        // set /update component level state component
        // that will cause  re-render
        // initial
        this.onAuthChange(this.auth.isSignedIn.get());

        // update state on the fly to reflect as soon as auth
        // status changes listen takes in call back function
        // which calls caller when login state changes
        // at some point in future
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  // because this is a call back function which we define
  // ourselves use arrow function to avoid context issue
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {signIn, signOut}) (GoogleAuth);
