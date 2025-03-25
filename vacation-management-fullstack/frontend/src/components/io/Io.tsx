import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { v4 } from "uuid"
import { useAppDispatch } from "../../redux/hooks"
import { io } from "socket.io-client"
import SocketMessages from "socket-enums-yoavguterman";
import Vacation from "../../models/vacation/Vacation";
import { newVacation } from "../../redux/vacationsSlice";

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
            // should we even respond?
            // in other words:
            // if this event was initiate by "us"
            // then we should ignore it

            console.log(eventName, payload)

            if (payload.from !== xClientId) {
                switch (eventName) {
                    case SocketMessages.ADD_VACATION:
                        {
                            const newVacationPayload = payload.data as Vacation
                            dispatch(newVacation(newVacationPayload))
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

// enum SocketMessages {
//     ADD_VACATION = 'ADD_VACATION',
//     UPDATE_VACATION = "UPDATE_VACATION",
//     REMOVE_VACATION = "UPDATE_VACATION",
//     FOLLOW_VACATION = 'FOLLOW_VACATION',
//     UNFOLLOW_VACATION = 'UNFOLLOW_VACATION'
// }

// export default SocketMessages