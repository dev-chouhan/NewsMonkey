import React from 'react'
import loading from './loadingGIF.gif'

// export class Spinner extends Component {
const Spinner = () => {
    const loadingStyle = {
        height: "8rem",
        width: "9rem",
        filter: "invert(0.5)",
    }
    return (
        <div className='text-center'>
            <img src={loading} style={loadingStyle} alt="Loading..." />
            {/* <img src='https://giphy.com/embed/dgwAa9FIRTBeM' style={{pointerEvents: "none"}} alt="Loading..." /> */}
        </div>
    )
}

export default Spinner
