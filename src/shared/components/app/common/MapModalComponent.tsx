/* eslint-disable indent */
import { ScrollableDialogProps } from '../../CustomDialogs';
import { ScrollableDialogPropsProps } from '../../CustomDialogs/ScrollableDialogProps';
import { CustomMap } from '../../CustomMaps';
import { CoordenadasType } from '../../CustomMaps/CustomMap';

export type MapModalComponentProps = Partial<ScrollableDialogPropsProps> & {
  coords?: string;

  contentNodeOverride?: React.ReactNode;

  canDragMarker?: boolean;

  setLatLng?: (coordenadas: CoordenadasType) => void;

  minWidthModal?: string;
};

const MapModalComponent: React.FC<MapModalComponentProps> = ({
  coords,

  title = 'Ubicación',
  open,
  onClose,
  cancelTextBtn = 'Cerrar',

  contentNodeOverride = null,
  canDragMarker = false,
  setLatLng,

  minWidthModal,

  showCustomTitleNode = false,
  customTitleNode = null,
}) => {
  return (
    <>
      <ScrollableDialogProps
        title={title}
        open={!!open}
        showCustomTitleNode={showCustomTitleNode}
        customTitleNode={customTitleNode}
        onClose={onClose!}
        cancelTextBtn={cancelTextBtn}
        minWidth={minWidthModal}
        contentNode={
          <>
            {!contentNodeOverride ? (
              <CustomMap
                setLatLng={setLatLng!}
                coordenadas={
                  coords
                    ? {
                        lat: +coords.split(',')[0],
                        lng: +coords.split(',')[1],
                      }
                    : { lat: 0, lng: 0 }
                }
                canDragMarker={canDragMarker}
              />
            ) : (
              contentNodeOverride
            )}
          </>
        }
      />
    </>
  );
};

export default MapModalComponent;
