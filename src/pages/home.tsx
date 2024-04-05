import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
    const user = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/auth')
        }
    }, [user])
    return (
        <div>Home</div>
    )
}

export default Home