import { apiPrefix } from '../../server/config/config.json';

    export const getJournal = () => {
        return `${apiPrefix}/api/journal`;
    }

    // export const = createJournal = (data) => {
    //     return axios.post(`${apiPrefix}/api/journal`, data);
    // },

    // export const = deleteJournal = (diary_id) => {
    //     return axios.delete(`${apiPrefix}/api/journal/${journal_id}`);
    // }