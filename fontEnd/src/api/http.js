import axios from 'axios';

axios.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token');

    if (token) {
        config.headers.common['Authorization'] = 'Bearer ' + token;
    }

    return config;
});

export function getWebsiteConfig() {
    return axios.get('/api/website').then(function(response) {
        return response;
    });;
}
// 获取文章
export function getArticle(search, start, end) {
    let url = '/api/articles?';

    if (start) {
        url += 'start=' + start;
        url += '&end=' + end;
    }

    if (!search) {
        url += '&search=' + search;
    }

    return axios.get(url).then(function(response) {
        return response;
    });;
}
// 获取最新的文章
export function getNewestArticle() {
    return axios.get('/api/newest').then(function(response) {
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

// 修改密码
export function modifyPass(username, oldpass, newpass) {
    return axios.put('/api/user', {
        username,
        oldpass,
        newpass
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

export function saveArticle(condition) {
    return axios.post('/api/article', condition)
    .then(function (response) {
        return response;
    });
}
export function deleteArticle(articleId) {
    return axios.delete('/api/article?articleId=' + articleId)
    .then(function (response) {
        return response;
    });
}
export function getArticleById(articleId, isRead) {
    let url = '/api/article?articleId=' + articleId;

    if (isRead) {
        url += '&isRead=' + isRead;
    }
    return axios.get(url)
    .then(function (response) {
        return response;
    });
}
export function modifyArticleById(condition) {
    return axios.put('/api/article', condition)
    .then(function (response) {
        return response;
    });
}

export function getArticlesNumber() {
    return axios.get('/api/articlesNum')
    .then(function (response) {
        return response;
    });
}

export function likeArticle(articleId) {
    return axios.get('/api/likeArticle?articleId=' + articleId)
    .then(function(response) {
        return response;
    });
}
/**
 * 获取登录密钥的公钥
 */
export function getPublicKey() {
    return axios.get('/api/publicKey')
    .then(function(response) {
        return response;
    });
}

export function getTags(start, end) {
    return axios.get('/api/tag?start=' + start + '&end=' + end)
        .then(function(response) {
            return response;
        });
}

export function addTag(tagName, tagNum) {
    return axios.post('/api/tag', {
        tagName,
        tagNum
    }).then(function(response) {
        return response;
    });
}


export function removeTag(tagName) {
    return axios.delete('/api/tag?tagName=' + tagName)
        .then(function(response) {
            return response;
        });
}
export function updateTag(tagName, newName) {
    return axios.put('/api/tag', {
        tagName,
        newName
    }).then(function(response) {
        return response;
    });
}