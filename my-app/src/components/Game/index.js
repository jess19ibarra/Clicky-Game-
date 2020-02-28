import React, { Component } from "react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import ClickItem from "../ClickItem";
import Footer from "../Footer";
import characters from "../../characters.json";

class Game extends Component {
  state = {
    characters,
    score: 0,
    topScore: 0
  };

  componentDidMount() {
    this.setState({ characters: this.shuffleData(this.state.characters) });
  }

  handleCorrectGuess = newData => {
    const { topScore, score } = this.state;
    const newScore = score + 1;
    const newTopScore = Math.max(newScore, topScore);

    this.setState({
      characters: this.shuffleData(newData),
      score: newScore,
      topScore: newTopScore
    });
  };

  handleIncorrectGuess = data => {
    this.setState({
      characters: this.resetData(data),
      score: 0
    });
  };

  resetData = characters => {
    const resetData = characters.map(item => ({ ...item, clicked: false }));
    return this.shuffleData(resetData);
  };

  shuffleData = characters => {
    let i = characters.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = characters[i];
      characters[i] = characters[j];
      characters[j] = temp;
      i--;
    }
    return characters;
  };

  handleItemClick = id => {
    let guessedCorrectly = false;
    const newData = this.state.characters.map(item => {
      const newItem = { ...item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          guessedCorrectly = true;
        }
      }
      return newItem;
    });
    guessedCorrectly
      ? this.handleCorrectGuess(newData)
      : this.handleIncorrectGuess(newData);
  };

  render() {
    return (
      <div>
        <Nav score={this.state.score} topScore={this.state.topScore} />
        <Header />
        <Container>
          {this.state.characters.map(item => (
            <ClickItem
              key={item.id}
              id={item.id}
              shake={!this.state.score && this.state.topScore}
              handleClick={this.handleItemClick}
              image={process.env.PUBLIC_URL + item.image}
            />
          ))}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Game;
