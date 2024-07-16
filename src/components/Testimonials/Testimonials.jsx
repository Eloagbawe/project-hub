import "./Testimonials.scss";
import { Card, CardBody } from "@chakra-ui/react";

const Testimonials = () => {
  return (
    <div className="testimonials my-8 md:my-16 px-6">
      <div className="flex flex-wrap gap-3 justify-center testimonials__container">
        <Card className="w-full md:w-fit lg:w-[18%]">
          <CardBody className="flex flex-col justify-between">
            <p className="testimonials__quote mb-3">
              &quot;ProjectHub has revolutionized the way we manage our
              projects. It&apos;s incredibly user-friendly and efficient.&quot;
            </p>
            <p className="testimonials__user">Michael B.</p>
          </CardBody>
        </Card>
        <Card className="w-full md:w-fit lg:w-[18%]">
          <CardBody className="flex flex-col justify-between">
            <p className="testimonials__quote mb-3">
              &quot;I love how everything is organized in one place. ProjectHub
              has made my job so much easier.&quot;
            </p>
            <p className="testimonials__user">Emma H.</p>
          </CardBody>
        </Card>

        <Card className="w-full md:w-fit lg:w-[18%]">
          <CardBody className="flex flex-col justify-between">
            <p className="testimonials__quote mb-3">
              &quot;Managing tasks has never been easier.&quot;
            </p>
            <p className="testimonials__user">Sarah D.</p>
          </CardBody>
        </Card>

        <Card className="w-full md:w-fit lg:w-[18%]">
          <CardBody className="flex flex-col justify-between">
            <p className="testimonials__quote mb-3">
              &quot;ProjectHub has streamlined our workflow and increased
              productivity. We can&apos;t imagine managing projects without
              it.&quot;
            </p>
            <p className="testimonials__user">David W.</p>
          </CardBody>
        </Card>

        <Card className="w-full md:w-fit lg:w-[18%]">
          <CardBody className="flex flex-col justify-between">
            <p className="testimonials__quote mb-3">
              &quot;It&apos;s the best project management app we&apos;ve
              used.&quot;
            </p>
            <p className="testimonials__user">Laura A.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Testimonials;
