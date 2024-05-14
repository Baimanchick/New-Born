import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchDeliveryDetail } from '../store/features/delivery/deliveryDetailSlice'
import Loading from '../components/Loader/Loading'
import DeliveryTextDetail from '../components/Delivery/DeliveryTextDetail'

function DeliveryPage() {
    const delivery = useAppSelector((state) => state.deliveryDetail.deliveryDetail)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchDeliveryDetail())
            .then(() => setIsLoading(false))
    }, [dispatch])

    console.log(delivery);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='container'>
            <DeliveryTextDetail delivery={delivery} />
        </div>
    )

}

export default DeliveryPage;
