import React from 'react'
import '../styles/Challenge1.css'
import '../styles/Challenge3.css'

type currencyType = {
  code: string
  country: string
}

type currencyRateType = {
  date: string
  code: string
  rate: number
}

export const Challenge3: React.FunctionComponent<{}> = () => {
  const [currency, setCurrency] = React.useState<string>('showall')
  const [listCurrency, setListCurrency] = React.useState<currencyType[]>([])
  const [listRateCurrency, setListRateCurrency] = React.useState<currencyRateType[]>([])

  React.useEffect(() => {
    const _fetchDataCurrency = async () => {
      const listCurrenciesResponse = await fetch('http://localhost:3001/list-currency')
      const listCurrenciesRaw = await listCurrenciesResponse.json()
      const listCurrencies = [{ code: 'showall', country: 'All' }, ...listCurrenciesRaw?.data]

      setListCurrency(listCurrencies)
    }

    _fetchDataCurrency()
  }, [])

  React.useEffect(() => {
    const _fetchDataCurrencyRate = async () => {
      const listCurrenciesRateResponse = await fetch(`http://localhost:3001/list-currency/${currency}`)
      const listCurrenciesRate = await listCurrenciesRateResponse.json()

      setListRateCurrency(listCurrenciesRate?.data)
    }

    _fetchDataCurrencyRate()
  }, [currency])

  return (
    <>
      <select name="currency" onChange={e => setCurrency(e.target.value)}>
        {listCurrency.map((item, index) => (
          <option key={index} value={item.code}>
            {item.code?.toUpperCase()}
          </option>
        ))}
      </select>

      <hr />

      <div className="tableContainer">
        <table className="table" style={{ minWidth: 400 }}>
          <thead>
            <tr>
              <th>Base</th>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {listRateCurrency.map((item, index) => (
              <tr key={index}>
                <td>{item.code}</td>
                <td>{item.code}</td>
                <td>{item.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
