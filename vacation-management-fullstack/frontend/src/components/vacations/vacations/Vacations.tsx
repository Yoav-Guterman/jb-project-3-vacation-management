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
import LoadingButton from '../../common/loadingButton/LoadingButton'

// Define filter types as an enum for type safety
enum FilterType {
    NONE = "none",
    FOLLOWING = "following",
    UPCOMING = "upcoming",
    ACTIVE = "active"
}

export default function Vacations() {
    // State for loading and errors
    const [error, setError] = useState<string | null>(null)

    // Add filter state
    const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.NONE)

    // Get services and state from Redux
    const vacationService = useService(VacationsService)
    const { vacations, currentPage, itemsPerPage, isLoading } = useAppSelector(state => state.vacations)
    const dispatch = useAppDispatch()

    // Get user info
    const { user } = useContext(AuthContext)!
    const isAdmin = user?.role === 'admin'

    // Apply filters to vacations
    const filteredVacations = vacations.filter(vacation => {
        const today = new Date();
        const startDate = new Date(vacation.startDate);
        const endDate = new Date(vacation.endDate);

        switch (activeFilter) {
            case FilterType.FOLLOWING:
                return vacation.followers?.some(follower => follower.id === user?.id);
            case FilterType.UPCOMING:
                return startDate > today;
            case FilterType.ACTIVE:
                return startDate <= today && endDate >= today;
            default:
                return true; // No filter applied
        }
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredVacations.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentVacations = filteredVacations.slice(startIndex, endIndex)

    // Load vacations
    useEffect(() => {
        (async () => {
            try {
                const allVacations = await vacationService.getAllVacations()
                dispatch(init(allVacations))

            } catch (e) {
                console.error('Error fetching vacations:', e)
                setError('Failed to load vacations. Please try again later.')
            }
        })()
    }, [])

    // When filter changes, reset to first page
    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [activeFilter, dispatch]);

    // Handle filter change
    function handleFilterChange(newFilter: FilterType) {
        setActiveFilter(newFilter);
    }

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
                    <Link to="/admin/stats" className="stats-btn">
                        View Stats
                    </Link>
                </div>
            )}

            {/* Filter controls - only show for regular users, not for admins */}
            {!isAdmin && (
                <div className="filter-controls">
                    <div className="filter-title">Filter Vacations:</div>
                    <div className="filter-options">
                        <label className="filter-option">
                            <input
                                type="radio"
                                name="vacation-filter"
                                value={FilterType.NONE}
                                checked={activeFilter === FilterType.NONE}
                                onChange={() => handleFilterChange(FilterType.NONE)}
                            />
                            <span>All Vacations</span>
                        </label>

                        <label className="filter-option">
                            <input
                                type="radio"
                                name="vacation-filter"
                                value={FilterType.FOLLOWING}
                                checked={activeFilter === FilterType.FOLLOWING}
                                onChange={() => handleFilterChange(FilterType.FOLLOWING)}
                            />
                            <span>My Followed Vacations</span>
                        </label>

                        <label className="filter-option">
                            <input
                                type="radio"
                                name="vacation-filter"
                                value={FilterType.UPCOMING}
                                checked={activeFilter === FilterType.UPCOMING}
                                onChange={() => handleFilterChange(FilterType.UPCOMING)}
                            />
                            <span>Upcoming Vacations</span>
                        </label>

                        <label className="filter-option">
                            <input
                                type="radio"
                                name="vacation-filter"
                                value={FilterType.ACTIVE}
                                checked={activeFilter === FilterType.ACTIVE}
                                onChange={() => handleFilterChange(FilterType.ACTIVE)}
                            />
                            <span>Currently Active Vacations</span>
                        </label>
                    </div>
                </div>
            )}

            {/* Content area with conditional rendering */}
            <div className="vacations-content">
                {isLoading ? (
                    <div className="loading-container">
                        <LoadingButton message="Loading vacations" />
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Try Again</button>
                    </div>
                ) : filteredVacations.length === 0 ? (
                    <div className="empty-container">
                        <p>No vacations found with the selected filter.</p>
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