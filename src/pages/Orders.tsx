import { getOrderList } from "@/api"
import { Order } from "@/types"
import { useEffect, useState } from "react"

export default function Orders() {
  const [ list, setList ] = useState<Order[]>()

  useEffect(() => {
    const result = getOrderList()
    setList(result);
  })
  
  return (
    <>
      <div className="order-list">
        {
          list?.map(order => (
            <div className="order-list-item">
              <div>{ order.name }</div>
              <div>{ order.phone }</div>
              <div>{ order.date.date }</div>
              <div>{ order.date.begin } - { order.date.end }</div>
              <div>{ order.city.name }</div>
              <div>{ order.city.address }</div>
            </div>
          ))
        }
      </div>
    </>
  )
}