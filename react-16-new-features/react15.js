class Notification extends React.Component {
  render() {
    return <div className="notification">{this.props.children}</div>;
  }
}

const PrettyDate = ({ date }) => (
  <span>{moment(date, 'MM-DD-YYYY').fromNow()}</span>
);

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
      <div>
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
          <DataCell data={datum} key={index} />
        ))}
      </div>
    );
  }
}

const App = () => (
  <div>
    <h1>React 15</h1>
    <Page />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
