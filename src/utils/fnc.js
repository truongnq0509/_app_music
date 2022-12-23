export const formatNumber = number => {
	if (number >= Math.pow(10, 6)) {
		number = Math.round((number / Math.pow(10, 6)) * 10) / 10 + 'M'
	} else if (number >= Math.pow(10, 3) && number < Math.pow(10, 6)) {
		number = Math.round((number / Math.pow(10, 3)) * 10) / 10 + 'K'
	}

	return number
}

