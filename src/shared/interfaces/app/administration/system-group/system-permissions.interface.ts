import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SystemPermissionsPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SystemPermission[];
}

export interface SystemPermission {
  id?: number;

  name: string; // to render: api.
  codename: string; // to send
  content_type: number;
}
