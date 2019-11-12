import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";

class TrelloAddButton extends React.Component {
  state = {
    openForm: false
  };

  openForm = () => {
    this.setState({
      openForm: true
    });
  };

  closeForm = () => {
    this.setState({
      openForm: false
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addList(text));
    }
    return;
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addCard(listID, text));
    }
    return;
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add anoter card";
    const buttonTextOpacity = list ? "1" : "0.5";
    const buttonTextColor = list ? "White" : "inherit";
    const buttonTextBackgroundColor = list ? "rgba(0,0,0,.15)" : "inherit";

    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.openFormButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          background: buttonTextBackgroundColor
        }}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const buttonTitle = list ? "Add List" : "Add Card";

    return (
      <div>
        <Card
          style={{
            minHeight: 85,
            minWidth: 230,
            padding: 5
          }}
        >
          <Textarea
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            onChange={this.handleInputChange}
            value={this.props.text}
            style={{
              resize: "none",
              width: "100%",
              overflow: "hidden",
              outline: "none",
              border: "none"
            }}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            variant='contained'
            style={{
              color: "white",
              background: "#5aac44"
            }}
          >
            {buttonTitle}
          </Button>
          <Icon style={{ marginLeft: 7, cursor: "pointer" }}>close</Icon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.openForm ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
  openFormButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 240,
    paddingLeft: 9
  },
  formButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center"
  }
};

export default connect()(TrelloAddButton);
