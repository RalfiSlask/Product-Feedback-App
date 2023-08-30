import { createContext, ReactNode, useState, useEffect } from "react";

const Context = createContext<ContextVal | undefined>(undefined);

type ContextVal = {
    windowWidth: number;
    windowSize: string;
};

type ContextType = {
    children: ReactNode;
};

export const ContextProvider: React.FC<ContextType> = ( {children} ) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowSize, setWindowSize] = useState("");

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, []);

    useEffect(() => {
        if(windowWidth < 768) {
            setWindowSize("mobile")
        } else if(windowWidth < 1280) {
            setWindowSize("tablet")
        } else {
            setWindowSize("desktop")
        }
    }, [windowWidth]);

    const contextValue: ContextVal = {
        windowWidth: windowWidth,
        windowSize: windowSize,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )

}

export default Context;