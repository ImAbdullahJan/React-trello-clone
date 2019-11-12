import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardContainer = styled.div`
  margin-bottom: 7px;
`;

const TrelloCard = ({ text, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {provider => {
        return (
          <CardContainer
            ref={provider.innerRef}
            {...provider.dragHandleProps}
            {...provider.draggableProps}
          >
            <Card>
              <CardContent>
                <Typography>{text}</Typography>
              </CardContent>
            </Card>
          </CardContainer>
        );
      }}
    </Draggable>
  );
};

export default TrelloCard;
