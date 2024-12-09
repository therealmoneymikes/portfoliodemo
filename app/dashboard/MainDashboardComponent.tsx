"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, Button, Tabs, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import DateRangePicker from "@/app/components/DateRangePicker";
import {
  AiFillNotification,
  AiFillShopping,
  AiOutlineDollarCircle,
  AiOutlineDownload,
  AiOutlineUser,
} from "react-icons/ai";

import NotificationsCard from "../components/NotificationsCard";
import OverviewComponent from "../components/OverviewComponent";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../providers/auth/useAuthContext";

const kpiData = [
  {
    title: "Total Revenue",
    symbol: <AiOutlineDollarCircle />,
    value: 45231.89,
    percentageChange: "20.1",
  },
  {
    title: "Total Revenue",
    symbol: <AiOutlineUser />,
    value: 2350,
    percentageChange: "20.1",
  },
  {
    title: "Sales",
    symbol: <AiFillShopping />,
    value: 12334,
    percentageChange: "20.1",
  },
  {
    title: "Active Now",
    symbol: <AiFillNotification />,
    value: 574,
    percentageChange: "20.1",
  },
];
// interface Props {
//   params: { id: string };
// }

// const fallbackImage =
//   "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop";
// const dashboardOptions = ["Overview", "Products", "Settings"];
//make sure the component is captailised otherwise it's regular function
const MainDashboardComponent = () => {
  const session = useSession();
  const { isAuthenticated } = useAuthContext();
  const currentPath = usePathname();
  return (
    <div
      className={`border border-gray-800 ${
        currentPath === "/dashboard" &&
        (isAuthenticated || session.status === "authenticated")
          ? "h-[calc(100vh-100px)]"
          : "h-full"
      } overflow-y-auto`}
    >
      <div className="border border-gray-800 rounded-tl-lg rounded-tr-lg flex justify-start">
        {/* Nav */}
      </div>
      <motion.div className="flex flex-row items-center justify-between mx-10 pt-4 overflow-y-auto">
        {/* Top Header */}
        <motion.div>
          <motion.h1 className="text-4xl font-extrabold tracking-tighter mt-3">
            Dashboard
          </motion.h1>
        </motion.div>
        <motion.div className="flex flex-row items-center space-x-3">
          <DateRangePicker />
          <Button className="flex flex-row items-center justify-items-center">
            <AiOutlineDownload size={22} className="font-extrabold" />
            <p>Download</p>
          </Button>
        </motion.div>

        {/* Subheader  */}

        {/* Body */}
      </motion.div>
      {/* End of Dashboard + Search Bar */}

      {/* KPIs */}
      <motion.div className="space-x-2 flex flex-row justify-evenly mx-4 mt-2">
        {kpiData.map((kpi, index) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            key={index}
            className="px-5 py-7 relative rounded-xl flex flex-row items-start justify-between border ml-3 border-gray-800 w-1/4"
          >
            <motion.div className="flex flex-col items-start space-y-1 w-1/2">
              <p className="whitespace-nowrap">{kpi.title}</p>
              <motion.h1>
                <span>{index < kpiData.length - 1 ? "$" : "+"}</span>
                {kpi.value}
              </motion.h1>
              <p className="text-sm text-gray-600 whitespace-nowrap">
                <span>+</span>
                {kpi.percentageChange}
                {index < kpiData.length - 1
                  ? " from last month"
                  : " from the last hour"}
              </p>
            </motion.div>
            <motion.div>{kpi.symbol}</motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mini Sub */}
      <motion.div className="pt-4 ml-7">
        <Tabs.Root defaultValue="account">
          <Tabs.List className="text-white">
            <Tabs.Trigger tabIndex={0} value="account">
              Account
            </Tabs.Trigger>
            <Tabs.Trigger tabIndex={1} value="documents">
              Documents
            </Tabs.Trigger>
            <Tabs.Trigger tabIndex={2} value="settings">
              Settings
            </Tabs.Trigger>
          </Tabs.List>

          {/* Sign Out Option */}
          {/* Tabs Content */}
          <Box pt="5" className="flex flex-row items-start space-x-2">
            <Tabs.Content
              value="account"
              className="flex flex-row items-start justify-between space-x-10 "
            >
              <motion.div style={{ width: "100%" }}>
                <OverviewComponent />
              </motion.div>
              <motion.div>
                <NotificationsCard />
              </motion.div>
            </Tabs.Content>

            {/* Content 2 */}
            <Tabs.Content value="documents">
              <Text size="2">Access and update your documents.</Text>
            </Tabs.Content>

            {/* Content Three */}
            <Tabs.Content value="settings">
              <Text size="2">
                Edit your profile or update contact information.
              </Text>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </motion.div>
    </div>
  );
};

export default MainDashboardComponent;
