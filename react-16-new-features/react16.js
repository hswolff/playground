const PrettyTime = ({ time }) => moment(time, 'MM-DD-YYYY').fromNow();

const DataCell = ({ data }) => (
  <section className="data-container">
    <header>
      {data.username} wrote this{' '}
      <i>
        <PrettyTime time={data.date} />
      </i>
    </header>
    <div>{data.message}</div>
  </section>
);

class Page extends React.Component {
  state = {
    data: generateData(),
  };

  reloadData = () => {
    this.setState({ data: [] });

    setTimeout(() => {
      this.setState({ data: generateData() });
    }, 1000);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.data.length === 0 ? (
          'Reloading'
        ) : (
          <button onClick={this.reloadData}>Reload Data</button>
        )}
        {this.state.data.map(datum => (
          <DataCell data={datum} key={datum.username} />
        ))}
      </React.Fragment>
    );
  }
}

const App = () => (
  <React.Fragment>
    <h1>React 16 Features</h1>
    <Page />
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('app'));
