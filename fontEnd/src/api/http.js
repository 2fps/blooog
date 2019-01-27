import axios from 'axios';

export function getWebsiteConfig() {
    return axios.get('/api/website').then(function(response) {
        return response;
    });;
}
// 获取文章
export function getArticle() {
    return axios.get('/api/articles').then(function(response) {
        return response;
    });;
}
// 获取最新的文章
export function getNewestArticle() {
    return axios.get('/api/articles/newest').then(function(response) {
        return response;
    });;
}

// 登录
export function loginIn(username, password) {
    return axios.post('/api/loginIn', {
        username,
        password
    })
    .then(function (response) {
        return response;
    });
}

// 保存修改的setting数据
export function saveWebsiteConfig(condition) {
    return axios.post('/api/website', condition)
    .then(function (response) {
        return response;
    });
}
