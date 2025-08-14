import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function SignUpPage(){
    return(
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full lg:flex flex-col items-center justify-center px-4">
                <div className="text-center space-y-4 pt-16">
                    <h1 className="text-3xl font-bold">
                        Welcome to Fitra
                    </h1>
                    <p className="text-base text-muted-foreground">
                        Sign up to create your account
                    </p>
                    <ClerkLoaded>
                        <SignUp path="/sign-up"/>
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="animate-spin text-muted-foreground"/>
                    </ClerkLoading>
                </div>
            </div>
            <div className="h-full bg-blue-700 hidden lg:flex items-center justify-center">
                <Image src="/logo2.svg" alt="Logo" width={100} height={100}/>
            </div>
        </div>
    )
}