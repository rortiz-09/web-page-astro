import { useCallback, useEffect, useState } from 'preact/hooks'

export const useProgressiveNumber = (
	initialValue: number | (() => number),
	duration = 900,
	decimals = 0,
	delay = 5
): [number, (value: number | ((prevTarget: number) => number)) => void] => {
	const [target, setTarget] = useState(initialValue)
	const [current, setCurrent] = useState(initialValue)
	const [steps, setSteps] = useState(1)
	const [currentStep, setCurrentStep] = useState(1);

	const initial = typeof initialValue === 'function' ? initialValue() : initialValue;
	
	const setValue = useCallback(
		(value: number | ((prevTarget: number) => number)) => {
			const nextTarget = typeof value === 'function' ? value(target) : value
			const steps = Math.max(Math.floor(duration / delay), 1)

			setSteps(steps)
			setTarget(nextTarget)
			setCurrentStep(1);
			setCurrent(lerp(initial, nextTarget, easeOutCubic(1 / steps)))
		},
		[delay, duration, target]
	)

	useEffect(() => {
		const timeout = setTimeout(
			() => {
				const progress = currentStep / steps;
				if (progress === 1) {
					setCurrent(target);
				} else {
					setCurrent(lerp(initial, target, easeOutCubic(progress)))
					setCurrentStep(currentStep + 1)
				}
			},
			delay
		)

		return () => clearTimeout(timeout)
	}, [delay, currentStep, target])

	const value = Number(current.toFixed(decimals))

	return [value, setValue]
}

const lerp = (a: number, b: number, alpha: number): number => {
	return a + (alpha * (b - a))
}

const easeOutCubic = (value: number): number => {
	return 1 - (1 - value) ** 3
}
