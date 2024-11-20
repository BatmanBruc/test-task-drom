import { City } from "@/types";
import { formatPhone, formatPrice } from "@/helpers";

export default function CityInfo({
  address,
  phones,
  price
}: {
  address: City['address']
  phones: City['phones']
  price: City['price']
}) {
  return (
    <>
      <div className="city-info">
        <div className="city-info__item">{ address }</div>
        <div className="city-info__item" style={{ display: 'flex', gap: '5px' }}>{
          phones.map(phone => (
            <a 
              key={phone}
              href={'tel:+' + phone}
              style={{ textDecoration: 'none' }}
            >
              { formatPhone(phone) }
            </a>
          )) 
        }</div>
        <div className="city-info__item">Стоимость услуги { price && formatPrice(price)}</div>
      </div>
    </>
  );
};