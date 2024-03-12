import { useState } from "react";
import { ToggleButton } from "./ToggleButton";




export function ListBox({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
            <ToggleButton isOpen={isOpen} onToggle={() => setIsOpen((open => !open))} />
            {isOpen && children}
        </div>
    );
}
