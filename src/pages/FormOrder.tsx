import { useEffect, useMemo, useState } from 'react';
import Form from '@/components/Form';
import Input from '@/components/Input';
import InputPhone from '@/components/InputPhone';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { getCities, getInfoByCity, setOrder } from '@/api';
import { defaultCityId } from '@/config';

import { OptionObject } from '@/components/types';
import { City, CityDaysStructur, CityDate, CityDateStructur } from '@/types';

export default function FormOrder() {

  const [selectCityList, setSelectCityList] = useState<OptionObject[]>()
  const [selectDayList, setSelectDayList] = useState<string[]>();
  const [selectDateTimeList, setSelectDateTimeList] = useState<OptionObject[]>()

  const [city, setCity] = useState<City>();
  const [date, setDate] = useState<CityDate>();
  const [phone, setPhone] = useState<string>();
  const [name, setName] = useState<string>();

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })
  }

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `+7 ($1) $2 $3 $4`)
  }

  const [citiesStructur, setCitiesStructur] = useState<{
    [id: string]: City
  }>({})
  const [daysStructur, setDaysStructur] = useState<CityDaysStructur>({})
  const [datesStructur, setDatesStructur] = useState<{
    [datetime: string]: CityDate 
  }>({})

  const requestGetCities = async () => {
    const cities = await getCities();
    const struct: {
      [id: string]: City
    } = {};
    setSelectCityList(cities?.map((city) => {
      struct[city.id] = city;
      return {
        title: city.name,
        value: city.id
      }
    }));
    setCitiesStructur(struct);
    setCity(struct[defaultCityId]);
    requestGetInfoByCity(defaultCityId);
  }

  const requestGetInfoByCity = async (cityId: string) => {
    const result = await getInfoByCity(cityId);
    setDaysStructur(result)
    setSelectDayList(Object.keys(result))
  }

  const selectCity = (cityId: string) => {
    setCity(citiesStructur[cityId]);
    requestGetInfoByCity(cityId)
  }

  const selectDate = (dateKey: string) => {
    const date = daysStructur[dateKey];
    setDatesStructur(date)
    const struct: CityDateStructur = {}
    const selectTitels = [];
    for(const key in date) {
      struct[key] = date[key]
      selectTitels.push({
        title: `${date[key].begin} - ${date[key].end}`,
        value: date[key].date
      })
    }
    setSelectDateTimeList(selectTitels)
  }

  const selectTime = (value: string) => {
    console.log(datesStructur[value]);
    setDate(datesStructur[value])
  }

  const sendForm = () => {
    setOrder({
      city,
      date,
      phone,
      name
    })
  }

  const [isError, setError] = useState<boolean>(false);

  const isValidForm = useMemo(() => {
    console.log(!isError
      && !!date
      && !!phone
      && !!name)
    return !isError
      && !!date
      && !!phone
      && !!name
  }, [isError, date, phone, name])

  const handlerInvalidInput = (error: string) => {
    setError(!!error);
  }

  const [errorSelectTime, setErrorSelectTime] = useState<string>('');
  const handlerInvalidSelectTime = (error: string) => {
    console.log(error)
    setError(!!error);
    setErrorSelectTime(error)
  }

  useEffect(() => {
    requestGetCities();
  }, [])

  return (
    <>
      <div className="form-order">
        <div className="logo"><img src="/logo.svg"/></div>
        <h2 style={{marginBottom: '40px'}}>Онлайн запись</h2>
        <Form onSubmit={sendForm}>
          <Select
            name="city"
            list={selectCityList}
            onChange={selectCity}
            defaultValue={defaultCityId}
          />
          <div className="city-info">
            <div className="city-info__item">{ city?.address }</div>
            <div className="city-info__item" style={{ display: 'flex', gap: '5px' }}>{
              city?.phones.map(phone => (
                <a 
                  key={phone}
                  href={'tel:+' + phone}
                  style={{ textDecoration: 'none' }}
                >
                  { formatPhone(phone) }
                </a>
              )) 
            }</div>
            <div className="city-info__item">Стоимость услуги { city?.price && formatPrice(city?.price)}</div>
          </div>
          <div className="block-date-time">
            <div className="block-date-time__fields">
              <Select
                name="date"
                list={selectDayList} 
                onChange={selectDate}
                placeholder="Дата"
              />
              <Select
                name="datetime"
                list={selectDateTimeList} 
                onChange={selectTime}
                required
                requiredErrorMessage="Пожалуйста, укажите время"
                placeholder="Время"
                showError={false}
                onInvalid={handlerInvalidSelectTime}
              />
            </div>
            { errorSelectTime && (<div className="field-error">{ errorSelectTime }</div>) }
          </div>
          <InputPhone
            name="phone"
            onChange={setPhone}
            required
            requiredErrorMessage="Пожалуйста, укажите телефон, иначе наши специалисты не смогу связаться с вами"
            pattern={/^\d{11}$/}
            validateErrorMessage="Пожалуйста, введите корректный телефон, иначе наши специалисты не смогу связаться с вами"
            onInvalid={handlerInvalidInput}
            placeholder="Телефон"
          />
          <Input
            name="name"
            onChange={setName}
            required
            requiredErrorMessage="Пожалуйста, укажите имя"
            onInvalid={handlerInvalidInput}
            placeholder="Имя"
          />
          <Button
            title="Записаться"
            disabled={!isValidForm}
          />
        </Form>
      </div>
    </>
  )
}