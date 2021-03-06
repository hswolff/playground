class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    console.log(`Encountered an error! ${error.message}`);
  }

  render() {
    const errorContent =
      this.props.onError !== undefined ? this.props.onError() : null;
    return this.state.hasError ? errorContent : this.props.children;
  }
}

const notificationsRoot = document.getElementById('notifications');
class Notification extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div className="notification">{this.props.children}</div>,
      notificationsRoot
    );
  }
}

const PrettyDate = ({ date }) => moment(date, 'MM-DD-YYYY').fromNow();

const DataCell = ({ data }) => (
  <section className="row">
    <header>
      {data.user.username} &bull;{' '}
      <i>
        <PrettyDate date={data.date} />
      </i>
    </header>
    <div>{data.message}</div>
  </section>
);

class Page extends React.Component {
  state = {
    data: generateData(),
    includeError: false,
  };

  reloadData = (includeError = false) => {
    this.setState({ data: [], includeError });

    setTimeout(() => {
      this.setState({ data: generateData({ includeError }) });
    }, 1000);
  };

  render() {
    const hasData = this.state.data.length > 0;

    return (
      <React.Fragment>
        {!hasData && <Notification>Loading</Notification>}
        {hasData && (
          <button onClick={() => this.reloadData(false)}>Load New Data</button>
        )}
        {hasData && (
          <button onClick={() => this.reloadData(true)}>
            Load New Data w/ Error
          </button>
        )}
        {this.state.data.map((datum, index) => (
          <ErrorBoundary key={index}>
            <DataCell data={datum} />
          </ErrorBoundary>
        ))}
      </React.Fragment>
    );
  }
}

const App = () => (
  <React.Fragment>
    <h1>React 16</h1>
    <Page />
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('app'));
