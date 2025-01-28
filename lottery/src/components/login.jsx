import { userLogin } from "../controllers/login"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userSessionStore } from "../custom-hooks/user-session"


function UserLogin() {
    const [userData, setUserData] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState("")
    const navigate = useNavigate()
    const setUserSession = userSessionStore((state) => state.setUser)
    

    const getUserLogin = async () => {
        try{

            if(email && password){
                const loggedUser = await userLogin({email, password})

                if(Object.keys(loggedUser).length !== 0 && !loggedUser.error){
                    setUserSession(loggedUser)
                    setUserData(loggedUser)
                }else{
                    setLoginErrorMessage(loggedUser.error)
                    setLoginError(true)
                }
            }
            
        }catch(err){
            console.error("Couldn't get user login", err);
        }
    }

    useEffect(() => {
        if(userData.id){
            navigate('/dashboard', { replace: true, state: userData })
        }
    }, [userData, navigate])

    const loginHandler = (e) => {
        e.preventDefault()
        getUserLogin()
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                    Mexican Lottery Game
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                        </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                    Your email
                                    </label>
                                    <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required=""
                                    onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                    Password
                                    </label>
                                    <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    {loginError && <span className="text-red-700"> {loginErrorMessage} </span>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                        id="remember"
                                        aria-describedby="remember"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""
                                        ></input>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                        htmlFor="remember"
                                        className="text-gray-500 dark:text-gray-300"
                                        >
                                        Remember me
                                        </label>
                                    </div>
                                    </div>
                                    <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                    Forgot password?
                                    </a>
                                </div>
                                <button
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={(e) => loginHandler(e)}
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{' '}
                                    <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                    Sign up
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export {UserLogin}