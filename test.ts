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
});

test('invalid date returns NaN', t => {
  t.is(wareki('invalid'), NaN);
  t.is(wareki('20180101'), NaN);
  t.is(wareki('2018年1月1日'), NaN);
});

test('with options', t => {
  t.is(wareki('2022-01-01', { unit: true, newEraEnabled: true }), '新元号4年');
  t.is(
    wareki('2030-01-01', {
      unit: true,
      newEraEnabled: true,
      newEraName: '大化'
    }),
    '大化12年'
  );
});

test('with unit option', t => {
  t.is(wareki('1868-01-24', { unit: true }), '1868年');
  t.is(wareki('1868-01-24', { unit: false }), 1868);
  t.is(wareki('2018-01-01', { unit: true }), '平成30年');
  t.is(wareki('2018-01-01', { unit: false }), '平成30');
});

test('with newEraEnabled option', t => {
  t.is(wareki('1868-01-24', { newEraEnabled: true }), 1868);
  t.is(wareki('2019-04-30', { newEraEnabled: true }), '平成31');
  t.is(wareki('2019-04-30', { newEraEnabled: false }), '平成31');
  t.is(wareki('2019-05-01', { newEraEnabled: true }), '新元号元');
  t.is(wareki('2019-05-01', { newEraEnabled: false }), '平成31');
  t.is(wareki('2020-01-01', { newEraEnabled: true }), '新元号2');
  t.is(wareki('2020-01-01', { newEraEnabled: false }), '平成32');
});

test('with newEraName option', t => {
  t.is(
    wareki('2019-05-01', { newEraEnabled: true, newEraName: '慶応' }),
    '慶応元'
  );
  t.is(wareki('2019-05-01', { newEraEnabled: true, newEraName: '' }), '元');
  t.is(
    wareki('2019-05-01', { newEraEnabled: false, newEraName: '慶応' }),
    '平成31'
  );
  t.is(
    wareki('2020-01-01', { newEraEnabled: true, newEraName: '慶応' }),
    '慶応2'
  );
  t.is(wareki('2020-01-01', { newEraEnabled: true, newEraName: '' }), 2);
  t.is(
    wareki('2020-01-01', { newEraEnabled: false, newEraName: '慶応' }),
    '平成32'
  );
});
