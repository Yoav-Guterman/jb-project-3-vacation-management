import Vacation from "../../models/vacation/Vacation";
import VacationDraft from "../../models/vacation/VacationDraft";
import AuthAware from "./AuthAware";

export default class VacationsService extends AuthAware {
    async getAllVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations`)
        return response.data
    }

    // async getPost(id: string): Promise<Post> {
    //     const response = await this.axiosInstance.get<Post>(`${import.meta.env.VITE_REST_SERVER_URL}/profile/${id}`)
    //     return response.data
    // }

    async remove(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`)
        return response.data
    }

    async create(draft: VacationDraft): Promise<Vacation> {
        const response = await this.axiosInstance.post<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/`, draft, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        return response.data
    }

    async update(id: string, draft: VacationDraft): Promise<Vacation> {
        // const { title, body } = draft
        const response = await this.axiosInstance.patch<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`, draft, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        return response.data
    }

}