import { Children } from "react"
import { FormEvent } from "./types"

export default function Form({ onSubmit, children }: {
  onSubmit: (event: FormEvent) => void,
  children: React.ReactElement | React.ReactElement[]
}) {

  const handlerOnSumbit = (event: FormEvent) => {
    onSubmit(event)
    event.preventDefault()
  }

  return (
    <>
      <form onSubmit={handlerOnSumbit}>
        { Children.map(children, child => child) }
      </form>
    </>
  )
}