import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { muse } from "@/muse.config";

interface MagicLinkEmailProps {
  url: string;
}

export function MagicLinkEmail({ url }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your sign-in link for {muse.name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{muse.name}</Heading>
          <Text style={text}>Click the button below to sign in. This link expires in 10 minutes.</Text>
          <Section style={btnSection}>
            <Button href={url} style={btn}>
              Sign in to {muse.name}
            </Button>
          </Section>
          <Text style={hint}>
            If you didn't request this, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main: React.CSSProperties = {
  backgroundColor: "#f6f9fc",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "40px",
  borderRadius: "8px",
  maxWidth: "480px",
};

const h1: React.CSSProperties = {
  color: "#111",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 24px",
};

const text: React.CSSProperties = {
  color: "#444",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const btnSection: React.CSSProperties = { margin: "0 0 24px" };

const btn: React.CSSProperties = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
  display: "inline-block",
};

const hint: React.CSSProperties = {
  color: "#999",
  fontSize: "13px",
  lineHeight: "1.5",
};
