"use client";

import { useEffect, useState } from "react";

export default function TimeComponent() {
    const [time, setTime] = useState(null);

    useEffect(() => {
        setTime(Date.now());
    }, []);

    return <div>Current time: {time}</div>;
}
