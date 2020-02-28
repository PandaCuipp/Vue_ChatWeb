import Validator from 'validatorjs';
import {Toast} from "vant";


/**
 * @present 字段必须存在 内容可空
 * @required 必须且非空
 * @required_if:anotherfield,value 如果anotherfield == value，则必须且非空
 * @required_unless:anotherfield,value 必须且非空(除非anotherfield == value)
 * @required_with:foo,bar,... 如果(foo,bar,...存在其一)，则必须且非空
 * @required_with_all:foo,bar,... 如果都(foo,bar,...存在)，则必须且非空
 * @required_without:foo,bar,... 不存在其一，则必须且非空
 * @required_without_all:foo,bar,... 都不存在，则必须且非空
 * @accepted yes、on、1或true
 * @in:foo,bar,...
 * @not_in:foo,bar,...
 * @date Date可以接受的有效日期格式
 * @after:date
 * @after_or_equal:date
 * @before:date
 * @before_or_equal:date
 * @alpha 纯字母
 * @alpha_dash 字母·数字·破折号·下划线
 * @alpha_num 字母·数字
 * @digits:value 数字并且长度为value
 * @digits_between:min,max 数字并且长度在 min~max之间
 * @integer
 * @numeric
 * @string
 * @url
 * @array
 * @boolean true、false、0、1、“true”、“false”、“0”、“1”
 * @email
 * @hex
 * @regex:pattern
 * @max:value
 * @min:value
 * @size:value [字符串:字符数(长度)],[数字:给定值]
 * @between:min,max
 * @confirmed 验证 *_confirmation字段(@same特殊形式)
 * @same:attribute 字段值相同验证(同@confirmed)
 * @different:attribute 字段值不同验证
 *
 * 参考: https://github.com/skaterdav85/validatorjs
 *
 * @param data 验证的数据
 * @param rules 验证的规则
 * @param attributeNames 错误提示属性名称替换
 * @param customErrorMessages 自定义错误提示
 */
export default function validator(
	data,
	rules,
	attributeNames = null,
	customErrorMessages = {}
) {
	Validator.useLang('zh')
	let validator = new Validator(data, rules, customErrorMessages);
	if (attributeNames && typeof attributeNames === 'object' && !Array.isArray(attributeNames)) {
		let names = {}
		for (let key in attributeNames) {
			names[key] = attributeNames[key]
		}
		validator.setAttributeNames(names);
	}

	if (validator.fails()) {
		let errors = Object.values(validator.errors.errors);
		let firstErrorMessage = '';
		for (let msgArr of errors) {
			firstErrorMessage = msgArr.shift();
			break;
		}
		Toast(firstErrorMessage)
		return false;

	}
	return true;
}
