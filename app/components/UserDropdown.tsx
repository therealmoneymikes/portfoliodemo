import { DropdownMenu, Button } from "@radix-ui/themes";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAuthContext } from "../providers/auth/useAuthContext";
import { useRouter } from "next/navigation";
interface Props {
  userProfilePicture?: string;
  name: string;
}
const fallbackImg =
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop";

const UserDropdown = ({ name, userProfilePicture }: Props) => {
  const session = useSession();
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  return (
    <div style={{ display: session.status === "authenticated" ? "" : "none" }}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="solid">
            {name}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            className="flex relative space-x-5"
            onClick={() => {
              if (session.status === "authenticated" || isAuthenticated) {
                router.push("/dashboard");
              }
            }}
          >
            {name}
            <Image
              className="absolute rounded-lg"
              style={{ right: 8 }}
              src={userProfilePicture ?? fallbackImg}
              alt="user-profile-image"
              width={25}
              height={25}
            />
          </DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
              <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

              <DropdownMenu.Separator />
              <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />
          <DropdownMenu.Item>Share</DropdownMenu.Item>
          <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
          <DropdownMenu.Separator />
          {session.status === "authenticated" && (
            <Link href="/api/auth/signout">
              <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                Log Out
              </DropdownMenu.Item>
            </Link>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default UserDropdown;
