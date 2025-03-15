import { useNavigate } from 'react-router-dom';
import VacationModel from '../../../models/vacation/Vacation';
import './Vacation.css';
import { useState } from 'react';

interface VacationProps {
    vacation: VacationModel;
    isAdmin?: boolean;
}

export default function Vacation({ vacation, isAdmin }: VacationProps) {
    const navigate = useNavigate();

    const {
        id,
        destination,
        description,
        startDate,
        endDate,
        price,
        imageUrl
    } = vacation;

    function handleEdit() {
        navigate(`/admin/edit-vacation/${id}`);
    }

    function handleDelete() {
        if (window.confirm('Are you sure you want to delete this vacation?')) {
            // Call your delete API here
            console.log(`Delete vacation ${id}`);
        }
    }

    // Keep track of image loading errors
    const [imageError, setImageError] = useState<boolean>(false);

    return (
        <div className="Vacation">
            <h3>{destination}</h3>

            {imageUrl && !imageError && (
                <div className="vacation-image">
                    <img
                        src={imageUrl}
                        alt={destination}
                        // Add these properties to improve image loading
                        loading="lazy"
                        onError={(e) => {
                            console.error(`Failed to load image: ${imageUrl}`);
                            // Prevent infinite error loops
                            e.currentTarget.onerror = null;
                            // Set a flag to track that this image failed
                            setImageError(true);
                            // You could also set a fallback image
                            // e.currentTarget.src = '/placeholder.jpg';
                        }}
                    />
                </div>
            )}

            {/* Optional: Show a placeholder when image fails to load */}
            {imageError && (
                <div className="vacation-image placeholder">
                    <div className="image-placeholder">Image Unavailable</div>
                </div>
            )}

            <div className="vacation-dates">
                <p>From: {new Date(startDate).toLocaleDateString()}</p>
                <p>To: {new Date(endDate).toLocaleDateString()}</p>
            </div>

            <p className="vacation-description">{description}</p>
            <p className="vacation-price">${price}</p>

            {/* Admin controls - only shown to admins */}
            {isAdmin && (
                <div className="vacation-actions">
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}