import React from "react";
import { connect } from "react-redux";
import TrelloList from "./TrelloList";
import TrelloAddButton from "./TrelloAddButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends React.Component {
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className='App'>
          <h1>Hello</h1>
          <Droppable droppableId='all-lists' direction='horizontal' type='list'>
            {provided => {
              return (
                <ListsContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {lists.map((list, index) => (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={list.cards}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                  <TrelloAddButton list />
                </ListsContainer>
              );
            }}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
