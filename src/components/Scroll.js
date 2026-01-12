import React from 'react'

function Scroll({ children }) {
    return (
        <div style={{ overflowY: 'scroll', border: '5px', padding: '10px' }}>
            {children}
        </div>
    )
}

export default Scroll