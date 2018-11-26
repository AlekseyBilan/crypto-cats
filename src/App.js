import React, { Component } from 'react';

class App extends Component {
  state = {
    loading: true,
    cats: [],
  };

  componentDidMount() {
    fetch('http://cats.demo.javascript.ninja/cats')
      .then(r => r.json())
      .then(cats => {
        this.setState({
          loading: false,
          cats: cats,
        });
        const ws = new WebSocket('ws://cats.demo.javascript.ninja');
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
        });
      });
  }

  render() {
    const cats = this.state.cats.sort((a, b) => a.generation - b.generation);
    return (
      <div className="App">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Цена</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cats.map((c, idx) => [
              (idx > 1 && cats[idx - 1].generation !== c.generation) ||
              idx === 0 ? (
                <tr>
                  <td className="generation" colspan="3">
                    Generation {c.generation}
                  </td>
                </tr>
              ) : null,
              <tr>
                <td>
                  <img src={`http://cats.demo.javascript.ninja${c.image}`} />
                  {c.name}
                </td>
                <td>{c.price} MC</td>
                <td>Купить</td>
              </tr>,
            ])}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
