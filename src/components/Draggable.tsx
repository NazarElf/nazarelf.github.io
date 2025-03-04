import React, {useImperativeHandle} from 'react';
import { useDraggable } from '@dnd-kit/core';



export const Draggable = React.forwardRef<{isDragging: boolean},{ children: React.ReactElement, id?: string | number }>((props, ref) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: props.id ?? 'draggable',
    });

    const angle = transform ? Math.atan(transform.x / transform.y) : 0
    const distance = transform ? Math.sqrt(transform.x ** 2 + transform.y ** 2) : 0
    const style = transform ? {
        translate: `${transform.x}px ${transform.y}px`,
        transform: `rotate(${-angle}rad) scale(1,${1 + distance / 1000}) rotate(${angle}rad)`
    } : undefined;
    const transition = `opacity .5s linear${isDragging ? "" : ", translate .3s cubic-bezier(0.16, 1, 0.3, 1), transform .3s cubic-bezier(0.16, 1, 0.3, 1)"}`
    
    useImperativeHandle(ref, () => ({
        isDragging: isDragging
    }))
    return (
        <button ref={setNodeRef} style={
            {
                ...style,
                padding: 0,
                border: 0,
                background: 'transparent',
                opacity: isDragging ? 0.5 : 1,
                transition: transition,
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: isDragging ? 1000 : undefined
            }
        } {...listeners} {...attributes}>
            {props.children}
        </button>
    );
})