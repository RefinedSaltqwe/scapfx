import DynamicTitle from "@/components/DynamicTitle";
import { siteConfig } from "config/site";
import Image from "next/image";

export default function AboutMe() {
  return (
    <>
      <DynamicTitle title={`About Me | ${siteConfig.name}`} />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-4">
              <Image
                alt="Your Portrait"
                width={150}
                height={150}
                src="https://live.staticflickr.com/65535/54344995695_1dd728d26d_b.jpg"
                className="h-auto w-full rounded-3xl object-cover shadow-2xl"
              />
            </div>
            <div>
              <div className="text-gray-700 lg:max-w-lg">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  {`Hi, I'm Stephen Pelagio`}
                </h1>
                <p className="mt-6">
                  {`My journey into photography started back in high school when I first got into Photoshop. Experimenting with editing opened up a whole new world for me.`}
                </p>
                <p className="mt-6">
                  {`When I started university as an IT student, I got into photo manipulations, but I relied on online resources for my images, which was time-consuming since finding the right pictures with the right angles was a challenge. I got my first camera when I moved to Canada, and that's when my true passion for capturing moments began.`}
                </p>
                <p className="mt-6">
                  {`At first, I was just taking photos as resources for my Photoshop manipulations, but everything changed when I discovered Lightroom. I became obsessed with it, but I didn't have a specific aesthetic for my images. I just edited whatever I thought worked for the photos.`}
                </p>
                <p className="mt-6">
                  {`Over time, I gravitated towards street, portrait, lifestyle and landscape photography—each style telling a unique story through my lens. It took me a couple of years to finally discover the aesthetic that I like.`}
                </p>
                <p className="mt-6">
                  {`Now, I create and share premium Lightroom presets, helping others achieve their desired aesthetics effortlessly. Photography isn't just a hobby for me; it's my way of capturing the beauty in everyday life.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
