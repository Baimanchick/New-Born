import React from 'react'

function DeliveryTextDetail({ delivery }: any) {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: delivery.description }} />
        </div>
    )
}

export default DeliveryTextDetail