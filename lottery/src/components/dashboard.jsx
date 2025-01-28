import { userSessionStore } from "../custom-hooks/user-session"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Dashboard = () => {
    console.log("Dashboard")
    const userData = userSessionStore((state) => state.user)
    console.log(userData);
    const navigate = useNavigate()

    useEffect(() => {
        if(userData.id === ""){
            navigate('/login', { replace: true })
        }
    }, [userData, navigate])

    return (
        <section className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="text-6xl">Dashboard</h1>
            <p>Welcome to your dashboard {userData.name}</p>
        </section>
    );
}

export { Dashboard }