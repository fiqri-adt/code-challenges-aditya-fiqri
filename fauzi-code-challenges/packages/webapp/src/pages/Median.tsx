import React from 'react'
import '../styles/Challenge2.css'

export const Median: React.FunctionComponent<{}> = () => {
  const [numList, setNumList] = React.useState<number[]>([])

  const renderNumber = (): void => {
    const numberList = []

    for (let i = 0; i < 5; i++) {
      const rand = Math.floor(Math.random() * 99) + 10
      numberList.push(rand)
    }

    setNumList(numberList)
  }

  const submitData = (num: number): void => {
    const sortNumList = [...numList].sort(function (a, b) {
      return a - b
    })
    const half = Math.floor(sortNumList.length / 2)

    if (sortNumList[half] === num) alert('Angka Adalah Median')
    else alert('Angka Bukanlah Median')

    renderNumber()
  }

  React.useEffect(() => {
    renderNumber()
  }, [])

  return (
    <>
      <div className="median">
        <div className="median__header">
          <div>
            <select>
              <option>MEGA-SENA</option>
            </select>
          </div>

          <div className="median__content">
            <div className="median__logo"></div>
            <div className="median__title">MEGA-SENA</div>
          </div>

          <div className="median__end">
            <div className="median__title">CONCURSO</div>
            <div className="median__desc">4531 - 07/04/2020</div>
          </div>
        </div>

        <div className="median__body">
          <div className="median__circle-bg"></div>
          {numList.map(item => (
            <button key={item} className="median__btn" onClick={() => submitData(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Median
