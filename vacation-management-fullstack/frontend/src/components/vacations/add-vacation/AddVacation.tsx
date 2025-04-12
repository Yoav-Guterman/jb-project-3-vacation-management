import { useForm } from 'react-hook-form'
import './AddVacation.css'
import { ChangeEvent, useState } from 'react'
import VacationDraft from '../../../models/vacation/VacationDraft'
import VacationsService from '../../../services/auth-aware/Vacations'
import useService from '../../../hooks/useService'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/hooks'
import { newVacation } from '../../../redux/vacationsSlice'
import axios from 'axios'
import { showToast } from '../../common/toast/Toast'

export default function AddVacation(): JSX.Element {
    // Set up form handling with react-hook-form
    const { register, handleSubmit, reset, formState, getValues, watch, setValue } = useForm<VacationDraft>()

    // State for image preview
    const [previewImageSrc, setPreviewImageSrc] = useState<string>('')

    // State to track submission status
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // Navigation for redirecting after successful submission
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // Get the vacations service for API calls
    const vacationsService = useService(VacationsService)

    // get today's value so we can use it in the min for the can't select past dates
    const today = new Date().toISOString().split('T')[0];

    // Watch start date value
    const startDate = watch('startDate');

    // Calculate minimum end date (one day after start date)
    const minEndDateString = startDate
        ? new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1)).toISOString().split('T')[0]
        : today;


    // Handle form submission
    async function submit(draft: VacationDraft) {
        try {
            setIsSubmitting(true)

            // Convert FileList to File object if an image was uploaded
            if (draft.vacationImage) {
                draft.vacationImage = (draft.vacationImage as unknown as FileList)[0]
            }

            // Send the data to the server
            const newVacationFromServer = await vacationsService.create(draft)
            dispatch(newVacation(newVacationFromServer))

            // Reset the form and preview image
            reset()
            setPreviewImageSrc('')

            // Redirect to the vacations list page
            showToast.success(`vacation to ${newVacationFromServer.destination} successfully added`)
            navigate('/vacations')
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                showToast.error(err.response?.data || 'Error creating vacation');
            } else {
                showToast.error('Failed to create vacation. Please try again');
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    // Preview the image when selected
    function previewImage(event: ChangeEvent<HTMLInputElement>) {
        const file = event.currentTarget.files && event.currentTarget.files[0]
        if (file) {
            const imageSource = URL.createObjectURL(file)
            setPreviewImageSrc(imageSource)
        }
    }

    return (
        <div className='AddVacation'>
            <h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <label htmlFor="destination">Destination</label>
                    <input
                        id="destination"
                        placeholder='Enter destination'
                        {...register('destination', {
                            required: {
                                value: true,
                                message: 'destination is required'
                            },
                            minLength: {
                                value: 3,
                                message: 'destination must be at least 3 characters'
                            },
                            maxLength: {
                                value: 50,
                                message: 'destination must be less than 50 characters'
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
                                message: 'description is required'
                            },
                            minLength: {
                                value: 10,
                                message: 'description must be at least 10 characters'
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
                            min={today}
                            {...register('startDate', {
                                required: {
                                    value: true,
                                    message: 'start date is required'
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
                            disabled={!startDate}
                            {...register('endDate', {
                                required: {
                                    value: true,
                                    message: 'end date is required'
                                },
                                validate: value => {
                                    const startDate = new Date(getValues().startDate);
                                    const endDate = new Date(value);
                                    return endDate > startDate || 'End date must be after start date';
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
                                message: 'price is required'
                            },
                            min: {
                                value: 0,
                                message: 'price must be positive'
                            },
                            max: {
                                value: 10000,
                                message: 'price cannot exceed 10,000'
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
                        {...register('vacationImage', {
                            required: {
                                value: true,
                                message: 'vacation image is required'
                            }
                        })}
                        onChange={previewImage}
                    />
                    {formState.errors.vacationImage && (
                        <span className='error'>{formState.errors.vacationImage.message}</span>
                    )}

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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-submit"
                    >
                        {isSubmitting ? 'Adding Vacation...' : 'Add Vacation'}
                    </button>
                </div>
            </form>
        </div>
    )
}