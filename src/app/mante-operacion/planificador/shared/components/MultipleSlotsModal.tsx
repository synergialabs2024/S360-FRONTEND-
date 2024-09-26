import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { BlockManyHours } from '@/actions/app';
import { blockManyHoursSchema } from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';

export type MultipleSlotsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type BlockManyHoursForm = BlockManyHours & {
  isUnblockRequest?: boolean;
};

const MultipleSlotsModal: React.FC<MultipleSlotsModalProps> = ({
  isOpen,
  onClose,
}) => {
  ///* local state ---------------------
  const [isUnblockRequest, setRequestUnblock] = useState<boolean>(false);

  ///* form -----------------
  const form = useForm<BlockManyHoursForm>({
    resolver: yupResolver(blockManyHoursSchema) as any,
  });
  const { formState } = form;

  ///* handlers ---------------------
  const onSubmit = async (data: BlockManyHoursForm) => {
    console.log('onSubmit', { data });
  };

  ///* effects ---------------------
  useEffect(() => {
    setRequestUnblock(false);
  }, []);

  return (
    <>
      <ScrollableDialogProps
        title={isUnblockRequest ? 'Desbloquear Horario' : 'Bloquear Horario'}
        open={isOpen}
        onClose={onClose}
        // minWidth="30%"
        confirmTextBtn={isUnblockRequest ? 'Desbloquear' : 'Bloquear'}
        onConfirm={form.handleSubmit(onSubmit, () => {})}
        confirmVariantBtn="outlined"
        disabledConfirmBtn={formState.isSubmitting}
      />
    </>
  );
};

export default MultipleSlotsModal;
