import test from 'ava';
import wareki from './src/index';

test('returns era year', t => {
  t.is(wareki('2018-01-01'), '平成30');
  t.is(wareki('2018/01/01'), '平成30');
  t.is(wareki('2018-1-1'), '平成30');
  t.is(wareki('2018/01/1'), '平成30');
  t.is(wareki(1514764800000), '平成30');

  t.is(wareki('1868-01-24'), 1868);
  t.is(wareki('1868-01-25'), '明治元');
  t.is(wareki('1912-07-29'), '明治45');
  t.is(wareki('1912-07-30'), '大正元');
  t.is(wareki('1926-12-24'), '大正15');
  t.is(wareki('1926-12-25'), '昭和元');
  t.is(wareki('1989-01-07'), '昭和64');
  t.is(wareki('1989-01-08'), '平成元');
  t.is(wareki('2019-04-30'), '平成31');
  t.is(wareki('2019-05-01'), '平成31');
  t.is(wareki(0), '昭和45');
  t.is(wareki(10000), '昭和45');
  t.is(wareki(1000000), '昭和45');
  t.is(wareki(-100), '昭和45');
});

test('invalid date returns NaN', t => {
  t.is(wareki('invalid'), NaN);
  t.is(wareki('20180101'), NaN);
  t.is(wareki('2018年1月1日'), NaN);
});

test('with unit options', t => {
  const opts = { unit: true };
  t.is(wareki('1868-01-24', opts), '1868年');
  t.is(wareki('1989-01-07', opts), '昭和64年');
  t.is(wareki('1989-01-08', opts), '平成元年');
  t.is(wareki('2018-01-01', opts), '平成30年');
});