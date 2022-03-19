import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import CountDownTimer from "./CountDownClass";
import useSound from 'use-sound';
//import boopSfx from './sounds/cuenta_regresiva.mp3';

//CSS
import "./app.css";

const PLAYERS = [
  {
    name: "Equipo Azul",
    score: 0,
    id: 1,
  },
  {
    name: "Equipo Rojo",
    score: 0,
    id: 2,
  },
  {
    name: "Equipo Verde",
    score: 0,
    id: 3,
  },
];

let nextId = 4;

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    (this.state = { running: false, elapsedTime: 0, previousTime: 0 }),
      (this.onStart = this.onStart.bind(this)),
      (this.onStop = this.onStop.bind(this)),
      (this.onReset = this.onReset.bind(this)),
      (this.onTick = this.onTick.bind(this)),
      (this.componentDidMount = this.componentDidMount.bind(this));
  }

  componentDidMount() {
    this.interval = setInterval(this.onTick, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onTick() {
    if (this.state.running) {
      const now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
  }

  onStart() {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  }
  onStop() {
    this.setState({ running: false });
  }

  onReset() {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  }

  render() {
    // let seconds = Math.floor(this.state.elapsedTime / 1000);
    // const hoursMinSecs = {hours:5, minutes: 0, seconds: 0}
    //<CountDownTimer hoursMinSecs={hoursMinSecs}/>
    // {this.state.running ? (<button onClick={this.onStop}> Stop </button>) : (<button onClick={this.onStart}> Start </button>)}<button onClick={this.onReset}> Reset </button>{" "}

    return (
      <div className="stopwatch pr-4">
        <h2 className="text-center"> Timer </h2>
        <div className="text-center">
          <CountDownTimer minutes={4} />
        </div>
      </div>
    );
  }
}

class AddPlayerForm extends React.Component {
  constructor(props) {
    super(props),
      (this.state = { name: "" }),
      (this.onNameChange = this.onNameChange.bind(this)),
      (this.onSubmit = this.onSubmit.bind(this));
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault(),
      this.props.onAdd(this.state.name),
      this.setState({ name: "" });
  }

  render() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input type="submit" value="Add Team" />
        </form>
      </div>
    );
  }
}

AddPlayerForm.propTypes = {
  onAdd: PropTypes.func,
};

function Stats(props) {
  const totalPlayers = props.players.length;
  const totalPoints = props.players.reduce(function (total, player) {
    return (total += player.score);
  }, 0);

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td> EQUIPOS:{" "} </td>
          <td> {totalPlayers} </td>
        </tr>
        <tr>
          <td> PUNTOS:{" "} </td>
          <td> {totalPoints} </td>
        </tr>
      </tbody>
    </table>
  );
}

Stats.propTypes = {
  players: PropTypes.array.isRequired,
};

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
    </div>
  );
}

Header.propTypes = {
  players: PropTypes.array.isRequired
};


function Title(props) {
  return (
    <h1 className="title">-- {props.title} --</h1>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired
};

function Counter(props) {
  return (
    <div className="counter">
      <button
        className="counter-action decrement"
        onClick={function () {
          props.onChange(-1);
        }}
      >
        {" "}
        -{" "}
      </button>{" "}
      <div className="counter-score"> {props.initialScore} </div>{" "}
      <button
        className="counter-action increment"
        onClick={function () {
          props.onChange(1);
        }}
      >
        {" "}
        +{" "}
      </button>{" "}
    </div>
  );
}

Counter.propTypes = {
  score: PropTypes.number,
  onChange: PropTypes.func,
};

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>
          {" "}
          X{" "}
        </a>{" "}
        {props.name}{" "}
      </div>{" "}
      <div className="player-score">
        <Counter initialScore={props.score} onChange={props.onScoreChange} />{" "}
      </div>{" "}
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func,
  onRemove: PropTypes.func,
};

class Application extends React.Component {
  constructor(props) {
    super(props),
      (this.state = { players: this.props.initialPlayers }),
      (this.onPlayerAdd = this.onPlayerAdd.bind(this)),
      (this.onRemovePlayer = this.onRemovePlayer.bind(this));
  }

  onScoreChange(index, delta) {
    //console.log("onScoreChange", index, delta);
    this.state.players[index].score += delta;
    this.setState(this.state);
  }

  onPlayerAdd(name) {
    console.log("Player added:", name),
      this.state.players.push({
        name: name,
        score: 0,
        id: nextId,
      });
    this.setState(this.state);
    nextId += 1;
  }

  onRemovePlayer(index) {
    this.state.players.splice(index, 1), this.setState(this.state);
  }

  render() {
    return (
      <div className="container my-5 bg-dark rounded-3">
          <div className="row">
            <div className="col text-center py-3"><Title title={this.props.title} /></div>
          </div>
          <div className="row px-2">
            <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pb-4"><Header players={this.state.players} /></div>
            <div className="col-12 col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 pb-4"><Stopwatch /></div>
          </div>
          <div className="row">
            <div className="col players">
                  {this.state.players.map(
                    function (player, index) {
                      return (
                        <Player
                          onScoreChange={function (delta) {
                            this.onScoreChange(index, delta);
                          }.bind(this)}
                          onRemove={function () {
                            this.onRemovePlayer(index);
                          }.bind(this)}
                          name={player.name}
                          score={player.score}
                          key={player.id}
                        />
                      );
                    }.bind(this)
                  )}
            </div>
          </div>
          <div className="row">
            <div className="col"><AddPlayerForm onAdd={this.onPlayerAdd} /></div>
          </div>
      </div>
    );
  }
}

Application.propTypes = {
  title: PropTypes.string,
  initialPlayers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
Application.defaultProps = { title: "MARCADOR" };

ReactDOM.render(
  <Application initialPlayers={PLAYERS} />,
  document.getElementById("container")
);
