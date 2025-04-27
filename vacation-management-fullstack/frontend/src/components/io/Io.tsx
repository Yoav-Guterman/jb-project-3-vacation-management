import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { v4 } from "uuid"
import { useAppDispatch } from "../../redux/hooks"
import { io } from "socket.io-client"
import SocketMessages from "socket-enums-yoavguterman";
import Vacation from "../../models/vacation/Vacation";
import { followVacation, newVacation, remove, unfollowVacation, update } from "../../redux/vacationsSlice";
import User from "../../models/user/User";

interface SocketContextInterface {
    xClientId: string
}

export const SocketContext = createContext<SocketContextInterface>({
    xClientId: ''
})


export default function Io(props: PropsWithChildren): JSX.Element {

    const { children } = props

    const [xClientId] = useState<string>(v4())
    const value = { xClientId }

    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_IO_SERVER_URL)

        socket.onAny((eventName, payload) => {

            if (payload.from !== xClientId) {
                switch (eventName) {
                    case SocketMessages.ADD_VACATION:
                        {
                            const newVacationPayload = payload.data as Vacation
                            dispatch(newVacation(newVacationPayload))
                            break;
                        }
                    case SocketMessages.REMOVE_VACATION:
                        {
                            const deleteVacationPayload = payload.data as { id: string }
                            dispatch(remove(deleteVacationPayload))
                            break;
                        }
                    case SocketMessages.UPDATE_VACATION:
                        {
                            const deleteVacationPayload = payload.data as Vacation
                            dispatch(update(deleteVacationPayload))
                            break;
                        }
                    case SocketMessages.FOLLOW_VACATION:
                        {
                            const followVacationsPayload = payload.data as { vacationId: string, user: User }
                            dispatch(followVacation(followVacationsPayload))
                            break;
                        }
                    case SocketMessages.UNFOLLOW_VACATION:
                        {
                            const unfollowVacationsPayload = payload.data as { vacationId: string, user: User }
                            dispatch(unfollowVacation(unfollowVacationsPayload))
                            break;
                        }
                }
            }


        })

        return () => {
            socket.disconnect()
        }

    }, [])

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )

}