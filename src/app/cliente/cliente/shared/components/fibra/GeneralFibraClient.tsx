import { Tab } from '@mui/material';

import { LineaServicio, useTabsOnly } from '@/shared';
import { a11yProps, FormTabsOnly, TabsFormBoxScene } from '@/shared/components';
import ClienteFibraTitle from './ClienteFibraTitle';

export type GeneralFibraClientProps = {
  serviceLine?: LineaServicio;
};

const GeneralFibraClient: React.FC<GeneralFibraClientProps> = ({
  serviceLine,
}) => {
  ///* hooks ----------------
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  return (
    <TabsFormBoxScene
      titlePageNode={<ClienteFibraTitle serviceLine={serviceLine!} />}
      showBtns={false}
      // tabs -------------
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Datos Generales" value={1} {...a11yProps(1)} />

          <Tab label="Matriz" value={2} {...a11yProps(2)} />
        </FormTabsOnly>
      }
    >
      ssss
    </TabsFormBoxScene>
  );
};

export default GeneralFibraClient;
