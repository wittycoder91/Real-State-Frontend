import { RoughNotation } from "react-rough-notation";
import { FaArrowRight } from "react-icons/fa6";

import SectionHeading from "@/components/SectionHeading";
import NavigationButton from "@/components/NavigationButton";
import Tags from "./Tags";

const HeroPage = () => {
  return (
    <section className="flex flex-col md:flex-row gap-8 justify-between py-6">
      <div className="flex flex-col px-8 mt-12 gap-4 items-center">
        <SectionHeading className="text-center md:text-4xl">
          Find Your <br />
          <RoughNotation
            type="highlight"
            padding={[0, 50]}
            className="text-muted"
            animationDelay={1000}
            show={true}
          >
            <span className="text-white">Dream House</span>
          </RoughNotation>
        </SectionHeading>
        <p className="max-w-xs lg:max-w-sm text-center md:text-sm lg:text-base">
          Rent out your home stress-free, quickly and reliably with our
          end-to-end full management support; earn more compared to long-term
          rentals.
        </p>
        <NavigationButton
          to="/all-houses"
          className="max-w-fit rounded-full mt-4"
        >
          See More Houses <FaArrowRight className="ml-2" />
        </NavigationButton>
        <Tags />
      </div>

      <div className="px-4">
        <img
          src="/public/images/image1.jpg"
          className="rounded-3xl h-72 md:h-80 w-full lg:w-[35rem] lg:h-[25rem] xl:w-[40rem] xl:h-[25rem] object-cover"
          alt="home image"
        />
      </div>
    </section>
  );
};

export default HeroPage;
