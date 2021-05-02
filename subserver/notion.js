import { NotionAPI } from 'notion-client';

const client = new NotionAPI();

const actions = {
    getPage: async url => {
        const parts = url.split('/');
        const id = parts[parts.length - 1].split('?')[0];

        return await client.getPage(id);
    }
};

export default actions;
