import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPin, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import useFetch from '@/hooks/useFetch';
import { saveJob } from '@/api/apiJobs';

function JobCard({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => { }
}) {
    const [saved, setSaved] = useState(savedInit);
    const {
        fn: fnSavedJob,
        data: savedJob,
        loading: loadingSavedJob
    } = useFetch(saveJob, {
        alreadySaved: saved,
    });

    const { user } = useUser();

    const handleSaveJob = async () => {
        const result = await fnSavedJob({
            user_id: user.id,
            job_id: job.id,
        });

        if (result) {
            setSaved(!saved); 
            onJobSaved();
        }
    };

    useEffect(() => {
        if (savedJob !== undefined) setSaved(savedJob?.length > 0);
    }, [savedJob]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between font-bold">
                    {job?.title}
                    {!isMyJob && (
                        <Trash2Icon
                            fill='red'
                            size={18}
                            className='text-red-500 cursor-pointer'
                        />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className='flex justify-between'>
                    {job?.company &&
                        <img
                            src={job?.company.logo_url}
                            className='h-6' />}
                    <div className='flex items-center gap-2'>
                        <MapPin size={15} /> {job.location}
                    </div>
                </div>
                <hr />
                {job?.description?.substring(0, job.description.indexOf("."))}
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.id}`}>
                    <Button variant="blue" className="w-[100%]">
                        More Details
                    </Button>
                </Link>
                {!isMyJob && (
                    <Button
                        variant="outline"
                        className="w-14"
                        onClick={handleSaveJob}
                        disabled={loadingSavedJob}
                    >
                        {saved ?
                            (<Heart size={20} stroke='green' fill="green" />) : (<Heart size={20}  />)
                        }
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

export default JobCard;
