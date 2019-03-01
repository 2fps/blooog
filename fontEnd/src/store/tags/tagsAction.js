import tagsActionType from './tagsActionType';
import * as Http from '../../api/http';
import Toastr from 'toastr';

export default {
    // 按量获取标签
    getTags: (start, end) => {
        return dispatch => {
            Http.getTags(start, end).then(function(data) {
                let da = data.data,
                    info = [];

                if (da.result) {
                    info = da.data.tags;
                }
                dispatch({
                    type: tagsActionType.GETTAGS,
                    data: info
                });
            });
        }
    },
    addTag: (tagName, tagNum) => {
        return dispatch => {
            Http.addTag(tagName, tagNum).then(function (data) {
                let da = data.data;

                if (da.result) {
                    alert('ok');
                    Http.getTags();
                } else {
                    alert('erroe');
                }
            });
        }
    },
    removeTag: (tagName) => {
        return dispatch => {
            Http.removeTag(tagName).then(function (data) {
                let da = data.data;

                if (da.result) {
                    Toastr.success('删除成功!', '提示');
                } else {
                    Toastr.error('删除失败!', '提示');
                }
            });
        }
    },
    updateTag: (tagName, newName) => {
        return dispatch => {
            Http.updateTag(tagName, newName).then(function (data) {
                let da = data.data;
                if (da.result) {
                    alert('ok');
                } else {
                    alert('erroe');
                }
            });
        }
    },
}
