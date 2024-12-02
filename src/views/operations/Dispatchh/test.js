import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DragAndDropMultipleLines = () => {
  // Initial state for each line
  const [lines, setLines] = useState({
    line1: [
      { id: '1', content: 'Product 1' },
      { id: '2', content: 'Product 2' },
      { id: '3', content: 'Product 3' },
      { id: '4', content: 'Product 4' },
      { id: '5', content: 'Product 5' },
      { id: '6', content: 'Pass Completed 1' },
      { id: '7', content: 'Pass Completed 2' },
      { id: '8', content: 'Pass Completed 3' },
      { id: '9', content: 'Pass Completed 4' },
    ],
    line2: [
      { id: '21', content: 'Product 2' },
      { id: '22', content: 'Pass Completed 2' },
    ],
    line3: [
      { id: '31', content: 'Product 3' },
      { id: '32', content: 'Pass Completed 3' },
    ],
    line4: [
      { id: '41', content: 'Product 4' },
      { id: '42', content: 'Pass Completed 4' },
    ],
  });

  // Handle drag end
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Reorder within the same line
    if (source.droppableId === destination.droppableId) {
      const lineItems = Array.from(lines[source.droppableId]);
      const [movedItem] = lineItems.splice(source.index, 1);
      lineItems.splice(destination.index, 0, movedItem);

      setLines((prev) => ({
        ...prev,
        [source.droppableId]: lineItems,
      }));
    }
  };

  // Render lines with their respective droppable areas
  const renderLine = (lineKey, items) => (
    <Droppable droppableId={lineKey} key={lineKey}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            marginBottom: '20px',
            padding: '20px',
            background: '#e0e0e0',
            minHeight: '100px',
          }}
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided1) => (
                <div
                  ref={provided1.innerRef}
                  {...provided1.draggableProps}
                  {...provided1.dragHandleProps}
                  style={{
                    padding: '16px',
                    margin: '0 0 8px 0',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    ...provided1.draggableProps.style,
                  }}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {Object.entries(lines).map(([lineKey, items]) => renderLine(lineKey, items))}
      </div>
    </DragDropContext>
  );
};

export default DragAndDropMultipleLines;
