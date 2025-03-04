import React, { useEffect, useState } from "react";
import { useNpcStore } from "../npcStore"

export default function SerializerOptions() {
    const { getJson, loadJson } = useNpcStore();
    const [data, setData] = useState();

    const file = new Blob([getJson()], { type: "application/json" });
    const saveHref = URL.createObjectURL(file)


    const onFileLoaded = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files?.length !== 0) {
            e.currentTarget.files[0].text().then(str => setData(JSON.parse(str)))
            e.currentTarget.value = ''
        }
    }

    useEffect(() => {
        if(Array.isArray(data) && (data as Array<unknown>).length !== 0){
            loadJson(data)
        }
    }, [data, loadJson])

    return <div className="options">
        <a className="option" href={saveHref} download={"settlement.json"}>Save</a>
        <label className="option" htmlFor="load">Load</label>
        <input type="file" accept="application/json" id="load" style={{ display: "none" }} onChange={onFileLoaded} />
    </div>
}