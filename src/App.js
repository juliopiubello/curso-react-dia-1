import React, { Component } from 'react';
import Post from './Post'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardText, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

//lembrr de colocar pra fechar dps do post
//colocar form para comentar

class App extends Component {

  constructor(){
    super();

    this.state={
      posts: [],
      key: 1,
      novoName:'',
      novoTexto:'',
      expanded: false
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
    let text = prompt('Digite o texto do seu post');
    let post = {
      name: name,
      text: text
    }
    let novo = this.state.posts;
    novo.push(post);
    this.setState({posts: novo});
    this.saveInStorage();
  }

  handleSubmit = () =>{
    let post = {
      name: this.state.novoName,
      text: this.state.novoTexto
    }

    let novo = this.state.posts;
    novo.push(post);
    this.setState({posts: novo});
    this.saveInStorage();
    this.zerarNomeTexto();
  }

  zerarNomeTexto= () =>{
    this.setState({novoName: ''});
    this.setState({novoTexto: ''});
  }
  
  saveInStorage(){
    let actualState = this.state;
    actualState = JSON.stringify(actualState);
    localStorage.setItem('appState', actualState);
  }

  handleChangeName = (event,value) => {
    this.setState({
      novoName: value,
    });
  }
  handleChangeTexto = (event,value) => {
    this.setState({
      novoTexto: value,
    });
  }

  handleExpand = () => {
    this.setState({expanded: true});
  }

  handleReduce = () => {
    this.setState({expanded: false});
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  render() {
    return (
        <MuiThemeProvider> 
          <div style={{padding:30, background:'#CCCCCC'}}>
          <FlatButton label={'Clear all posts from storage'} onClick={this.limparStorage} />
          <FlatButton label={'Novo post'} onClick={this.handleExpand} />
          <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} >
          <CardText expandable={true}>
            <div style={{padding:30,background:'#FFFFFF'}}>
              <label> INSIRA SEU POST </label>
              <FlatButton label={'Fechar'} onClick={this.handleReduce} />
              <br />
              <label> Nome </label>
              <TextField id="text-field-nome" value={this.state.novoName} onChange={this.handleChangeName} />
              <br />
              <label> Texto </label>
              <TextField id="text-field-text" value={this.state.novoTexto} onChange={this.handleChangeTexto} />
              <br />
              <FlatButton label="Submit" onClick={this.handleSubmit} onClickCapture={this.handleReduce} />
            </div>
          </CardText>
          </Card>
          {
            this.state.posts.map((post, index) => 
              <div key={index} >
                <Post name={post.name} text={post.text} storageKey={index} />
              </div>)
          }
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
