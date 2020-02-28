import {Toast} from "vant";

export default {
    methods: {
        validate() {
            const {currentNav, currentSubNav1, currentSubNav2} = this;
            const page = currentNav.name;
            const page1 = currentSubNav1.name;
            const page2 = currentSubNav2.name;
            const count = this.getCountByPage2(page2);
            switch (page) {
                case '连码':
                    return this._validateLianMa(page, page1, page2, count);
                case '生肖连':
                    return this._validateShengXiaoLian(page, page1, page2, count);
                case '尾数连':
                    return this._validateWeiShuLian(page, page1, page2, count);
                case '多不中一':
                    return this._validateDuoBuZhongYi(page, page1, page2, count);
                case '六肖':
                    return this._validateLiuXiao(page, page1, page2, count);
            }
            console.log(page, page1, page2);
            return false;
        },
        // 连码
        _validateLianMa(page, page1, page2, count) {
            if (this.ballCheck.length < count) {
                Toast(`请至少选择${count}项`);
                return false;
            }
            return true;
        },
        // 生肖连
        _validateShengXiaoLian(page, page1, page2, count) {
            if (this.zodiacCheck.length < count) {
                Toast(`请至少选择${count}肖`);
                return false;
            }
            return true;
        },
        // 尾数连
        _validateWeiShuLian(page, page1, page2, count) {
            if (this.zodiacCheck.length < count) {
                Toast(`请至少选择${count}项`);
                return false;
            }
            return true;
        },
        // 多不中一
        _validateDuoBuZhongYi(page, page1, page2, count) {
            if (this.ballCheck.length < count) {
                Toast(`请至少选择${count}项`);
                return false;
            }
            return true;
        },
        // 六肖
        _validateLiuXiao(page, page1, page2, count) {
            if (this.zodiacCheck.length < 6) {
                Toast(`请至少选择6肖`);
                return false;
            }
            return true;
        },
    }
}