import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<User | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user: User | null) => {
            setUser(user)
        })

        return () => {
            unsub();
        }
    }, []);

    return (
        <>
            <AuthContext.Provider value={user}>
                {children}
            </AuthContext.Provider>
        </>
    );
}