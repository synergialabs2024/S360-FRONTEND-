import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MensajeriaTMPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MensajeriaTM[];
}

export interface MensajeriaTM {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;
  description: string;

  created_at?: string;
  modified_at?: string;
}

export type MensajeriaTMLimitData = Pick<MensajeriaTM, 'id' | 'uuid'>;
