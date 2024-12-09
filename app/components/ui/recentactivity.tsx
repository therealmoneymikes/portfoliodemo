"use client"
import {
  OpenInNewWindowIcon,
  DrawingPinFilledIcon,
  DrawingPinIcon,
  Share2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  Card,
  Heading,
  Flex,
  IconButton,
  Avatar,
  Box,
  Separator,
  Text
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { allPeople, email } from "./people";

type LayoutProps = React.ComponentPropsWithoutRef<typeof Flex> & {
  focusable?: boolean;
};

const RecentActivity = ({ focusable = true, ...props }: LayoutProps) => {
  // We’ll use a different portal container for homepage demo purposes; this is usually not needed.
  const [portalContainer, setPortalContainer] =
    React.useState<HTMLDivElement | null>(null);

  // Interactive elements may be not focusable for homepage demo purposes
  const tabIndex = focusable ? undefined : -1;

  // Simple state to make the example functional
  const [state, setState] = React.useState({
    todo: [
      { id: "a", completed: false },
      { id: "b", completed: false },
      { id: "c", completed: false },
      { id: "d", completed: false },
      { id: "e", completed: true },
      { id: "f", completed: true },
    ],
    activityPinned: true,
    financePinned: false,
  });
  return (
    <Card size="4">
      <Heading as="h3" size="6" trim="start" mb="2">
        Recent activity
      </Heading>

      <Flex position="absolute" top="0" right="0" m="3">
        <IconButton
          tabIndex={tabIndex}
          variant="ghost"
          color="gray"
          highContrast
          style={{ margin: 0, border: "1px solid red" }}
        >
          <OpenInNewWindowIcon width="20" height="20" />
        </IconButton>

        <IconButton
          tabIndex={tabIndex}
          variant={state.activityPinned ? "soft" : "ghost"}
          color="gray"
          highContrast
          style={{ margin: 0 }}
          onClick={() =>
            setState((state) => ({
              ...state,
              activityPinned: !state.activityPinned,
            }))
          }
        >
          {state.activityPinned ? (
            <DrawingPinFilledIcon width="20" height="20" />
          ) : (
            <DrawingPinIcon width="20" height="20" />
          )}
        </IconButton>
      </Flex>

      <Text as="p" size="2" mb="7" color="gray">
        Review your activity over the past days.
      </Text>

        
      <Flex className="main" direction="column">
        <Flex direction="column" gap="3" mb="5" className="border border-red-700">
          <Flex justify="between" align="center">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={allPeople[6].image}
                fallback={allPeople[6]?.name[0].toUpperCase()}
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {allPeople[6].name}
                </Text>
                <Text as="div" size="2" color="gray">
                  Approved invoice{" "}
                  <Link
                    href="#"
                    tabIndex={tabIndex}
                    onClick={(e) => e.preventDefault()}
                  >
                    #3461
                  </Link>
                </Text>
              </Box>
            </Flex>

            <Text size="2" color="gray">
              June 21, 11:34 am
            </Text>
          </Flex>
        </Flex>

        <Box>
          <Separator size="4" />
        </Box>

        <Flex direction="column" gap="3" my="5">
          <Flex justify="between" align="center">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={allPeople[8].image}
                fallback={allPeople[8]?.name[0].toUpperCase()}
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {allPeople[8].name}
                </Text>
                <Text as="p" size="2" color="gray">
                  Purchased{" "}
                  <Link
                    href="#"
                    tabIndex={tabIndex}
                    onClick={(e) => e.preventDefault()}
                  >
                    15 office chairs
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    tabIndex={tabIndex}
                    onClick={(e) => e.preventDefault()}
                  >
                    2 drum sets
                  </Link>
                </Text>
              </Box>
            </Flex>

            <Text size="2" color="gray">
              June 21, 9:43 am
            </Text>
          </Flex>
        </Flex>

        <Box>
          <Separator size="4" />
        </Box>

        <Flex direction="column" gap="3" my="5">
          <Flex justify="between" align="center">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={allPeople[8].image}
                fallback={allPeople[8]?.name[0].toUpperCase()}
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {allPeople[8].name}
                </Text>
                <Text as="p" size="2" color="gray">
                  Responded to your comment{" "}
                  <Link
                    href="#"
                    tabIndex={tabIndex}
                    onClick={(e) => e.preventDefault()}
                  >
                    #7514
                  </Link>
                </Text>
              </Box>
            </Flex>

            <Text size="2" color="gray">
              June 21, 9:41 am
            </Text>
          </Flex>
        </Flex>

        <Box>
          <Separator size="4" />
        </Box>

        <Flex direction="column" gap="3" my="5">
          <Flex justify="between" align="center">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={allPeople[28].image}
                fallback={allPeople[28]?.name[0].toUpperCase()}
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {allPeople[28].name}
                </Text>
                <Text as="p" size="2" color="gray">
                  Created{" "}
                  <Link
                    href="#"
                    tabIndex={tabIndex}
                    onClick={(e) => e.preventDefault()}
                  >
                    4 invoices
                  </Link>
                </Text>
              </Box>
            </Flex>

            <Text size="2" color="gray">
              June 20, 4:55 pm
            </Text>
          </Flex>
        </Flex>

        <Box>
          <Separator size="4" />
        </Box>

        <Flex direction="column" gap="3" my="5">
          <Flex justify="between" align="center">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={allPeople[26].image}
                fallback={allPeople[26]?.name[0].toUpperCase()}
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {allPeople[26].name}
                </Text>
                <Text as="p" size="2" color="gray">
                  Updated client details for{" "}
                  <Link
                    href="#"
                    tabIndex={tabIndex}
                    onClick={(e) => e.preventDefault()}
                  >
                    Acme Co.
                  </Link>
                </Text>
              </Box>
            </Flex>

            <Text size="2" color="gray">
              June 20, 3:30 pm
            </Text>
          </Flex>
        </Flex>

        <Box>
          <Separator size="4" />
        </Box>

        <Flex direction="column" gap="3" my="5">
          <Flex justify="between" align="center">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={allPeople[25].image}
                fallback={allPeople[25]?.name[0].toUpperCase()}
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {allPeople[25].name}
                </Text>
                <Text as="p" size="2" color="gray">
                  Created{" "}
                  <Link
                    href="#"
                    tabIndex={tabIndex}
                    onClick={(e) => e.preventDefault()}
                  >
                    a new report
                  </Link>
                </Text>
              </Box>
            </Flex>

            <Text size="2" color="gray">
              June 20, 3:22 pm
            </Text>
          </Flex>
        </Flex>

        <Box>
          <Separator size="4" />
        </Box>

        <Flex direction="column" gap="3" my="5">
          <Flex justify="between" align="center">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={allPeople[25].image}
                fallback={allPeople[25]?.name[0].toUpperCase()}
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {allPeople[25].name}
                </Text>
                <Text as="p" size="2" color="gray">
                  Deleted report{" "}
                  <Link
                    href="#"
                    tabIndex={tabIndex}
                    onClick={(e) => e.preventDefault()}
                  >
                    #34
                  </Link>
                </Text>
              </Box>
            </Flex>

            <Text size="2" color="gray">
              June 20, 1:00 pm
            </Text>
          </Flex>
        </Flex>

        <Box>
          <Separator size="4" />
        </Box>

        <Flex direction="column" gap="3" mt="5">
          <Flex justify="between" align="center">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={allPeople[20].image}
                fallback={allPeople[20]?.name[0].toUpperCase()}
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {allPeople[20].name}
                </Text>
                <Text as="p" size="2" color="gray">
                  Joined the team
                </Text>
              </Box>
            </Flex>

            <Text size="2" color="gray">
              June 20, 12:47 pm
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default RecentActivity;
