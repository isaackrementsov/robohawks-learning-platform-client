import requests from './requests';

const auth = {
    buildSession: (userId, instructor, admin) => {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('userId', userId);
        localStorage.setItem('instructor', instructor);
        localStorage.setItem('admin', admin);
    },

    logout: async () => {
        if(auth.loggedIn()){
            localStorage.clear();
            await requests.makeRequest({url: '/user/deauth', method: 'POST'});
        }
    },

    loggedIn: () =>  JSON.parse(localStorage.getItem('loggedIn')) || false,
    userId: () => localStorage.getItem('userId'),
    instructor: () => localStorage.getItem('instructor'),
    admin: () => localStorage.getItem('admin'),

    createState: () => {
        return {
            loggedIn: auth.loggedIn(),
            userId: auth.userId(),
            instructor: auth.instructor(),
            admin: auth.admin()
        };
    }
}

export default auth;
