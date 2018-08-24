interface IOptions {
  unit?: boolean
  newEraEnabled?: boolean
  newEraName?: string
}

const eraDataList = [
  {
    code: 'newEra',
    firstDate: '2019-05-01T00:00:00.000Z',
    name: '新元号'
  },
  {
    code: 'heisei',
    firstDate: '1989-01-08T00:00:00.000Z',
    name: '平成'
  },
  {
    code: 'showa',
    firstDate: '1926-12-25T00:00:00.000Z',
    name: '昭和'
  },
  {
    code: 'taisho',
    firstDate: '1912-07-30T00:00:00.000Z',
    name: '大正'
  },
  {
    code: 'meiji',
    firstDate: '1868-01-25T00:00:00.000Z',
    name: '明治'
  }
]

export default function(
  value: string | number = Date.now(),
  opts: IOptions = {}
): string | number {
  let dateObj = new Date(value)
  if (dateObj.toString() === 'Invalid Date') {
    return NaN
  }
  // Adjust for timezone when specifying only date
  if (/^\d{4}(\/|-)\d{1,2}(\/|-)\d{1,2}$/.test(`${value}`)) {
    dateObj = new Date(
      dateObj.getTime() - dateObj.getTimezoneOffset() * 60 * 1000
    )
  }
  const year = dateObj.getUTCFullYear()
  let wareki = `${year}`

  for (const eraData of eraDataList) {
    const { code, firstDate } = eraData
    let { name } = eraData
    if (code === 'newEra') {
      if (!opts.newEraEnabled) {
        continue
      } else if (opts.newEraName != null) {
        name = opts.newEraName
      }
    }
    const eraFirstDateObj = new Date(firstDate)
    if (dateObj.getTime() - eraFirstDateObj.getTime() >= 0) {
      let eraYear = `${year - eraFirstDateObj.getUTCFullYear() + 1}`
      if (eraYear === '1') {
        eraYear = '元'
      }
      wareki = `${name}${eraYear}`
      break
    }
  }
  if (opts.unit) {
    wareki += '年'
  }

  if (!isNaN(Number(wareki))) {
    return Number(wareki)
  }
  return wareki
}
