import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  // console.log(isLoaded);
  const navigate = useNavigate();
  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs")
      })
      .catch((err) => {
        console.error("Error updating role", err);
      })
  }
  useEffect(()=>{
if(user?.unsafeMetadata?.role){
  navigate(user?.unsafeMetadata?.role ==="recruiter"?"/post-job":"/jobs")
}
  },[user])

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="animate-spin bg-blue-500 h-6 w-2 rounded-full "></div>
        <div className="animate-spin bg-pink-500 h-5 w-2 rounded-full "></div>
        <div className="animate-spin bg-purple-900 h-4 w-2 rounded-full "></div>
        <div className="animate-spin bg-gray-600 h-3 w-2 rounded-full "></div>
        <div className="animate-spin bg-white h-3 w-2 rounded-full "></div>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        Iam a..
      </h2>
      <div className="flex flex-row flex-grow item-center justify-between w-[100%] gap-11 mt-11">
        <Button variant = "blue" className= " w-[100%] h-36 text-xl"
        onClick={()=>handleRoleSelection("candidate")}
        > Candidate </Button>
        <Button variant = "red" className= " w-[100%] h-36 text-xl"
        onClick={()=>handleRoleSelection("recruiter")}
        
        > Recruiter</Button>
      </div>
    </div>
  )
}

export default Onboarding
