export default function Button({ title, disabled }: {title: string, disabled: boolean}) {
  return (
    <>
      <button className="button" disabled={disabled}>{title}</button>
    </>
  )
}