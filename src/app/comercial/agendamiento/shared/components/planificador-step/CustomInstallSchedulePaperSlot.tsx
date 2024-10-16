/* eslint-disable @typescript-eslint/no-unused-vars */
import { Paper, styled } from '@mui/material';

export type CustomInstallSchedulePaperSlotProps = {
  hour: string;
  children: React.ReactNode;
  onClick: (id: string) => void;
  isClicked: boolean;
};

interface StyledPaperProps {
  isClicked: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const StyledPaper = styled(({ isClicked, ...other }: StyledPaperProps) => (
  <Paper {...other} />
))(({ isClicked, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
  borderRadius: '5px',
  color: isClicked ? 'white' : 'gray',
  backgroundColor: isClicked ? theme.palette.primary.main : '#ffffff',
  transition: 'background-color 0.3s',
  cursor: isClicked ? 'default' : 'pointer',
  border: '1px solid #E0E0E0',
  margin: '10px 0px',
}));

const CustomInstallSchedulePaperSlot: React.FC<
  CustomInstallSchedulePaperSlotProps
> = ({ hour, children, isClicked = false, onClick }) => {
  const handleClick = () => {
    onClick(hour);
  };

  return (
    <StyledPaper onClick={handleClick} isClicked={isClicked}>
      {children}
    </StyledPaper>
  );
};

export default CustomInstallSchedulePaperSlot;
