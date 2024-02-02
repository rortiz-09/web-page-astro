import{ useProgressiveNumber } from "../hooks/userProgressiveNumber"
import { useEffect } from "preact/hooks"

export const CountUp = (
  { initial, final, decimals, duration }:
  { initial: number, final: number, decimals?: number, duration?: number }
) => {
  const [count, setCount] = useProgressiveNumber(initial, duration, decimals)

  useEffect(() => {
    setCount(final)
  }, [final])

  return <span>{count}</span>
}