import { Link, useSearchParams } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, BriefcaseBusinessIcon, Heart, LucideBriefcaseBusiness, PenBox } from "lucide-react";
import { useEffect, useState } from "react";



export default function Header() {

    const [showSignIn, setShowSignIn] = useState(false);
    const [search, setSearch] = useSearchParams();
    const {user  } = useUser();
    useEffect(() => {
        if (search.get('sign-in')) {
            setShowSignIn(!showSignIn)
        }
    }, [search])

    const handleOverLayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false)
            setSearch({})
        }
    }

    return (
        <>
            <nav className="py-4 flex justify-between items-center">
                <Link>
                    <img src="/logo.png" alt="" className="h-20" />
                </Link>
                <div className="flex gap-8" >

                    <SignedOut>
                        <Button variant="outline" onClick={() => setShowSignIn(true)} >Login</Button>
                    </SignedOut>
                    <SignedIn>
                       { user?.unsafeMetadata?.role === "recruiter" && <Link to="/post-job" >
                            <Button variant='destructive' className="rounded-full">
                                <PenBox size={20} />
                                post a job
                            </Button>
                        </Link>}
                        <UserButton
                            appearance={
                                {
                                    elements: {
                                        avatarBox: "w-10 h-10"
                                    }
                                }
                            } >
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label="My jobs"
                                    labelIcon={<LucideBriefcaseBusiness size={15} />}
                                    href="/my-job"
                                />
                                <UserButton.Link
                                    label="Saved jobs"
                                    labelIcon={<Heart size={15} />}
                                    href="/saved-job"
                                />

                            </UserButton.MenuItems>

                        </UserButton>
                    </SignedIn>

                </div>
            </nav>
            {showSignIn && (
                <div
                    className=" fixed inset-0 items-center  z-10 backdrop-brightness-50 flex justify-center"
                    onClick={handleOverLayClick}
                >
                    <SignIn
                        signUpFallbackRedirectUrl="/onboarding"
                        fallbackRedirectUrl="/onboarding"
                    />
                </div>
            )}
        </>
    )
}
