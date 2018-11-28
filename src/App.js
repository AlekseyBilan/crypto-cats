import React, { Component } from 'react';
import Avatar from './Avatar';

class App extends Component {
  state = {
    loading: true,
    cats: [],
  };

  componentDidMount() {
    fetch('http://localhost:3001/cats')
      .then(r => r.json())
      .then(cats => {
          console.log('cats = ', cats);
        this.setState({
          loading: false,
          cats: cats,
        });
       /* const ws = new WebSocket('ws://cats.demo.javascript.ninja');
        ws.addEventListener('message', e => {
          const message = JSON.parse(e.data);
          if (message.action === 'add') {
            this.setState({
              cats: cats,
            });
          }

          if (message.action === 'update') {
            // Хинт для Кати: тут ошибка
            console.log(this.state.cats, message.cat.id);
            const cat = this.state.cats.find(({ id }) => id === message.cat.id);
            if (cat) {
              Object.assign(cat, message.cat);
              this.setState({ cats: [...cats, cat] });
            }
          }
        });*/
      });
  }

  render() {
    const cats = this.state.cats.sort((a, b) => a.generation - b.generation);
    return (
      <div className="App">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cats.map((c, idx) => [
              (idx > 1 && cats[idx - 1].generation !== c.generation) ||
              idx === 0 ? (
                <tr key={idx+c.generation}>
                  <td className="generation" colSpan={3}>
                    Generation {c.generation}
                  </td>
                </tr>
              ) : null,
              <tr key={c.id}>
                <td key={c.id}>
                  <Avatar src = {c.image_url}/>
                  {c.name}
                </td>
                <td>{Number(c.auction.start_price.slice(0, 5)).toFixed(2)} $</td>
                <td>Buy</td>
              </tr>,
            ])}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
