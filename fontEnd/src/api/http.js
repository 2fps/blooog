import axios from 'axios';

export  function getWebsiteConfig() {
    return axios.get('/api/website').then(function(response) {
        return response;
    });;
}