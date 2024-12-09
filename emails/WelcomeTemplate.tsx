import React, { CSSProperties } from "react";
import {
  Html,
  Body,
  Container,
  Tailwind,
  Text,
  Link,
  Preview,
} from "@react-email/components";

interface Props {
  name: string;
}
const WelcomeTemplate = ({ name }: Props) => {
  return (
    <Html>
      <Preview>Welcome!</Preview>
      <Tailwind>
      <Body className="bg-white">
        <Container>
          <Text className="font-extrabold text-xl">Hello {name}</Text>
          <Link href="www.mikethedev.com">www.mikethedev.tech</Link>
        </Container>
      </Body>
      </Tailwind>
    </Html>
  );
};


export default WelcomeTemplate;
