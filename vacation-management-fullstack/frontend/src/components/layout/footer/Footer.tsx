import './Footer.css'

export default function Footer() {
    return (
        <div className='Footer'>
            <p>yoav guterman - jb - 3rd project - vacation management</p>
            <p>server is: {import.meta.env.VITE_REST_SERVER_URL}</p>
        </div>
    )
}