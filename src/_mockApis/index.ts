import mock from './mock';
import './notes/NotesData';
import './ticket/TicketData';
import './eCommerce/ProductsData';
import './invoice/invoceLists';

mock.onAny().passThrough();
