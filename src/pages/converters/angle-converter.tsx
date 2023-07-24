"use client"

import { convertDegreesToPercent, convertPercentToDegrees } from "$utils/angle-helper";
import { useState } from "react";

export const AngleConverter = () => {

    const [degrees, setDegrees] = useState<number>(0);
    const [radians, setRadians] = useState<number>(0);
    
    const handleDegreesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadians(convertDegreesToPercent(e.target.value as unknown as number));
    }
    
    const handleRadiansChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDegrees(convertPercentToDegrees(e.target.value as unknown as number));
    }
    
    return (
        <div className="flex flex-col items-center gap-4">
        <h1>Kulma muunnin</h1>
        <div>
            <label>Astetta</label>
            <input type="number" className="ml-2 text-black" onChange={handleDegreesChange} />
            <p>prosenttia: {radians.toFixed(2)}</p>
        </div>
        <div>
            <label>Prosenttia</label>
            <input type="number" className="ml-2 text-black" onChange={handleRadiansChange} />
            <p>astetta: {degrees.toFixed(2)}</p>
        </div>
        </div>
    )
    }