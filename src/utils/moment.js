import moment from 'moment';

export function format(data) {
	return moment(data).format('YYYY-MM-DD HH:mm:ss')
}