import { useNpcStore } from "../npcStore"


function precise(num: number){
    return Math.round((num + Number.EPSILON) * 1000) / 1000
}

export default function OverallStats() {
    const { getStatus } = useNpcStore();
    return <div className="score">Overall score: {precise(getStatus())}</div>
}