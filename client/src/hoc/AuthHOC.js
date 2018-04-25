import React from 'react';

export default function withAuth(AuthComponent) {
  // pass authServices stuff here
  return class AuthWrapped extends React.Component {
    render() {
      return (
        <AuthComponent {...this.props} />
      );
    }
  };
}
