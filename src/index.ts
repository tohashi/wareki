type Options = {
  unit?: boolean;
  newEraEnabled?: boolean;
  newEraName?: string;
};

const eraDataList = [
  {
    code: 'newEra',
    name: '新元号',
    firstDate: '2019-05-01'
  },
  {
    code: 'heisei',
    name: '平成',
    firstDate: '1989-01-08'
  },
  {
    code: 'showa',
    name: '昭和',
    firstDate: '1926-12-25'
  },
  {
    code: 'taisho',
    name: '大正',
    firstDate: '1912-07-30'
  },
  {
    code: 'meiji',
    name: '明治',
    firstDate: '1868-01-25'
  }
];

export default function(
  value: string | number = Date.now(),
  opts: Options = {}
): string | number {
  const dateObj = new Date(value);
  const year = dateObj.getFullYear();
  if (isNaN(year)) {
    return year;
  }
  let wareki = `${year}`;

  for (let i = 0; i < eraDataList.length; i++) {
    const eraData = eraDataList[i];
    const { code, firstDate } = eraData;
    let { name } = eraData;
    if (code === 'newEra') {
      if (!opts.newEraEnabled) {
        continue;
      } else if (opts.newEraName != null) {
        name = opts.newEraName;
      }
    }
    const eraFirstDateObj = new Date(firstDate);
    if (dateObj.getTime() - eraFirstDateObj.getTime() >= 0) {
      let eraYear = `${year - eraFirstDateObj.getFullYear() + 1}`;
      if (eraYear === '1') {
        eraYear = '元';
      }
      wareki = `${name}${eraYear}`;
      break;
    }
  }
  if (opts.unit) {
    wareki += '年';
  }

  if (!isNaN(Number(wareki))) {
    return Number(wareki);
  }
  return wareki;
}
