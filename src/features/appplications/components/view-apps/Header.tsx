import { Header, Button, Text, Bloc } from "@houssemdi2000/design-system";
import { FiPlusCircle } from "react-icons/fi";
type Props = {
  setOpen: (open: boolean) => void;
};
export default function ViewAppsHeader({ setOpen }: Props) {
  return (
    <Header
      isDarkMode
      left={
        <Bloc padding={0} layout="navbar">
          <Text variant="subtitle">Mes applications</Text>{" "}
          <Button
            iconPosition="right"
            onClick={() => setOpen(true)}
            label="Créer"
            size="small"
            icon={<FiPlusCircle />}
            ml={10}
          />
        </Bloc>
      }
    />
  );
}
