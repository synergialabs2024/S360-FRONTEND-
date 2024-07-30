import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface FileDocumentsPaginatedRes {
  meta: PagingMetaResponse;
  data: FileDocument[];
}

export interface FileDocument {
  id?: number;
  uuid?: string;

  name: string;
  directory?: string;
  size?: string;
  stream_url: string;

  state: boolean;
  created_at?: string;
  modified_at?: string;
}
