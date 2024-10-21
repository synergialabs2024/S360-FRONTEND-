import { useFetchOLTs } from '@/actions/app';
import {
  ConfigOLT,
  emptyCellOneLevel,
  TABLE_CONSTANTS,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import AppCard from '@/shared/components/AppCard/AppCard';
import { Grid, Tab } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { SimpleTable } from '../../../pages/custom';

export type OLTScenceProps = {
  data?: Record<string, any>;
};

const OLTScence: React.FC<OLTScenceProps> = ({ data = {} }) => {
  const { tabValue, handleTabChange } = useTabsOnly();

  ///* fetch data
  const { isLoading } = useFetchOLTs({
    enabled: true,
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<ConfigOLT>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id'),
      },
      {
        accessorKey: 'text',
        header: 'TEXT',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'text'),
      },
    ],
    [],
  );

  // Define tabs
  const tabData = [
    { label: 'VLANS', index: 1, data: data.vlans || [] },
    { label: 'LINE PROFILES', index: 2, data: data.line_profiles || [] },
    { label: 'SRV PROFILES', index: 3, data: data.srv_profiles || [] },
    { label: 'TRAFFIC TABLES', index: 4, data: data.traffic_tables || [] },
  ];

  return (
    <>
      <NestedTabsScene
        tabs={
          <FormTabsOnly
            sxTabs={{ mb: 2 }}
            value={tabValue}
            onChange={handleTabChange}
          >
            {tabData.map(tab => (
              <Tab
                key={tab.index}
                label={tab.label}
                value={tab.index}
                {...a11yProps(tab.index)}
              />
            ))}
          </FormTabsOnly>
        }
      >
        {tabData.map(tab => (
          <CustomTabPanel
            key={tab.index}
            value={tabValue}
            index={tab.index}
            ptGrid="0"
          >
            <AppCard>
              <Grid sx={{ ml: '2cm' }}>
                <SimpleTable<ConfigOLT>
                  columns={columns}
                  data={tab.data}
                  isLoading={isLoading}
                  enableGlobalFilter={true}
                />
              </Grid>
            </AppCard>
          </CustomTabPanel>
        ))}
      </NestedTabsScene>
    </>
  );
};

export default OLTScence;
