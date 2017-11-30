const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const PrettyTime = ({ children }) => moment(children, 'MM-DD-YYYY').fromNow();

const App = () => (
  <div style={styles}>
    <h1>App</h1>
    <h2>Start editing to see some magic happen {'\u2728'}</h2>
    <PrettyTime>10-31-2011</PrettyTime>
  </div>
);

function addScript(url) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

const react16 = [
  'https://unpkg.com/react@16.2.0/umd/react.development.js',
  'https://unpkg.com/react-dom@16.2.0/umd/react-dom.development.js',
];

Promise.all(react16.map(addScript)).then(render);

function render() {
  ReactDOM.render(<App />, document.getElementById('app'));
}
