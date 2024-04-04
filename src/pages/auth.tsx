import { Button } from '@/components/ui/button'
import { FaGithubAlt, FaGoogle, FaSpinner } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Auth() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    async function signInWithGoogle() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log('user', user)
                console.log('token', token)
                console.log('credential', credential)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log('errorCode', errorCode)
                console.log('errorMessage', errorMessage)
                console.log('email', email)
                console.log('credential', credential)
                // ...
            });
    }
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <>
            <div className="container relative h-full lg:h-[800px] flex-col items-center justify-center flex md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col text-white lg:flex rounded-xl bg-center bg-[url('https://tse4.mm.bing.net/th/id/OIG4.DdSFXUhvLiG7T09y9oyn?pid=ImgGn')]">
                    <div className="relative p-10 mt-auto w-full pt-10 bg-slate-950/70">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This web application was developed at the behest of my father, who required
                                a convenient method for monitoring his work-related mileage.&rdquo;
                            </p>
                            <footer className="text-sm">Mattias Wiberg</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Sign in to your account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to login with your existing account or if you do not have one we will create one using it.
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <Label className="sr-only">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button disabled={isLoading}>
                                    {isLoading && (
                                        <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Sign In with Email
                                </Button>
                            </div>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" type="button" disabled={isLoading} onClick={signInWithGoogle}>
                            {isLoading ? (
                                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <FaGoogle className="mr-2 h-4 w-4" />
                            )}{" "}
                            Google
                        </Button>
                    </div>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By continuing, you agree to our{" "}
                        <NavLink
                            to="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </NavLink>{" "}
                        and{" "}
                        <NavLink
                            to="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </NavLink>
                        .
                    </p>
                </div>
            </div>
        </>
    )
}

export default Auth