import createDebug from 'debug';

const debug = createDebug('bot:today_command');

// Array of Seragam where 0 index refer to Sunday
const seragamArray = [
  'Bebas lah, da hari Minggu ini',
  'Merah Putih',
  'Olahraga, bekal Merah Putih',
  'Merah Putih',
  'Baju Gagas Ceria Kotak',
  'Baju Bebas',
  'Bebas lah, da hari Minggu ini',
];

// Array of pelajaran where 0 index refer to Sunday
const pelajaranArray = [
  'Bebas lah, mo main Roblox juga boleh',
  '\\- IND\n\\- MAT\n\\- SENI',
  '\\- ORHE\n\\- MAT\n\\- IND\\-I\n',
  '\\- EFL\n\\- MAT\n\\- GCS',
  '\\- MAT\n\\- IND\\-i\n\\- AGAMA\n GCS',
  '\\- GCS\n\\- EFL\n\\- IND\\-i\n\\- GCS',
  'Bebas lah, mo main Roblox juga boleh',
];

type AnetaEvent = {
  name: string;
  url: string;
  course: {
    shortname: string;
  };
};

export async function getSchedule(date: Date) {
  const options = { timeZone: 'Asia/Jakarta' };
  const dateString = date.toLocaleDateString('en-US', options);

  const timezoneAdjustedDate = new Date(dateString);
  const day = timezoneAdjustedDate.getDay();

  debug(`Today date: ${date}`);

  const tugasFromAneta = await fetchTugasFromAneta();

  const messages = [
    `Today is *${date}*`,
    `*Seragam*: ${seragamArray[day]}`,
    `*Pelajaran*:\n\n${pelajaranArray[day]}`,
    `*Tugas*:\n\n${escapeMessage(tugasFromAneta)}`,
  ];
  const combinedMessage = messages.join('\n');

  debug(`Sending message: ${combinedMessage}`);

  return combinedMessage;
}

async function fetchTugasFromAneta() {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

  const anetaTopken = process.env.ANETA_TOKEN || '';
  const request = [
    {
      index: 0,
      methodname: 'core_calendar_get_calendar_day_view',
      args: {
        year: '2023',
        month: '8',
        day: '17',
        courseid: 1,
        categoryid: 88,
      },
    },
  ];

  const result = await fetch(
    `https://gagasceria.aneta.id/lib/ajax/service.php?sesskey=${anetaTopken}&info=core_calendar_get_calendar_day_view`,
    {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language':
          'en-US,en;q=0.9,id;q=0.8,ms;q=0.7,zh-CN;q=0.6,zh;q=0.5,de;q=0.4',
        'content-type': 'application/json',
        'sec-ch-ua':
          '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest',
        cookie: 'MoodleSession=q0rs4qopmagfame91qvc3r3fc7',
        Referer:
          'https://gagasceria.aneta.id/calendar/view.php?view=day&time=1691946000&category=88',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: JSON.stringify(request),
      method: 'POST',
    },
  );

  const response = await result.json();

  console.log('Response', response);
  debug(`Got response from aneta: ${response[0]}`);

  try {
    const events = response[0].data.events;
    return events.map((event: AnetaEvent) => `- ${event.name}`).join('\n');
  } catch (err) {
    console.error(err);
    return "Can't fetch data from Aneta.";
  }
}

function escapeMessage(message: string): string {
  return message
    .replace('.', '\\.')
    .replace('-', '\\-')
    .replace('_', '\\_')
    .replace('*', '\\*')
    .replace('[', '\\[')
    .replace('`', '\\`')
    .replace('(', '\\(`')
    .replace(')', '\\)`');
}
