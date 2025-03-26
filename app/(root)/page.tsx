import React from 'react'
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import InterviewCard from "../../components/InterviewCard";
import {dummyInterviews} from "../../constants";

const Page = () => {
    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Ace Your Next Interview with <br/> AI-Driven Insights</h2>
                    <p className="text-lg">Simulate real-world interview scenarios and receive personalized feedback
                        instantly.</p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>
                <Image src='/robot.png' alt="robot-dude" width={400} height={400} className="max-sm:hidden"/>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}
                    {/*<p>You haven&apos;t taken any interview yet.</p>*/}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an Interviews</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview}  key={interview.id} />
                    ))}
                    {/*<p>There are no interviews available.</p>*/}
                </div>
            </section>
        </>
    )
}
export default Page
