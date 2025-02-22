import React from "react";
import Navigation from "../../_components/Navigation";
import Product from "../../_components/Product";
import ComparisonSlider from "../../_components/ComparisonSlider";
import Container from "@/components/Container";
import Details from "../../_components/Details";
import Gallery from "../../_components/Gallery";
import Footer from "../../_components/Footer";
import Hero from "../../_components/Hero";

type StoreFrontType = {
  children: React.ReactNode;
};

const StoreFront: React.FC<StoreFrontType> = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Product />
      <Container maxWidth="lg" bgColor="bg-secondary">
        <div className="flex w-full flex-col items-center">
          <div className="mx-auto my-16 max-w-2xl text-center lg:max-w-4xl">
            <h2 className="text-primary text-xl font-bold tracking-tight sm:text-2xl">
              {`What you can expect your photos to look like when using my presets.`}
            </h2>
            <p className="text-muted-foreground mt-4">
              They work on a variety of shooting styles varying from landscape
              photography, portraits, night photography as well as urban
              environments, and I regularly use these on my high end commercial
              work.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2">
          <ComparisonSlider />
          <ComparisonSlider />
          <ComparisonSlider />
          <ComparisonSlider />
        </div>
      </Container>
      <Container maxWidth="lg">
        <Details />
      </Container>
      <Container maxWidth="lg">
        <Gallery />
      </Container>
      <Footer />
    </>
  );
};
export default StoreFront;
