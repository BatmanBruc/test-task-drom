import { useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Form from '@/components/base/Form';
import Input from '@/components/base/Input';
import InputPhone from '@/components/base/InputPhone';
import Button from '@/components/base/Button';
import Select from '@/components/base/Select';
import CityInfo from '@/components/CityInfo';

import { getCities, getInfoByCity, setOrder } from '@/api';
import { defaultCityId } from '@/config';

import { OptionObject } from '@/components/types';
import { City, CityDaysStructur, CityDate, CityDateStructur } from '@/types';
import { formatDate } from '@/helpers';

export default function FormOrder() {

  const [loading, setLoading] = useState<boolean>(false);

  const [selectCityList, setSelectCityList] = useState<OptionObject[]>();
  const [selectDayList, setSelectDayList] = useState<OptionObject[]>();
  const [selectDateTimeList, setSelectDateTimeList] = useState<OptionObject[]>();

  const [city, setCity] = useState<City | null>();
  const [day, setDay] = useState<string >('');
  const [date, setDate] = useState<CityDate | null>();
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [citiesStructur, setCitiesStructur] = useState<{
    [id: string]: City
  }>({});
  const [daysStructur, setDaysStructur] = useState<CityDaysStructur>({});
  const [datesStructur, setDatesStructur] = useState<{
    [datetime: string]: CityDate 
  }>({});

  const requestGetCities = async () => {
    setLoading(true);
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
    setLoading(false);
  }

  const requestGetInfoByCity = async (cityId: string) => {
    const result = await getInfoByCity(cityId);
    setDaysStructur(result);

    const selectTitels = Object.keys(result).map((key) => {
      return {
        title: formatDate(key),
        value: key
      }
    })
    setSelectDayList(selectTitels);
  };

  const selectCity = (cityId: string) => {
    setDay('');
    setDate(null);
    setCity(citiesStructur[cityId]);
    requestGetInfoByCity(cityId);
  };

  const selectDay = (dateKey: string) => {
    setDay(dateKey);
    setSelectDateTimeList([]);
    const day = daysStructur[dateKey];
    const struct: CityDateStructur = {};
    const selectTitels = [];
    for(const key in day) {
      if (!day[key].isBooked){
        struct[key] = day[key];
        selectTitels.push({
          title: `${day[key].begin} - ${day[key].end}`,
          value: day[key].date
        });
      }
    }
    setDatesStructur(struct);
    setSelectDateTimeList(selectTitels);
  }

  const selectTime = (value: string) => {
    setDate(datesStructur[value]);
  };

  const sendForm = () => {
    if (city && date && phone && name){
      setLoading(true);
      setOrder({
        city,
        date,
        phone,
        name
      });
      setTimeout(() => {
        setCity(null);
        setDay('');
        setDate(null);
        setPhone('');
        setName('');
        setLoading(false);
        toast.success('Запись успешно прошла!')
      }, 1000);
    }
  };

  const [isError, setError] = useState<boolean>(false);

  const isValidForm = useMemo(() => {
    return !isError
      && !!date
      && !!phone
      && !!name
  }, [isError, date, phone, name]);

  const handlerInvalidInput = (error: string) => {
    setError(!!error);
  };

  const [errorSelectTime, setErrorSelectTime] = useState<string>('');
  const handlerInvalidSelectTime = (error: string) => {
    setError(!!error);
    setErrorSelectTime(error);
  };

  useEffect(() => {
    requestGetCities();
  }, []);

  return (
    <>
      <div className="form-order">
        { loading && <div className="loading-cover"></div>}
        <div className="logo">
          { loading && <img className="logo-spinner" src="/spinner.svg"/> }
          <img src="/logo.svg"/>
        </div>
        <h2 style={{marginBottom: '40px'}}>Онлайн запись</h2>
        <Form onSubmit={sendForm}>
          <Select
            name="city"
            placeholder="Город"
            list={selectCityList}
            onChange={selectCity}
            value={city?.id || ''}
          />
          { !!city && 
            <CityInfo
              address={city.address}
              phones={city.phones}
              price={city.price}
            />
          }
          <div className="block-date-time">
            <div className="block-date-time__fields">
              <Select
                name="day"
                value={day}
                list={selectDayList} 
                onChange={selectDay}
                placeholder="Дата"
              />
              <Select
                name="date"
                disabled={!day || !selectDateTimeList?.length}
                value={date?.date || ''}
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
            value={phone}
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
            value={name}
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
        <Toaster/>
      </div>
    </>
  );
};