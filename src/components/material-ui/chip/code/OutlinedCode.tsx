import CodeDialog from '@/components/shared/CodeDialog';
const OutlinedCode = () => {
  return (
    <>
      <CodeDialog>
        {`

import * as React from 'react';
import { 
Avatar, 
Chip, 
Grid }  from '@mui/material';
import { 
IconCheck, 
IconChecks, 
IconMoodHappy } from '@tabler/icons-react';

import User1 from "@/assets/images/profile/user-1.jpg"
import User2 from "@/assets/images/profile/user-2.jpg"
import User3 from "@/assets/images/profile/user-3.jpg"

import InlineItemCard from "@/app/components/shared/InlineItemCard";

<InlineItemCard>
    <Chip variant="outlined" avatar={<Avatar>M</Avatar>} label="Default Filled" />
    <Chip variant="outlined" avatar={<Avatar>M</Avatar>} label="Default Deletable" onDelete={handleDelete} />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User1} />} label="Default Filled" color="primary" />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User1} />} label="Default Deletable" color="primary" onDelete={handleDelete} />
    <Chip variant="outlined" icon={<IconMoodHappy />} label="Default Filled" color="secondary" />
    <Chip variant="outlined" icon={<IconMoodHappy />} label="Default Deletable" color="secondary" onDelete={handleDelete} />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User2} />} label="Default Filled" color="success" />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User2} />} label="Default Deletable" color="success" onDelete={handleDelete} />
    <Chip variant="outlined" icon={<IconMoodHappy />} label="Default Filled" color="warning" />
    <Chip variant="outlined" icon={<IconMoodHappy />} label="Default Deletable" color="warning" onDelete={handleDelete} />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User3} />} label="Default Filled" color="error" />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User3} />} label="Default Deletable" color="error" onDelete={handleDelete} />
</InlineItemCard>`}
      </CodeDialog>
    </>
  );
};

export default OutlinedCode;
