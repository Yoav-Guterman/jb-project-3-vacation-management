// In VacationStats.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import useService from '../../../hooks/useService';
import VacationsService from '../../../services/auth-aware/Vacations';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './VacationsStats.css'
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function VacationStats() {
    const navigate = useNavigate();
    const vacationService = useService(VacationsService);
    const { vacations } = useAppSelector(state => state.vacations);
    const [isExporting, setIsExporting] = useState(false);

    // Chart data preparation
    const chartData = {
        labels: vacations.map(v => v.destination),
        datasets: [
            {
                label: 'Number of Followers',
                data: vacations.map(v => v.followers?.length || 0),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Vacations Report',
                font: { size: 18 }
            },
            legend: { position: 'top' as const },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Number of Followers' },
                ticks: { stepSize: 1 }
            },
            x: {
                title: { display: true, text: 'Destination' }
            }
        }
    };

    // Clean, React-friendly export function
    const handleExportCSV = async () => {
        try {
            setIsExporting(true);

            // Get the CSV data as a blob
            const csvBlob = await vacationService.exportFollowersCSV();

            // Create a download URL
            const url = window.URL.createObjectURL(csvBlob);

            // Create a temporary link element
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
                        disabled={isExporting}
                    >
                        {isExporting ? 'Exporting...' : 'Export to CSV'}
                    </button>
                </div>
            </div>

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
                        {vacations.map(vacation => (
                            <tr key={vacation.id}>
                                <td>{vacation.destination}</td>
                                <td>{vacation.followers?.length || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}