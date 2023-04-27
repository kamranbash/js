import {
  useCreateWalletInstance,
  useSupportedWallet,
  useThirdwebWallet,
} from "@thirdweb-dev/react-core";
import { Img } from "../../../../components/Img";
import { Spacer } from "../../../../components/Spacer";
import {
  BackButton,
  ModalDescription,
  ModalTitle,
} from "../../../../components/modalElements";
import { iconSize, spacing } from "../../../../design-system";
import {
  ErrorMessage,
  FormFooter,
  Input,
} from "../../../../components/formElements";
import { Button } from "../../../../components/buttons";
import { MagicLink } from "@thirdweb-dev/wallets";
import { useState } from "react";
import { Spinner } from "../../../../components/Spinner";

export const SMSConnect: React.FC<{
  onBack: () => void;
  onConnect: () => void;
}> = (props) => {
  const magicLinkObj = useSupportedWallet("magicLink");
  const [isConnecting, setIsConnecting] = useState(false);
  const createInstance = useCreateWalletInstance();
  const twContext = useThirdwebWallet();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const handleSmsConnect = async () => {
    const magicWallet = createInstance(magicLinkObj) as MagicLink;
    setIsConnecting(true);
    await magicWallet.connect({
      phoneNumber,
    });
    setIsConnecting(false);
    twContext?.handleWalletConnect(magicWallet);
    props.onConnect();
  };

  const error = phoneNumber && !isValidPhoneNumber;

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
      <ModalTitle> Login with Phone number </ModalTitle>
      <Spacer y="sm" />
      <ModalDescription>
        Enter your phone number including country code
      </ModalDescription>

      <Spacer y="lg" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSmsConnect();
        }}
      >
        {/* Phone number */}
        <Input
          type="tel"
          id="phone"
          name="phone"
          variant="outline"
          placeholder="+1234567890"
          required
          value={phoneNumber}
          pattern="\+[7-9]{1}[0-9]+"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            // check if a valid phone number using browser api
            setIsValidPhoneNumber(e.target.validity.valid);
          }}
          data-error={error}
        />

        {error && (
          <>
            <Spacer y="sm" />
            <ErrorMessage>Invalid phone number</ErrorMessage>
          </>
        )}

        <Spacer y="xl" />

        <FormFooter>
          <Button
            variant="inverted"
            style={{
              gap: spacing.sm,
            }}
          >
            {isConnecting ? "Connecting" : "Connect"}
            {isConnecting && <Spinner color="inverted" size="sm" />}
          </Button>
        </FormFooter>
      </form>
    </>
  );
};
