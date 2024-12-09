"use client";
import React from "react";
import BasePage from "../components/basecomponents/BasePage";
import Image from "next/image";
import Head from "next/head";

import ErrorBoundaryClass from "../components/Error/ErrorBoundaryClass";

const About: React.FC = () => {
  return (
    <ErrorBoundaryClass>
      <Head>
        <title>About Me - My Portfolio</title>
        <meta
          name="description"
          content="Learning more about my technical expertise and business-driven approach to problem-solving."
        />
      </Head>
      <div className="flex flex-col justify-center items-center">
        <BasePage
          mainTitle="About Me"
          subtitle="I work with multi-disciplinary teams to achieve technical and business
          goals effectively.
          I bring a well-rounded technical expertise to teams that want to
          provide the best experience for their users and drive business growth"
        />
        <Image
          className="rounded-lg mt-10"
          src="/images/ape.png"
          alt="main-image"
          height={500}
          width={500}
          layout="intrinsic"
        />
      </div>
    </ErrorBoundaryClass>
  );
};

export default React.memo(About);
