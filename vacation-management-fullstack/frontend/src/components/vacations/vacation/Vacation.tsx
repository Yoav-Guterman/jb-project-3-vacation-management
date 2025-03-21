// src/components/vacations/vacation/Vacation.tsx
import { useNavigate } from 'react-router-dom';
import VacationModel from '../../../models/vacation/Vacation';
import './Vacation.css';
import { useContext, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import useService from '../../../hooks/useService';
import VacationsService from '../../../services/auth-aware/Vacations';
import { remove, followVacation, unfollowVacation } from '../../../redux/vacationsSlice';
import FollowService from '../../../services/auth-aware/Follows';
import { AuthContext } from '../../auth/auth/Auth';

interface VacationProps {
    vacation: VacationModel;
    isAdmin?: boolean;
}

export default function Vacation({ vacation, isAdmin }: VacationProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const vacationsService = useService(VacationsService);
    const followService = useService(FollowService);

    // Get user info from our custom hook
    const { user } = useContext(AuthContext)!

    const {
        id,
        destination,
        description,
        startDate,
        endDate,
        price,
        imageUrl,
        followers = [] // Ensure we have a followers array
    } = vacation;

    // Check if current user is following this vacation
    const isFollowing = user ? followers.some(follower => follower.id === user.id) : false;

    // Loading state for follow/unfollow button
    const [isFollowLoading, setIsFollowLoading] = useState(false);

    // Keep track of image loading errors
    const [imageError, setImageError] = useState<boolean>(false);

    function editMe() {
        navigate(`/admin/edit-vacation/${id}`);
    }

    async function deleteMe() {
        try {
            if (confirm(`Are you sure you want to delete this vacation to ${destination}?`)) {
                await vacationsService.remove(id);
                dispatch(remove({ id }));
            }
        } catch (e) {
            alert(e);
        }
    }

    async function handleFollowToggle() {
        if (!user) return; // Safety check

        try {
            setIsFollowLoading(true);

            if (isFollowing) {
                // Unfollow
                await followService.unfollowVacation(id);
                dispatch(unfollowVacation({ vacationId: id, user }));
            } else {
                // Follow
                await followService.followVacation(id);
                dispatch(followVacation({ vacationId: id, user }));
            }
        } catch (e) {
            console.error('Follow action failed:', e);
            alert('Failed to update follow status. Please try again.');
        } finally {
            setIsFollowLoading(false);
        }
    }

    return (
        <div className="Vacation">
            <h3>{destination}</h3>

            {/* Follow button for regular users (not admins) */}
            {!isAdmin && user && (
                <button
                    className={`follow-button ${isFollowing ? 'following' : ''}`}
                    onClick={handleFollowToggle}
                    disabled={isFollowLoading}
                >
                    {isFollowLoading
                        ? 'loading...'
                        : (
                            <>
                                {isFollowing ? '❤️' : '🤍'}
                                <span className="count"> {followers.length} followers </span>
                            </>
                        )
                    }
                </button>
            )}

            {imageUrl && !imageError && (
                <div className="vacation-image">
                    <img
                        src={imageUrl}
                        alt={destination}
                        onError={(e) => {
                            console.error(`Failed to load image: ${imageUrl}`);
                            e.currentTarget.onerror = null;
                            setImageError(true);
                        }}
                    />
                </div>
            )}

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
                    <button onClick={editMe}>Edit</button>
                    <button onClick={deleteMe}>Delete</button>
                </div>
            )}
        </div>
    );
}