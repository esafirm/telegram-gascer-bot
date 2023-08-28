import { getToday, getTomorrow, setNow } from './DateProvider';

test('it should return today date', async () => {
  setNow(new Date('2023-01-01T00:00:00.000Z'));

  const today = getToday();

  // Jan 1 2023 is Sunday
  expect(today.getDay()).toEqual(0);
});

test('it should return tomorrow date', async () => {
  setNow(new Date('2023-07-01T00:00:00.000Z'));

  const today = getTomorrow();

  // Jan 8 2023 is Sunday
  expect(today.getDay()).toEqual(0);
});
