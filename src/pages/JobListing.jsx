import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import Loading from "@/components/Loading";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { BatteryChargingIcon, BatteryLow } from "lucide-react";
import { useEffect, useState } from "react";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery
  });
  console.log(loadingJobs);




  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return (
      <Loading/>

    );
  }
  return (
    <div>
      {loadingJobs && (
       <Loading/>
      )}
      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {jobs?.length ? (jobs.map((job) => (
            <JobCard 
            key={job.id} 
            job={job}
            savedInit={job?.saved?.length >0}
            />
          ))
          ) : (
            <span>Jobs not found</span>
          )
          }
        </div>
      )}
    </div>
  )
}

export default JobListing
