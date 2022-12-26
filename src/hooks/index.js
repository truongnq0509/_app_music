import { useEffect, useState } from "react"

export const useTitle = (title) => {
	useEffect(() => {
		const prevTitle = document.title
		document.title = title
		return () => {
			document.title = prevTitle
		}
	})
}

export const useDebounce = (value, delay) => {
	const [debounceValue, setDebounceValue] = useState(value)

	useEffect(() => {
		const hanlder = setTimeout(() => {
			setDebounceValue(value)
		}, delay)

		return () => {
			clearTimeout(hanlder)
		}
	}, [value, delay])

	return debounceValue
}