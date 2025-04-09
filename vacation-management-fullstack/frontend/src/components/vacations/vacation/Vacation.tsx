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
import { showToast } from '../../common/toast/Toast';
import axios from 'axios';


interface VacationProps {
    vacation: VacationModel;
    isAdmin?: boolean;
}

export default function Vacation({ vacation, isAdmin }: VacationProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const vacationsService = useService(VacationsService);
    const followService = useService(FollowService);

    // Get user info from our Auth
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

    // Add this state to track whether confirmation is showing
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    function editMe() {
        navigate(`/admin/edit-vacation/${id}`);
    }

    function deleteMe() {
        // Show the confirmation instead of using the browser confirm
        setShowDeleteConfirm(true);
    }

    // async function deleteMe() {
    //     try {
    //         if (confirm(`Are you sure you want to delete this vacation to ${destination}?`)) {
    //             await vacationsService.remove(id);
    //             dispatch(remove({ id }));
    //             showToast.success(`Vacation to ${destination} deleted`);
    //         }
    //     } catch (err: unknown) {
    //         if (axios.isAxiosError(err)) {
    //             showToast.error(err.response?.data || 'An error occurred');
    //         } else {
    //             showToast.error('An unexpected error occurred');
    //         }
    //     }
    // }

    async function confirmDelete() {
        try {
            await vacationsService.remove(id);
            dispatch(remove({ id }));
            showToast.success(`Vacation to ${destination} deleted`);
            setShowDeleteConfirm(false);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                showToast.error(err.response?.data || 'An error occurred');
            } else {
                showToast.error('An unexpected error occurred');
            }
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
                showToast.success(`Successfully unfollowed ${destination} vacation`);
            } else {
                // Follow
                await followService.followVacation(id);
                dispatch(followVacation({ vacationId: id, user }));
                showToast.success(`Successfully followed ${destination} vacation`);
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                showToast.error(err.response?.data || 'An error occurred');
            } else {
                showToast.error('An unexpected error occurred');
            }
        }
        finally {
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

            {/* Image container with potential overlay */}
            <div className="vacation-image">
                {imageUrl && !imageError && (
                    <img
                        src={`${import.meta.env.VITE_AWS_SERVER_URL}/${imageUrl}`}
                        alt={destination}
                        onError={(e) => {
                            console.error(`Failed to load image`);
                            e.currentTarget.onerror = null;
                            setImageError(true);
                        }}
                    />
                )}

                {imageError && (
                    <div className="image-placeholder">Image Unavailable</div>
                )}

                {/* Delete confirmation overlay */}
                {showDeleteConfirm && (
                    <div className="delete-confirm-overlay">
                        <p>Are you sure you want to delete this vacation to {destination}?</p>
                        <div className="confirm-buttons">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="confirm-delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>

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