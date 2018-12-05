import React, { Component } from 'react';
//import CatsList from './CatsList';
import Category from './Category';

class App extends Component {
    constructor() {
        super();
        this.state = {
            cats: [],
            loading: true
        };
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3001/cats');
        const json = await response.json();
        this.setState({
            loading: false,
            cats: Object.assign(json)
        })
    }
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

  render() {
      let catsSortedByGen = [];
      try {
          catsSortedByGen = this.state.cats.reduce(function(acc, cat){
              if(acc[cat.generation-1]){
                  acc[cat.generation-1].push(cat);
              } else {
                  acc[cat.generation-1] = [cat];
              }
              return acc;
          }, []);
      } catch (e) {
          console.log('Error', e)
      }


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
            {Object.keys(catsSortedByGen).map(key => (
                    <Category key = {key} cats = {catsSortedByGen[key]} title = {`Generation ${Number(key)+1}`} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
