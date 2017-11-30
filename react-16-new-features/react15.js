const PrettyTime = ({ time }) => (
  <span>{moment(time, 'MM-DD-YYYY').fromNow()}</span>
);

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
      <div>
        {this.state.data.length === 0 ? (
          'Reloading'
        ) : (
          <button onClick={this.reloadData}>Reload Data</button>
        )}
        {this.state.data.map(datum => (
          <DataCell data={datum} key={datum.username} />
        ))}
      </div>
    );
  }
}

const App = () => (
  <div>
    <h1>React 15 Features</h1>
    <Page />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
