import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 5;

const initialState = [
  {
    title: "First List",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "Content for first list - first card"
      },
      {
        id: `card-${1}`,
        text: "Content for first list - second card"
      }
    ]
  },
  {
    title: "Second List",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "Content for second list - first card"
      },
      {
        id: `card-${3}`,
        text: "Content for second list - second card"
      },
      {
        id: `card-${4}`,
        text: "Content for second list - third card"
      }
    ]
  }
];

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        id: `list-${listID}`,
        cards: []
      };
      listID += 1;
      return [...state, newList];

    case CONSTANTS.ADD_CARD:
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`
      };
      cardID += 1;
      return state.map(list => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        } else {
          return list;
        }
      });

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type
      } = action.payload;
      const newState = [...state];

      // dragging list around
      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      // In the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // Other list
      if (droppableIdStart !== droppableIdEnd) {
        //find the list where drag happened
        const listStart = state.find(list => droppableIdStart === list.id);

        //put out the card from the list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        //find the list where drag ended
        const listEnd = state.find(list => droppableIdEnd === list.id);

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;

    default:
      return state;
  }
};

export default listReducer;
