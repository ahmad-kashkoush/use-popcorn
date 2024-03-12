import { useEffect, useState } from "react";
import ProbTypes from "prop-types";

const containerStyle = {
    alignItems: 'center',
    display: 'flex',
    gap: '10px'
}
const starContainerStyle = {
    display: "flex",
    gap: '4px',

}
//  You can add Prob types, to specify what types for each prob
StarRating.propTypes = {
    maxRating: ProbTypes.number,
    size: ProbTypes.number,
    defaultRating: ProbTypes.number,
    className: ProbTypes.string

}
export function StarRating({
    maxRating = 5,
    color = '#fcc419',
    size = 18,
    defaultRating = 3,
    className = "",
    onSetRating

}) {
    const [tempRating, setTempRating] = useState(defaultRating);
    const [rating, setRating] = useState(defaultRating);
    const textStyle = {
        fontSize: `${size}px`,
        color,

    }
    function handleSetRating(value) {
        setRating(value);
        onSetRating(value);
    }
    return (
        <div className={className} style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => {
                    return <Star
                        key={i}
                        full={(tempRating && i + 1 <= tempRating) || (!tempRating && i + 1 <= rating)}
                        onClick={() => handleSetRating(i + 1)}
                        onMouseEnter={() => setTempRating(i + 1)}
                        onMouseLeave={() => setTempRating(0)}
                        color={color}
                        size={size}
                    />
                })}
            </div>
            <div style={textStyle}>{tempRating || rating || ''}</div>

        </div>
    );
}
function Star({ onClick, onMouseLeave, onMouseEnter, full, color, size }) {
    const starStyle = {
        height: `${size}px`,
        width: `${size}px`
    }
    if (full)
        return (
            // Full
            <span
                style={starStyle}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={color}
                    stroke={color}
                >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                </svg>


            </span>
        )
    return (
        // Empty
        <span
            style={starStyle}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}

        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke={color}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
            </svg>
        </span>
    )

}