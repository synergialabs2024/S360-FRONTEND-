import Breadcrumb from '../Breadcrumb/Breadcrumb';
import AppCard from '../AppCard/AppCard';

export type SingleTableBoxSceneProps = {
  title: string;
  createPageUrl?: string;
  children: React.ReactNode;
  showCreateBtn?: boolean;

  createBtnText?: string;
  onClickCreateBtn?: () => void;

  showCustomBtns?: boolean;
  customBtns?: React.ReactNode;

  showCustomHeader?: boolean;
  customHeader?: React.ReactNode;

  showImportExportBtns?: boolean;
  importExportBtns?: React.ReactNode;

  isMainTableStates?: boolean;
};

const SingleTableBoxScene: React.FC<SingleTableBoxSceneProps> = ({
  title,
  createPageUrl,
  children,
  showCreateBtn = true,
  // createBtnText = 'Crear',
  onClickCreateBtn,

  // showCustomBtns = false,
  // customBtns,
  showCustomHeader = false,
  customHeader,

  // showImportExportBtns = false,
  // importExportBtns,

  // isMainTableStates = false,
}) => {
  return (
    <>
      {showCustomHeader && customHeader ? (
        <>{customHeader}</>
      ) : (
        <>
          <Breadcrumb
            title={title}
            onClickCreateBtn={onClickCreateBtn}
            createPageUrl={createPageUrl}
            showCreateBtn={showCreateBtn}
          />
          <AppCard>
            <>{children}</>
          </AppCard>
        </>
      )}
    </>
  );
};

export default SingleTableBoxScene;
