import tagsActionType from './tagsActionType';

let tags = {
    data: [],               // 总的数据
    idToName: {},           // 保存 tagId 与 tagName 的映射关系
    nums: 0,                // 数据量
    pageSize: 10,           // 表格分页
    tagFilter: []           // 写文章时标签的条件
};

export default function counter(state = tags, action) {
    switch (action.type) {
        case tagsActionType.GETTAGS:
            let tagFilter = [],
                idToName = {}

            action.data.tags.forEach(function(da) {
                let name = da.tagName;
                    
                idToName[da.tagId] = name;

                tagFilter.push({
                    key: name,
                    text: name,
                    value: da.tagId
                });
            });

            return Object.assign({}, state, {
                data: [...action.data.tags],
                nums: action.data.nums,
                tagFilter,
                idToName
            })
        default:
            return state;
    }
}