export const formatPrice = (price: number) => {
  return price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })
}

export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `+7 ($1) $2 $3 $4`)
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatDate = (date: string) => {
  return capitalizeFirstLetter((new Date(date)).toLocaleDateString("ru", {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }))
}