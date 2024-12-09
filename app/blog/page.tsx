import { motion } from "framer-motion";
import React from "react";
import { useCustomThemeContext } from "../providers/theme/useCustomThemeProvider";
import BasePage from "../components/basecomponents/BasePage";

const BlogPage = () => {
  return (
    <div>
      <BasePage
        mainTitle="Blog"
        subtitle="I work with multi-disciplinary teams to achieve technical and business
          goals effectively.
          I bring a well-rounded technical expertise to teams that want to
          provide the best experience for their users and drive business growth"
      >
        
      </BasePage>
    </div>
  );
};

export default BlogPage;
