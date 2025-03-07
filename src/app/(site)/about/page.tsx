import Image from "next/image";

export default function AboutMe() {
  return (
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
                {`My journey into photography started back in high school when I
                first got into Photoshop. Experimenting with editing opened up a
                whole new world for me. When I started university as an IT
                student, I got my first camera, and that’s when my love for
                capturing moments truly began.`}
              </p>
              <p className="mt-6">
                {`At first, I was just taking random shots, but everything changed
                when I discovered Lightroom. I became obsessed with perfecting
                the look and feel of my photos. Over time, I gravitated towards
                street, portrait, lifestyle, landscape, and travel
                photography—each style telling a unique story through my lens.`}
              </p>
              <p className="mt-6">
                {`Now, I create and share premium Lightroom presets, helping
                others achieve their desired aesthetics effortlessly.
                Photography isn't just a hobby for me; it's my way of capturing
                the beauty in everyday life.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
