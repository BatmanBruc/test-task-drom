export type City = {
    id: string,
    name: string,
    address: string
    phones: string[],
    price: number
}

export type CityDate = {
    day: string,
    begin: string,
    end: string,
    date: string,
    isBooked: boolean
}

export type CityDateStructur = {
    [date: string]: CityDate
}

export type CityDaysStructur = {
    [day: string]: CityDateStructur
}

export type Order = {
    id?: string
    city: City
    date: CityDate
    phone: string
    name: string
}