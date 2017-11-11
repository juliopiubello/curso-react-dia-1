import React, { Component } from 'react';
import Post from './Post'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

class App extends Component {

  constructor(){
    super();

    this.state={
      posts: [],
      key: 1
    };
  }

  componentDidMount(){
    let state = localStorage.getItem('appState');
    state = JSON.parse(state);
    this.setState(state);
  }

  limparStorage(){
    localStorage.clear();
  }

  novoPost = () => {
    let name = prompt('Digite o nome do seu post');
    let text = prompt('Digite o nome do seu post');
    let post = {
      name: name,
      text: text
    }
    let novo = this.state.posts;
    novo.push(post);
    this.setState({posts: novo});
    this.saveInStorage();
  }

  saveInStorage(){
    let actualState = this.state;
    actualState = JSON.stringify(actualState);
    localStorage.setItem('appState', actualState);
  }

  render() {
    console.log(this.state)
    return (
        <MuiThemeProvider> 
          <div style={{padding:30, background:'#DDDDDD'}}>
          <button onClick={this.limparStorage}> clear </button>
          {
            this.state.posts.map((post, index) => 
              <div key={index} >
                <Post name={post.name} text={post.text} storageKey={index} />
              </div>)
          }
          <FlatButton label={'Novo post'} onClick={this.novoPost} />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
