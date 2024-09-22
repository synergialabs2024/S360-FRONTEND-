import { Paper, styled } from '@mui/material';

export type CustomInstallSchedulePaperSlotProps = {
  hour: string;
  children: React.ReactNode;
  onClick: (id: string) => void;
  isClicked: boolean;
};

interface StyledPaperProps {
  isclicked: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const StyledPaper = styled(Paper)<StyledPaperProps>(({ isclicked, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
  borderRadius: '5px',
  color: isclicked ? 'white' : 'gray',
  backgroundColor: isclicked ? theme.palette.primary.main : '#ffffff',
  transition: 'background-color 0.3s',
  cursor: isclicked ? 'default' : 'pointer',
  border: '1px solid #E0E0E0',
  margin: '10px 0px',
}));

const CustomInstallSchedulePaperSlot: React.FC<
  CustomInstallSchedulePaperSlotProps
> = ({ hour, children, isClicked, onClick }) => {
  const handleClick = () => {
    onClick(hour);
  };

  return (
    <StyledPaper onClick={handleClick} isclicked={isClicked}>
      {children}
    </StyledPaper>
  );
};

export default CustomInstallSchedulePaperSlot;
