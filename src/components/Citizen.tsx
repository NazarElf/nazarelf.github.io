
import { BiomeName, NPC } from "../types";
import { Draggable } from "./Draggable";
import { useRef, useState } from "react";
import { useClientPoint, useFloating, useInteractions, offset, shift,flip } from "@floating-ui/react";


function precise(num: number){
    return Math.round((num + Number.EPSILON) * 1000) / 1000
}

function Citizen({ npc, list }: { npc: NPC, list?: [BiomeName, ...NPC[]] }) {

    const dragRef = useRef<{ isDragging: boolean }>(null)
    const [isOpen, setOpen] = useState(false)
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setOpen,
        placement: "bottom-start",
        middleware: [offset({ mainAxis: 10, crossAxis: 10 }), shift({}), flip({})]
    })

    const clientPoint = useClientPoint(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([
        clientPoint
    ])

    const points = list ? npc.status(list[0], ...(list.slice(1) as NPC[]).map(curr => curr.name)) : 0;

    const isDragging = dragRef.current?.isDragging

    return <>
        <Draggable id={npc.name} ref={dragRef}>
            <div className="citizen" ref={refs.setReference} {...getReferenceProps()} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                <div className="citizen-name">
                    {npc.name}
                </div>
                {points !== 0 && <div className="citizen-status">
                    {precise(points)}
                </div>}
            </div>
        </Draggable>
        {isOpen && !isDragging && <div className="citizen-info" ref={refs.setFloating} style={{ ...floatingStyles }} {...getFloatingProps()}>
            <span className="citizen-name">{npc.name}</span><br />
            {npc.loves.length > 0 && <>loves: {npc.loves.map(el => <span key={el} style={{ color: list?.some(listEl => typeof (listEl) === "string" ? listEl === el : listEl.name === el) ? "#FF2864" : undefined }}>{el} </span>)}<br /></>}
            {npc.likes.length > 0 && <>likes: {npc.likes.map(el => <span key={el} style={{ color: list?.some(listEl => typeof (listEl) === "string" ? listEl === el : listEl.name === el) ? "#96FF0A" : undefined }}>{el} </span>)}<br /></>}
            {npc.dislikes.length > 0 && <>dislikes: {npc.dislikes.map(el => <span key={el} style={{ color: list?.some(listEl => typeof (listEl) === "string" ? listEl === el : listEl.name === el) ? "orangered" : undefined }}>{el} </span>)}<br /></>}
            {npc.hates.length > 0 && <>hates: {npc.hates.map(el => <span key={el} style={{ color: list?.some(listEl => typeof (listEl) === "string" ? listEl === el : listEl.name === el) ? "red" : undefined }}>{el} </span>)}<br /></>}
        </div>}
    </>
}

export default Citizen;