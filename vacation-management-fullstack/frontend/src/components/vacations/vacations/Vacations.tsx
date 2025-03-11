import { useEffect, useState } from 'react'
import './Vacations.css'
import VacationModel from '../../../models/vacation/Vacation'
import VacationsService from '../../../services/auth-aware/Vacations'
import useService from '../../../hooks/useService'
import Vacation from '../vacation/Vacation'

export default function Vacations() {

    const [vacations, setVacations] = useState<VacationModel[]>([])

    const vacationService = useService(VacationsService)


    // const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const allVacationsFromService = await vacationService.getAllVacations()
                setVacations(allVacationsFromService)
            } catch (e) {
                alert(e)
            }
        })()
    })


    return (
        <div className='Vacations'>
            {vacations.map(v =>
                <Vacation vacation={v} key={v.id} />
            )}
        </div>
    )
}