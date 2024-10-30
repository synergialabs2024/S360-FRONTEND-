import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ONTModelsPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ONTModel[];
}

export interface ONTModel {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;
  pon_type: string;
  mode: string;
  ethernet_ports: number;
  wifi_ssids: number;
  voip_ports: number;
  image_url: string;

  created_at?: string;
  modified_at?: string;
}

export type ONTModelLimitData = Pick<ONTModel, 'uuid' | 'name'>;
