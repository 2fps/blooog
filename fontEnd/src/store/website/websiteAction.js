import websiteActionType from './websiteActionType';

export default {
    getConfig: () => {
        let info = {
            
        };
        
        return {
            type: websiteActionType.GETCONFIG,
            data: info
        }
    }
}
