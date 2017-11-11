import React, { Component } from 'react';
import {Card, CardActions, CardText, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Post extends Component {

  constructor(){
    super();

    this.state={
      name: 'Julio',
      likes: 0,
      isFavorite: false,
      comments: []
    }
  }

  componentDidMount(){
    let state = localStorage.getItem(this.props.storageKey);
    state = JSON.parse(state);
    this.setState(state);
  }



  giveLike(){
    let numLikes = this.state.likes;
    numLikes = numLikes + 1;
    let newState={
      likes: numLikes
    }
    console.log('GiveLikes');
    this.setState(newState);
    this.saveInStorage();
    
  }

  setFavorite(){
    let isFavorite = this.state.isFavorite;
    isFavorite = !isFavorite;

    this.setState({isFavorite: isFavorite});
    this.saveInStorage();
  }

  newComment(){
    let comments = this.state.comments;
    const newCommentText = prompt('Digite seu comentário');
    comments.push(newCommentText);
    this.setState({comments: comments});
    this.saveInStorage();

  }

  saveInStorage(){
    let actualState = this.state;
    actualState = JSON.stringify(actualState);
    localStorage.setItem(this.props.storageKey, actualState);
  }

  render() {

    console.log('Render do app');

    let favoriteText;

    if(this.state.isFavorite){
      favoriteText = 'Remover dos favoritos';
    }else{
      favoriteText = 'Favorito';
    }

    console.log(this.state);
    
    return (
    <Card style={{marginBottom:30}}>
        
        <CardText>
            <h1> {this.props.text} </h1>
            <h3> {this.props.name} </h3>
            <h4> {'Likes: ' + this.state.likes} </h4>
        </CardText>
        <CardActions showExpandableButton={true} > 
            <FlatButton
            label={'Like'} 
            onClick={this.giveLike.bind(this)} 
            />
            <FlatButton
            label={favoriteText} 
            onClick={this.setFavorite.bind(this)} 
            />
            <FlatButton
            label={'comentar'} 
            onClick={this.newComment.bind(this)} 
            />
        </CardActions>

            <CardText expandable={true}>
            {this.state.comments.map((text,index) => {
                return (<h4 style={{padding:15, background:'#BBBBBB'}} key={index} > {text} </h4>);
            })}
            </CardText>
    </Card>

    );
  }
}

export default Post;