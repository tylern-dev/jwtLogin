import React, { Fragment } from 'react';


class Home extends React.Component {
  state = {
    response: '',
  }
  componentDidMount() {
    this.apiCall()
      .then((res) => {
        console.log(res.express);
        this.setState({ response: res.express });
      })
      .catch(err => console.log(err));
  }

  apiCall = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <Fragment>

        <h1 className="home">{this.state.response}</h1>
      </Fragment>
    );
  }
}

export default Home;
