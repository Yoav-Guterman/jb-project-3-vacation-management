import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import './Vacations.css'
import VacationsService from '../../../services/auth-aware/Vacations'
import useService from '../../../hooks/useService'
import Vacation from '../vacation/Vacation'
import { AuthContext } from '../../auth/auth/Auth'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/vacationsSlice'

export default function Vacations() {
    // State to store the vacations
    // const [vacations, setVacations] = useState<VacationModel[]>([])
    // State to track loading status
    const [isLoading, setIsLoading] = useState<boolean>(true)
    // State to track any fetch errors
    const [error, setError] = useState<string | null>(null)

    // Get the vacation service
    const vacationService = useService(VacationsService)

    const vacations = useAppSelector(state => state.vacations.vacations)
    const dispatch = useAppDispatch()


    // Get authentication context to check role
    const { role } = useContext(AuthContext)!
    const isAdmin = role === 'admin'


    // Fixed useEffect with proper dependency array
    useEffect(() => {
        // Create an async function to fetch vacations
        (async () => {
            try {
                setError(null)

                if (vacations.length === 0) {
                    const allVacationsFromService = await vacationService.getAllVacations()
                    dispatch(init(allVacationsFromService))
                }

            } catch (e) {
                // Handle errors properly
                console.error('Error fetching vacations:', e)
                setError('Failed to load vacations. Please try again later.')
            } finally {
                // Always set loading to false when done, whether successful or not
                setIsLoading(false)
            }
        }
        )()
    }, [])

    return (
        <div className='Vacations'>
            {/* Admin controls - only shown to admins */}
            {isAdmin && (
                <div className="admin-controls">
                    <Link to="/admin/add-vacation" className="add-btn">
                        Add New Vacation
                    </Link>
                </div>
            )}

            {/* Show loading indicator */}
            {isLoading && (
                <div className="loading-container">
                    <p>Loading vacations...</p>
                </div>
            )}

            {/* Show error message if there was a problem */}
            {error && (
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            )}

            {/* Show "no vacations" message if loaded but empty */}
            {!isLoading && !error && vacations.length === 0 && (
                <div className="empty-container">
                    <p>No vacations found.</p>
                </div>
            )}

            {/* Display vacations when loaded */}
            {!isLoading && !error && vacations.length > 0 && (
                <div className="vacations-grid">
                    {vacations.map(v => (
                        <Vacation
                            vacation={v}
                            key={v.id}
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}