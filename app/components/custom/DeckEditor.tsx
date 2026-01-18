import { useCallback, useEffect, useRef, useState, memo } from "react";
import { Menu } from "lucide-react"
import DeckLayout from "./DeckLayout";
import { useCardsStore } from "~/store/cards.store";
import {DeckCode} from "./DeckCode";

export default memo(function DeckEditor() {
    const CardsFromPlayer1 = useCardsStore((state) => state.CardsFromPlayer1);
    const CardsFromPlayer2 = useCardsStore((state) => state.CardsFromPlayer2);
    const [width, setWidth] = useState(375);
    const [barIcon, setBarIcon] = useState(false);
    const isResizing = useRef(false);

    const startResizing = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
    }, []);

    const stopResizing = useCallback(() => {
        isResizing.current = false;
    }, []);

    const resize = useCallback((e: MouseEvent) => {
        if (isResizing.current) {
            const newWidth = e.clientX;
            if (newWidth > 350 && newWidth < 800) {
                setWidth(newWidth);
            }
        }
    }, []);

    const closeBar = useCallback(() => {
        setBarIcon((prev) => !prev);
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    return (
    <div className="flex h-screen">
        {barIcon && (
                <Menu onClick={closeBar} className="w-6 h-6 text-primary absolute top-4 left-4" />
        )}

        <div 
            style={{ width: `${width}px` }} 
            className=
                {
                    `overflow-auto custom-scrollbar absolute lg:relative border-r border-border bg-black/85 p-4 h-full ${barIcon ? "hidden" : ""}`
                }
        >
            <div className="flex flex-col">
                <div className="flex flex-row gap-4 border-b border-border">
                    <Menu onClick={closeBar} className="w-6 h-6 text-primary" />
                    <h3 className="text-primary font-bold mb-4">Deck Editor</h3>
                </div>
                <DeckCode />
            </div>
        </div>
        {!barIcon && <div
            onMouseDown={startResizing}
            className="top-0 hidden lg:block right-0 w-1 h-full cursor-col-resize hover:bg-primary transition-colors"
        />}
        <div className="flex-1">
            <DeckLayout
                CardsFromPlayer1={CardsFromPlayer1}
                CardsFromPlayer2={CardsFromPlayer2}
            />
        </div>
    </div>
  );
})