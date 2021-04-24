import requests from './requests';

const auth = {
    buildSession: (userId, instructor, admin, avatar) => {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('userId', userId);
        localStorage.setItem('instructor', instructor);
        localStorage.setItem('admin', admin);
        localStorage.setItem('avatar', avatar)
    },

    update: avatar => localStorage.setItem('avatar', avatar),

    logout: async () => {
        if(auth.loggedIn()){
            localStorage.clear();
            await requests.makeRequest({url: '/user/deauth', method: 'POST'});
        }
    },

    loggedIn: () =>  JSON.parse(localStorage.getItem('loggedIn')) || false,
    userId: () => localStorage.getItem('userId'),
    instructor: () => JSON.parse(localStorage.getItem('instructor')) || false,
    admin: () => localStorage.getItem('admin'),
    avatar: () => localStorage.getItem('avatar'),

    createState: () => {
        return {
            loggedIn: auth.loggedIn(),
            userId: auth.userId(),
            instructor: auth.instructor(),
            admin: auth.admin(),
            avatar: auth.avatar()
        };
    },

    homepage: () => '/user/' + auth.userId()
}

export default auth;
