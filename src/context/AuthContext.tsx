import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import piggyTheBuilder from "@/assets/piggy-the-builder.png";

const AuthContext = createContext<User | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        auth.authStateReady().then(() => {
            setLoading(false);
        })

        const unsub = onAuthStateChanged(auth, (user: User | null) => {
            setUser(user)
        })

        return () => {
            unsub();
        }
    }, []);

    return (
        <>
            {
                loading ? (
                    <div className="h-screen flex justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                            <img src={piggyTheBuilder} alt="logo" className="w-1/2 h-1/2 animate-pulse" />
                            <div className="text-3xl font-bold mt-10">The piggy is building!</div>
                            <div className="text-[0.70rem] text-muted-foreground mt-1">
                                The website is currently under construction. Please wait for a while.
                            </div>
                        </div>
                    </div >
                ) :
                    <AuthContext.Provider value={user}>
                        {children}
                    </AuthContext.Provider>
            }
        </>
    );
}