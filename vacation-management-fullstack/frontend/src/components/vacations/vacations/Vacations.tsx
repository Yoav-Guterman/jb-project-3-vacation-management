import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Vacations.css'
import VacationsService from '../../../services/auth-aware/Vacations'
import useService from '../../../hooks/useService'
import Vacation from '../vacation/Vacation'
import { AuthContext } from '../../auth/auth/Auth'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init, setCurrentPage } from '../../../redux/vacationsSlice'
import { useContext } from 'react'

export default function Vacations() {
    // State for loading and errors
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // Get services and state from Redux
    const vacationService = useService(VacationsService)
    const { vacations, currentPage, itemsPerPage } = useAppSelector(state => state.vacations)
    const dispatch = useAppDispatch()

    // Get user role
    const { role } = useContext(AuthContext)!
    const isAdmin = role === 'admin'

    // Calculate pagination
    const totalPages = Math.ceil(vacations.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentVacations = vacations.slice(startIndex, endIndex)

    // Load vacations
    useEffect(() => {
        async function loadVacations() {
            try {
                if (vacations.length === 0) {
                    const allVacations = await vacationService.getAllVacations()
                    dispatch(init(allVacations))
                }
            } catch (e) {
                console.error('Error fetching vacations:', e)
                setError('Failed to load vacations. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }

        loadVacations()
    }, [])

    // Handle page changes
    function handlePageChange(page: number) {
        if (page >= 1 && page <= totalPages) {
            dispatch(setCurrentPage(page))
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <div className='Vacations'>
            {/* Admin controls */}
            {isAdmin && (
                <div className="admin-controls">
                    <Link to="/admin/add-vacation" className="add-btn">
                        Add New Vacation
                    </Link>
                </div>
            )}

            {/* Content area with conditional rendering */}
            <div className="vacations-content">
                {isLoading ? (
                    <div className="loading-container">
                        <p>Loading vacations...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Try Again</button>
                    </div>
                ) : vacations.length === 0 ? (
                    <div className="empty-container">
                        <p>No vacations found.</p>
                    </div>
                ) : (
                    <>
                        {/* Vacations grid */}
                        <div className="vacations-grid">
                            {currentVacations.map(vacation => (
                                <Vacation
                                    key={vacation.id}
                                    vacation={vacation}
                                    isAdmin={isAdmin}
                                />
                            ))}
                        </div>

                        {/* Pagination - only show if more than one page */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="pagination-btn prev"
                                >
                                    Previous
                                </button>

                                {/* Page numbers */}
                                <div className="pagination-pages">
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="pagination-btn next"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}