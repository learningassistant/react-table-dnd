// Package includes
import React from 'react';
import { ReactTableDefaults } from 'react-table'; // Contains react-table components, i.e. Tr, Th components
import { Draggable } from 'react-beautiful-dnd'; // Wrapper for our draggable TrComponent

/**
 * TrComponent wrapped in Draggable 
 * adapted from https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md
 */
const DraggableTrCopy = props => {
    const { children, info } = props;
    if (info) {
        const { original } = info;
        const { sortOrder } = original;
        return (
            <Draggable key={sortOrder} index={sortOrder-1} draggableId={'dr2' + sortOrder}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging ? 'pink' : '',
                            border: snapshot.isDragging ? '2px solid black' : '',
                            opacity: snapshot.isDragging ? '.8' : '',
                        }}
                    >
                        <ReactTableDefaults.TrComponent className={"draggable-tr"}>
                            {children}
                        </ReactTableDefaults.TrComponent>
                    </div>
                )}
            </Draggable>
        );
    } else {
        // ReactTable header or empty row
        return (
            <ReactTableDefaults.TrComponent>
                {children}
            </ReactTableDefaults.TrComponent>
        );
    }
}

export default DraggableTrCopy;