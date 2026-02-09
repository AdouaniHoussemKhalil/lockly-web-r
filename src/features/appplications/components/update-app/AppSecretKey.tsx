import {
  Bloc,
  Button,
  CustomText,
  IconButton,
  Loading,
  SimpleTable,
  Text,
  Tooltip,
} from "@houssemdi2000/design-system";
import { FiCopy, FiCheckCircle, FiInfo } from "react-icons/fi";
import {
  useAppDetails,
  useCopySecretKey,
  useGenerateSecretKey,
} from "../../hooks/useApps";
import { useState } from "react";

type Props = {
  appId: string;
  tenantId: string;
};

export default function SecretKeySection({ appId, tenantId }: Props) {
  const { data: app, isLoading } = useAppDetails(tenantId, appId ?? "");


  const [state, setState] = useState({
    isCopied: false,
    isNewKey: false,
  });

  if (isLoading || !app) {
    return <Loading variant="dots" />;
  }

  const {
    mutate: generateSecretKey,
    data: generateSecretKeyResponse,
    isPending: isGenerateLoading,
  } = useGenerateSecretKey(tenantId, appId);

  const { mutate: copySecretKey } = useCopySecretKey(tenantId, appId);

  const handleGenerateSecretKey = () => {
    generateSecretKey();
    setState((prev) => ({ ...prev, isNewKey: true }));
  };

  const handleCopySecretKey = () => {
    copySecretKey();
    setState((prev) => ({ ...prev, isCopied: true }));
    setState((prev) => ({ ...prev, isNewKey: false }));
  };



  return (
    <Bloc padding={0} style={{ marginTop: 20 }}>
      <SimpleTable
        size="large"
        items={[
          <>
            <Bloc layout="navbar">
              <Text>Code secret</Text>
              <CustomText
                copyLabel="copier"
                width={250}
                numberChars={20}
                copyIcon={<FiCopy />}
                onCopy={handleCopySecretKey}
                successCopyIcon={<FiCheckCircle />}
                isDarkMode={true}
                value={
                  generateSecretKeyResponse &&
                  generateSecretKeyResponse.secretKey
                    ? generateSecretKeyResponse.secretKey
                    : app?.secretKey ?? "********************"
                }
                maskChar="*"
                masked={true}
                copyable={state.isNewKey || !app?.isSecretKeyCopied}
              />
              <Text>{app?.secretKeyCreatedAt}</Text>
            </Bloc>
          </>,
          <Bloc style={{ marginTop: 20 }} layout="navbar" padding={0}>
            <Button
              size="small"
              label="Générer un nouveau code secret"
              isLoading={isGenerateLoading}
              onClick={handleGenerateSecretKey}
            />
            <Tooltip
              content="Vous avez perdu le code secret ? Vous pouvez en générer un nouveau."
              position="left"
            >
              <IconButton
                border
                icon={<FiInfo />}
                variant="ghost"
                size="small"
              />
            </Tooltip>
          </Bloc>,
        ]}
      />
    </Bloc>
  );
}
