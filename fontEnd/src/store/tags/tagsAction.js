import tagsActionType from './tagsActionType';

export default {
    getTags: () => {
        // 获取
        let tags = [{
            id: 1,
            name: "Electron",
            alias: "桌面化",
            nums: 123
        }, {
            id: 2,
            name: "HTML",
            alias: "HTML",
            nums: 123
        }, {
            id: 4,
            name: "CSS",
            alias: "CSS",
            nums: 123
        }, {
            id: 3,
            name: "Javascript",
            alias: "Javascript",
            nums: 123
        }];

        return {
            type: tagsActionType.GETTAGS,
            data: tags
        }
    }
}
