import {isArray} from '../../../utils/helpers'

export default {
    methods: {
        getCountByPage2(page2, defaultValue = 0) {
            switch (page2[0]) {
                case '二':
                    return 2;
                case '三':
                    return 3;
                case '四':
                    return 4;
                case '五':
                    return 5;
                case '六':
                    return 6;
                case '七':
                    return 7;
                case '八':
                    return 8;
                case '九':
                    return 9;
                case '十':
                    return 10;
            }
            return defaultValue;
        },
        sliceGem(data) {
            let res = [[], []];
            if (isArray(data)) {
                data.forEach(item => {
                    if (item.showGem) {
                        res[1].push(item);
                    } else {
                        res[0].push(item);
                    }
                });
            }

            return res;
        },
        getGemCount(data) {
            if (!isArray(data)) {
                return 0;
            }
            return [...data].filter(item => item.showGem).length;
        }
    }
}