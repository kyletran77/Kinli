import React from 'react';
import "./ProgressBar.css"
export default function ProgressBar ({done}) {
    const [style, setStyle] = React.useState({});
    

    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width: `${done}%`
        }
    
        setStyle(newStyle);
    }, 200);
    
    return (
        <div className="progress">
            <div className="progress-done" style={style}>
                {done}%
            </div>
        </div>
    )
    
    
    }
    
    // const App = () => (
    // <>
    // <h1>React Progress Bar</h1>
    // <Progress done="100"/>
    // </>
    // );