import VacationModel from '../../../models/vacation/Vacation'
import './Vacation.css'

interface VacationProps {
    vacation: VacationModel,
    // isAllowActions?: boolean,
}

export default function Vacations(props: VacationProps) {

    const {
        destination,
        description,
        endDate,
        startDate,
        price,
        imageUrl
    } = props.vacation

    return (
        <div className='Vacation'>
            <p>destination: {destination}</p>
            <p>description: {description}</p>
            <p>start date: {(new Date(startDate)).toLocaleDateString()}</p>
            <p>end date: {(new Date(endDate)).toLocaleDateString()}</p>
            <p>price: {price}</p>
            {imageUrl && <div>
                <img src={imageUrl} />
            </div>}

            {/* {props.isAllowActions &&
                <div>
                    <button onClick={editMe}>Edit</button>
                    <button onClick={deleteMe}>Delete</button>
                </div>
            } */}
        </div>
    )
}