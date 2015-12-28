const eraDataList = [
  {
    jaName: '平成',
    firstDate: '1989-01-08',
  },
  {
    jaName: '昭和',
    firstDate: '1926-12-25',
  },
  {
    jaName: '大正',
    firstDate: '1912-07-30',
  },
  {
    jaName: '明治',
    firstDate: '1868-01-25'
  }
];

export default function(value = Date.now()) {
  const dateObj = new Date(value);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  let wareki = year;

  for (let i = 0; i < eraDataList.length; i++) {
    let eraData = eraDataList[i];
    let eraFirstDateObj = new Date(eraData.firstDate);
    if (dateObj - eraFirstDateObj >= 0) {
      let eraYear = year - eraFirstDateObj.getFullYear() + 1;
      if (eraYear === 1) {
        eraYear = '元'
      }
      wareki = `${eraData.jaName}${eraYear}`;
      break;
    }
  }
  return wareki;
}

