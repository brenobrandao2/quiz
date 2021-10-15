import React, { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext({})
const keyUser = 'user'

export default function AuthProvider({ children }) {
    const [user, setUser] = useState()

    useEffect(() => {
        loadUser()
    },[])

    function loadUser() {
        const storagedUser = localStorage.getItem(keyUser)
        if (storagedUser) {
            setUser(JSON.parse(storagedUser))
        }
    }

    function saveUser(user) {
        setUser(user)
        localStorage.setItem(keyUser, JSON.stringify(user))
    }

    function cleanUser() {
        setUser(undefined)
        localStorage.removeItem(keyUser)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                saveUser,
                cleanUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useUser() {
    const context = useContext(AuthContext)
    const { user, saveUser, cleanUser } = context

    return [user, saveUser, cleanUser]
}