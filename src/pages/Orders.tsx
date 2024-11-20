import { getOrderList, removeOrder } from "@/api"
import { Order } from "@/types"
import { useEffect, useState } from "react"
import { formatPhone } from "@/helpers"

export default function Orders() {
  const [ list, setList ] = useState<Order[]>()
  
  useEffect(() => {
    const result = getOrderList()
    setList(result);
  }, [])

  const handlerClickRemove = (event: any) => {
    const newList = [...list!];
    newList.splice(event.target.dataset.index, 1)
    setList(newList);
    removeOrder(event.target.dataset.id)
  }
  
  return (
    <>
      <div className="order-list">
            <table>
              <thead>
                <tr>
                  <td>Клиент</td>
                  <td>Телефон</td>
                  <td>Дата</td>
                  <td>Время</td>
                  <td>Город</td>
                  <td>Адрес</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
              {
                list?.map((order, i) => (
                  <tr key={order.id}>
                    <td>{ order.name }</td>
                    <td>{ formatPhone(order.phone) }</td>
                    <td>{ order.date.day }</td>
                    <td>{ order.date.begin } - { order.date.end }</td>
                    <td>{ order.city.name }</td>
                    <td>{ order.city.address }</td>
                    <td className="order-list__remove" data-id={order.id} data-index={i} onClick={handlerClickRemove}>Удалить</td>
                  </tr>
                ))
              }
              </tbody>
            </table>
      </div>
    </>
  )
}