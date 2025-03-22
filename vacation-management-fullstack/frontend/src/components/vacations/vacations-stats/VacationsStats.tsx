import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { init } from '../../../redux/vacationsSlice';
import useService from '../../../hooks/useService';
import VacationsService from '../../../services/auth-aware/Vacations';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './VacationsStats.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function VacationStats() {
    // Navigation and state management
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const vacationService = useService(VacationsService);

    // State for UI handling
    const [isExporting, setIsExporting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get vacations from Redux store
    const { vacations } = useAppSelector(state => state.vacations);

    // Fetch vacation data if needed
    useEffect(() => {
        async function loadData() {
            // Only fetch if vacations array is empty
            if (vacations.length === 0) {
                try {
                    setIsLoading(true);
                    const allVacations = await vacationService.getAllVacations();
                    dispatch(init(allVacations));
                } catch (error) {
                    console.error('Failed to load vacation data:', error);
                    setError('Failed to load vacation data. Please try again or go back to the vacations page.');
                } finally {
                    setIsLoading(false);
                }
            } else {
                // If we already have data, just update loading state
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    const sortedVacations = [...vacations].sort((a, b) =>
        a.destination.localeCompare(b.destination)
    );

    // Prepare chart data
    const chartData = {
        labels: sortedVacations.map(v => v.destination),
        datasets: [
            {
                label: 'Number of Followers',
                data: sortedVacations.map(v => v.followers?.length || 0),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart configuration options
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Vacations Report',
                font: {
                    size: 18
                }
            },
            legend: {
                position: 'top' as const,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Followers'
                },
                ticks: {
                    stepSize: 1
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Destination'
                }
            }
        }
    };

    // CSV export handler using the service approach
    const handleExportCSV = async () => {
        try {
            setIsExporting(true);

            // Use the service method to get CSV data
            const csvBlob = await vacationService.exportFollowersCSV();

            // Create a download URL
            const url = window.URL.createObjectURL(csvBlob);

            // Create a temporary link element (standard way to trigger downloads)
            const link = document.createElement('a');
            link.href = url;
            link.download = 'vacation_followers.csv';

            // Trigger download and clean up
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error exporting CSV:', error);
            alert('Failed to export data. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="VacationStats">
            <div className="stats-header">
                <h2>Vacation Statistics</h2>
                <div className="header-actions">
                    <button
                        className="back-btn"
                        onClick={() => navigate('/vacations')}
                    >
                        Back to Vacations
                    </button>
                    <button
                        className="export-btn"
                        onClick={handleExportCSV}
                        disabled={isExporting || isLoading}
                    >
                        {isExporting ? 'Exporting...' : 'Export to CSV'}
                    </button>
                </div>
            </div>

            {/* Content rendering based on loading and error states */}
            {isLoading ? (
                <div className="loading-container">
                    <p>Loading vacation statistics...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    <p>{error}</p>
                    <button
                        className="retry-btn"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            ) : vacations.length === 0 ? (
                <div className="no-data">
                    <p>No vacation data available to display.</p>
                </div>
            ) : (
                <>
                    <div className="chart-container">
                        <Bar data={chartData} options={chartOptions} />
                    </div>

                    <div className="stats-table">
                        <h3>Follower Details</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Destination</th>
                                    <th>Followers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedVacations.map(vacation => (
                                    <tr key={vacation.id}>
                                        <td>{vacation.destination}</td>
                                        <td>{vacation.followers?.length || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}