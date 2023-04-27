import { useSupportedWallet } from "@thirdweb-dev/react-core";
import {
  BackButton,
  ModalDescription,
  ModalTitle,
} from "../../../../components/modalElements";
import { Img } from "../../../../components/Img";
import { Theme, iconSize, spacing } from "../../../../design-system";
import { Spacer } from "../../../../components/Spacer";
import { Button } from "../../../../components/buttons";
import styled from "@emotion/styled";
import { EnvelopeClosedIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
// import type { MagicLink, MagicOAuthProvider } from "@thirdweb-dev/wallets";
import { useState } from "react";
import { SMSConnect } from "./SMSConnect";
import { EmailConnect } from "./EmailConnect";

export const MagicConnect: React.FC<{
  onBack: () => void;
  onConnect: () => void;
}> = (props) => {
  const magicLinkObj = useSupportedWallet("magicLink");
  // const createInstance = useCreateWalletInstance();
  // const twContext = useThirdwebWallet();
  // const [isConnecting, setIsConnecting] = useState(false);
  const [showUI, setShowUI] = useState<"sms" | "email" | "menu">("menu");

  // const handleAuthConnect = async (oauthProvider: MagicOAuthProvider) => {
  //   const magicWallet = createInstance(magicLinkObj) as MagicLink;
  //   setIsConnecting(true);
  //   await magicWallet.connect({
  //     oauthProvider: oauthProvider,
  //   });
  //   setIsConnecting(false);
  //   twContext?.handleWalletConnect(magicWallet);
  //   props.onConnect();
  // };

  if (showUI === "sms") {
    return (
      <SMSConnect
        onBack={() => {
          setShowUI("menu");
        }}
        onConnect={props.onConnect}
      />
    );
  }

  if (showUI === "email") {
    return (
      <EmailConnect
        onBack={() => {
          setShowUI("menu");
        }}
        onConnect={props.onConnect}
      />
    );
  }

  // if (isConnecting) {
  //   return (
  //     <Flex
  //       justifyContent="center"
  //       alignItems="center"
  //       style={{
  //         height: "350px",
  //       }}
  //     >
  //       <Spinner color="primary" size="lg" />
  //     </Flex>
  //   );
  // }

  // const authButton = (oauthProvider: MagicOAuthProvider) => (
  //   <IconButton
  //     variant="secondary"
  //     onClick={() => handleAuthConnect(oauthProvider)}
  //     aria-label={oauthProvider}
  //   >
  //     <Img
  //       src={authProviderImages[oauthProvider]}
  //       width={iconSize.lg}
  //       height={iconSize.lg}
  //     />
  //   </IconButton>
  // );

  return (
    <>
      <BackButton onClick={props.onBack}></BackButton>
      <Spacer y="md" />
      <Img
        src={magicLinkObj.meta.iconURL}
        width={iconSize.xl}
        height={iconSize.xl}
      />
      <Spacer y="md" />
      <ModalTitle> Magic Link </ModalTitle>
      <Spacer y="sm" />
      <ModalDescription>Login with your phone number or email</ModalDescription>

      <Spacer y="xl" />

      {/* sms */}
      <LoginButton
        variant="secondary"
        onClick={() => {
          setShowUI("sms");
        }}
      >
        Phone number
        <ChatBubbleIcon
          width={iconSize.md}
          height={iconSize.md}
          style={{
            marginLeft: "auto",
          }}
        />
      </LoginButton>

      <Spacer y="sm" />

      <LoginButton
        variant="secondary"
        onClick={() => {
          setShowUI("email");
        }}
      >
        Email
        <EnvelopeClosedIcon
          width={iconSize.md}
          height={iconSize.md}
          style={{
            marginLeft: "auto",
          }}
        />
      </LoginButton>

      <Spacer y="xl" />

      {/* <Flex gap="sm" justifyContent="flex-end">
        {authButton("google")}
        {authButton("twitter")}
        {authButton("github")}
        {authButton("microsoft")}
      </Flex> */}
    </>
  );
};

const LoginButton = styled(Button)<{ theme?: Theme }>`
  width: 100%;
  gap: ${spacing.md};
  justify-content: left;
  &:hover {
    background-color: ${(p) => p.theme.bg.elevatedHover};
  }
`;

// const authProviderImages: Record<MagicOAuthProvider, string> = {
//   google: "ipfs://QmNMm6313vpMxbyTcXyZMSEVMkpTvkmJXaqCyFrM5TDQpV/google.svg",
//   twitter: "ipfs://QmbUePooAWJbY1ZbzamAb36WJkuNCDzKxuFh4ZUbrepLud/twitter.svg",
//   apple: "",
//   bitbucket: "",
//   discord: "",
//   facebook: "",
//   github:
//     "ipfs://QmVN2Jaz4XGpEdqo9Ki16TJmxxhiiXDaG4kP18uXpGrJQA/github-gray.svg",
//   gitlab: "",
//   linkedin: "",
//   microsoft:
//     "ipfs://QmX4Nk5VW4tJVFstnEgXvZBdx5uVDz3Si662nhVNpWUFai/microsoft.svg",
//   twitch: "",
// };
