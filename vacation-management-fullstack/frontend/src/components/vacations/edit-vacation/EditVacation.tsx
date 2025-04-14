import { useEffect, useState, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './EditVacation.css'
import { useForm } from 'react-hook-form'
import VacationDraft from '../../../models/vacation/VacationDraft'
import VacationsService from '../../../services/auth-aware/Vacations'
import useService from '../../../hooks/useService'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { update } from '../../../redux/vacationsSlice'
import LoadingButton from '../../common/loadingButton/LoadingButton'
import axios from 'axios'
import { showToast } from '../../common/toast/Toast'

export default function EditVacation(): JSX.Element {
    // State to track submission status
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);


    // State for image preview
    const [previewImageSrc, setPreviewImageSrc] = useState<string>('')

    // Get the vacation ID from URL params
    const { id } = useParams<'id'>()

    // Set up form handling with react-hook-form
    const { register, handleSubmit, formState, reset, getValues, watch, setValue } = useForm<VacationDraft>()

    // Navigation for redirecting after successful submission
    const navigate = useNavigate()

    // watch start date value
    const startDate = watch('startDate');

    // Calculate minimum end date (one day after start date)
    const minEndDateString = startDate
        ? new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1)).toISOString().split('T')[0]
        : ''; // Empty string as fallback

    // Get vacation from Redux state
    const vacation = useAppSelector(state =>
        state.vacations.vacations.find(v => v.id === id)
    )

    // Get the vacations service for API calls
    const vacationsService = useService(VacationsService)

    // Get the dispatch function for Redux
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Function to load vacation data from API
        async function loadVacationFromAPI() {
            try {
                if (id) {
                    // Show loading state if desired
                    const vacationData = await vacationsService.getVacation(id);

                    // Format and load data into form
                    reset({
                        destination: vacationData.destination,
                        description: vacationData.description,
                        startDate: new Date(vacationData.startDate).toISOString().split('T')[0],
                        endDate: new Date(vacationData.endDate).toISOString().split('T')[0],
                        price: vacationData.price
                    });

                    // Set image preview
                    if (vacationData.imageUrl) {
                        setPreviewImageSrc(vacationData.imageUrl);
                    }
                }
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    showToast.error(err.response?.data || 'Error getting vacation data');
                    navigate('/vacations')
                } else {
                    showToast.error('Failed to receive vacation data. Please try again');
                    navigate('/vacations')
                }
            } finally {
                setIsLoadingData(false); // End loading regardless of success or failure
            }
        }

        // If vacation exists in Redux, use it
        if (vacation) {

            setIsLoadingData(false);

            reset({
                destination: vacation.destination,
                description: vacation.description,
                startDate: new Date(vacation.startDate).toISOString().split('T')[0],
                endDate: new Date(vacation.endDate).toISOString().split('T')[0],
                price: vacation.price
            });

            // Set image preview if available
            if (vacation.imageUrl) {
                setPreviewImageSrc(vacation.imageUrl);
            }
        } else {
            // Otherwise, fetch from API
            loadVacationFromAPI();
        }
    }, []);


    // Handle form submission
    async function submit(draft: VacationDraft) {
        try {
            if (id) {
                setIsSubmitting(true)

                // Convert FileList to File object if a new image was uploaded
                if (draft.vacationImage && typeof draft.vacationImage !== 'string') {
                    draft.vacationImage = (draft.vacationImage as unknown as FileList)[0]
                }

                // Send the updated data to the server
                const updatedVacation = await vacationsService.update(id, draft)

                // Update Redux state
                dispatch(update(updatedVacation))

                showToast.success(`vacation to ${updatedVacation.destination} updated`)
                // Redirect back to the vacations list
                navigate('/vacations')
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                showToast.error(err.response?.data || 'An error occurred');
            } else {
                showToast.error('An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    // Preview the image when a new one is selected
    function previewImage(event: ChangeEvent<HTMLInputElement>) {
        const file = event.currentTarget.files && event.currentTarget.files[0]
        if (file) {
            const imageSource = URL.createObjectURL(file)
            setPreviewImageSrc(imageSource)
        }
    }

    return (
        <div className='EditVacation'>
            <h2>Edit Vacation</h2>

            {isLoadingData ? (
                <div className="loading-container">
                    <LoadingButton message="Loading vacation data" />
                </div>
            ) : (

                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                        <label htmlFor="destination">Destination</label>
                        <input
                            id="destination"
                            placeholder='Enter destination'
                            {...register('destination', {
                                required: {
                                    value: true,
                                    message: 'Destination is required'
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Destination must be at least 3 characters'
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Destination must be less than 50 characters'
                                }
                            })}
                        />
                        {formState.errors.destination && (
                            <span className='error'>{formState.errors.destination.message}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder='Enter vacation description'
                            {...register('description', {
                                required: {
                                    value: true,
                                    message: 'Description is required'
                                },
                                minLength: {
                                    value: 10,
                                    message: 'Description must be at least 10 characters'
                                },
                            })}
                        />
                        {formState.errors.description && (
                            <span className='error'>{formState.errors.description.message}</span>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                id="startDate"
                                type="date"
                                {...register('startDate', {
                                    required: {
                                        value: true,
                                        message: 'Start date is required'
                                    }
                                })}
                                onChange={(e) => {
                                    // Call the original onChange handler
                                    register('startDate').onChange(e);

                                    // Get the current end date
                                    const currentEndDate = getValues('endDate');

                                    // If there's an end date and it's now invalid, reset it
                                    if (currentEndDate && new Date(currentEndDate) <= new Date(e.target.value)) {
                                        setValue('endDate', '');
                                    }
                                }}
                            />
                            {formState.errors.startDate && (
                                <span className='error'>{formState.errors.startDate.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input
                                id="endDate"
                                type="date"
                                min={minEndDateString}
                                {...register('endDate', {
                                    required: {
                                        value: true,
                                        message: 'End date is required'
                                    }
                                })}
                            />
                            {formState.errors.endDate && (
                                <span className='error'>{formState.errors.endDate.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            type="number"
                            placeholder="$"
                            {...register('price', {
                                required: {
                                    value: true,
                                    message: 'Price is required'
                                },
                                min: {
                                    value: 0,
                                    message: 'Price must be positive'
                                },
                                max: {
                                    value: 10000,
                                    message: 'Price cannot exceed 10,000'
                                }
                            })}
                        />
                        {formState.errors.price && (
                            <span className='error'>{formState.errors.price.message}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="vacationImage">Cover Image</label>
                        <input
                            id="vacationImage"
                            type="file"
                            accept='image/png, image/jpeg, image/jpg, image/webp'
                            {...register('vacationImage')}
                            onChange={previewImage}
                        />

                        {previewImageSrc && (
                            <div className="image-preview">
                                <img src={previewImageSrc} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => navigate('/vacations')}
                            className="btn-cancel"
                        >
                            Cancel
                        </button>

                        {isSubmitting ?
                            <LoadingButton message={'Updating vacation'} /> :
                            <button
                                type="submit"
                                className="btn-submit"
                            >
                                Update Vacation
                            </button>
                        }
                    </div>
                </form>
            )}
        </div>
    )
}