import supabaseClient from "@/utils/superbase";

export async function getJobs(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseClient(token);
    let query = supabase
        .from("jobs")
        .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

    if (location) {
        query = query.eq("location", location);
    }

    if (company_id) {
        query = query.eq("company_id", company_id);
    }

    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching Jobs:", error);
        return null;
    }

    return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
    const supabase = await supabaseClient(token);

    if (alreadySaved) {
        const { data, error: deleteError } = await supabase
            .from("saved_jobs")
            .delete()
            .eq("user_id", saveData.user_id)
            .eq("job_id", saveData.job_id);

            if(deleteError){
                console.error("Error removing saved job",deleteError);
                return null;
                
            }

            return data


    }else{
        const {data , error: insertError} = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select();

        if(insertError){
            console.error("Error saving job",insertError);
            return null;
            
        }
        return data;
    }
}

export async function getSavedJobs(token) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("*, job: jobs(*, company: companies(name,logo_url))");
  
    if (error) {
      console.error("Error fetching Saved Jobs:", error);
      return null;
    }
  
    return data;
  }
  