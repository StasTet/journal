import { apiPrefix } from '../../server/config/config.json';

    export const getJournal = () => {
        return `${apiPrefix}/api/journal`;
    }

    export const updateItem = (item_id) => {
        return `${apiPrefix}/api/journal/${item_id}`;
    }

    export const createItem= (data) => {
        return `${apiPrefix}/api/journal`;
    }

    export const deleteItem = (item_id) => {
        return `${apiPrefix}/api/journal/${item_id}`;
    }