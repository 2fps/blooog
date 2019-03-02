import tagsActionType from './tagsActionType';

let tags = {
    data: [],               // 总的数据
    nums: 0,                 // 数据量
    pageSize: 10            // 表格分页
};

export default function counter(state = tags, action) {
    switch (action.type) {
        case tagsActionType.GETTAGS:

            return Object.assign({}, state, {
                data: [...action.data.tags],
                nums: action.data.nums
            })
        default:
            return state;
    }
}