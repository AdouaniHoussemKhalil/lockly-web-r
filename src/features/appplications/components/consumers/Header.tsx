import { Header, Bloc, IconButton } from "@houssemdi2000/design-system";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
type Props = {
  setOpen: (open: boolean) => void;
};
export default function ConsumersHeader({  }: Props) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  }
  return (
    <Header
      isDarkMode
      left={
        <Bloc padding={0} layout="navbar">
          <IconButton
            size="large"
            icon={<FiArrowLeft />}
            onClick={handleBack}
          />
        </Bloc>
      }
    />
  );
}
