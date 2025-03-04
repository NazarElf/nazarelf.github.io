import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: { children: React.ReactElement, id?: string | number }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id ?? 'droppable',
  });
  const style = {
    backgroundColor: isOver ? 'green' : undefined,
  };


  return (
    <div ref={setNodeRef} style={{...style, height: '100%'}}>
      {props.children}
    </div>
  );
}