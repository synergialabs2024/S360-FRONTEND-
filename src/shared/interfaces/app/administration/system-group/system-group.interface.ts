import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SystemGroupsPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SystemGroup[];
}

export interface SystemGroup {
  id?: number;
  uuid?: string;
  name: string;
  description?: string;

  system_modules: string[];
  permissions: number[];
}

export interface SystemModuleRes {
  status: string;
  message: string;
  code: number;
  data: string[];
}
