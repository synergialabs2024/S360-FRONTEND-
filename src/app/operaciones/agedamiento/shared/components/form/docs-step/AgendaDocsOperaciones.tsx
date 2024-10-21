import { useState } from 'react';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';

import { calcImageListPreventaFromUrls, type Agendamiento } from '@/shared';
import { SingleIconButton, TabTexLabelCustomSpace } from '@/shared/components';
import { ImageListTitleBars } from '@/shared/components/ui';

export type AgendaDocsOperacionesProps = {
  agendamiento: Agendamiento;
};

const AgendaDocsOperaciones: React.FC<AgendaDocsOperacionesProps> = ({
  agendamiento,
}) => {
  ///* local state ---------------------
  const [showDocsPart, setShowDocsPart] = useState<boolean>(false);

  return (
    <>
      <TabTexLabelCustomSpace
        textContent="Documentos"
        showCustomRightSpace={true}
        customRightSpace={
          <SingleIconButton
            newCustomButton
            startIcon={
              showDocsPart ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />
            }
            label={showDocsPart ? 'REMOVER' : 'AGREGAR'}
            onClick={() => {
              setShowDocsPart(prev => !prev);
            }}
          />
        }
      />
      <>
        {showDocsPart && (
          <>
            <ImageListTitleBars
              images={calcImageListPreventaFromUrls(
                agendamiento?.preventa_data!,
              )}
            />
          </>
        )}
      </>
    </>
  );
};

export default AgendaDocsOperaciones;
