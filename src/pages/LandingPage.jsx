import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faq from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import UniqueGetHiredCard from "@/components/Gethired";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center ">
        <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold font-serif text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Explore Your Dream Job
          <span className="flex items-center gap-2 sm:gap-6">
            And Get
            <img

              src="/hired.png"
              className="h-14 sm:h-24 lg:h-32 bg-gray-800 rounded-3xl"
              alt="Hirrd Logo"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-sm  sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to="/jobs">
          <Button variant="blue" size="lg">
            Find Jobs
          </Button>

        </Link>
        <Link to="/post-job" >
          <Button variant="red" size="lg">
            Post a Job
          </Button>

        </Link>
      </div>
      <div className=" flex flex-grow bg-gradient-to-br from-cyan-900 via-gray-900 to-white; rounded-full p-2 ">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000
            }),
          ]}
          className="w-full py-10  "
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 " >
                <img src={path} alt={name} className="h-6 sm:h-14 object-contain" />
              </CarouselItem>

            ))}
          </CarouselContent>
        </Carousel>
      </div>


      <img src="/geth.png" className="w-full" />

      <section>
        <UniqueGetHiredCard />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3   gap-2 sm:gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Demo card</CardTitle>
          </CardHeader>
          <CardContent>
            Demo job
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>
      <Accordion type="single" collapsible >
        {faq.map(({ question, answer }, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`} className="border-b last:border-none">
            <AccordionTrigger className="bg-gradient-to-br from-cyan-900 via-gray-900 to-white; text-white text-lg font-semibold py-3 px-4 rounded-t-md hover:bg-gradient-to-r hover:from-blue-900 hover:to-red-600 transition-all">
              {question}
            </AccordionTrigger>
            <AccordionContent className="bg-white text-gray-700 text-base p-4 rounded-b-md">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>




    </main>
  )
}

export default LandingPage
