import { Flex, DropdownMenu, Button } from "@radix-ui/themes";

import React from "react";

const DashboardDropdown = () => {
  return (
    <Flex gap="3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="solid" color="pink">
            Options
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft" color="indigo">
          <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};

export default DashboardDropdown;
