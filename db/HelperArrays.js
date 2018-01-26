const DEV_STRING = 'postgres://fitnetmaster:jebemtimater123@fitnetdb.c1xl4fohydwy.us-east-2.rds.amazonaws.com/fitnetdb';
const PROD_STRING = 'postgres://xkiwtpkezxmdyr:211fd7770bb926a741e6084b5ffb6036ceca414bf5110d7f96387b3b7eb9509a@ec2-54-217-218-80.eu-west-1.compute.amazonaws.com:5432/deurq5499j4r5r';

export const PersonArr = [
  {
    password: '2131SDA1',
    email: 'luka.simjanovic@gma.com',
    firstName: 'Luki',
    lastName: 'Muki',
    birthPlace: 'Beograd',
    birthDay: '1989-05-01 04:05:02',
    cellPhone: '2133123',
    imageUrl: 'http://www.locale.png.com',
    skillsArr: [1,3,5],
    countyArr: [2,3,5],
    hasCerificates: true,
    score: 5,
    instagramLink: 'https://www.instagram.com/golazohub/',
    facebookLink: 'https://www.facebook.com/jordanyeohfitness/',
  },
  {
    password: '23!!!23',
    email: 'simjanovic@gma.com',
    firstName: 'Tuki',
    lastName: 'Ruki',
    birthPlace: 'Smederevo',
    birthDay: '1987-09-01 04:05:02',
    cellPhone: '122133123',
    imageUrl: 'http://www.locale.jbg.com',
    skillsArr: [2,8,9],
    countyArr: [1],
    hasCerificates: true,
    score: 3,
    instagramLink: 'https://www.instagram.com/heartrunnergirl/',
    facebookLink: 'https://www.facebook.com/arnold/'
  },
  {
    password: '213#%^11',
    firstName: 'Zuki',
    lastName: 'Jang Kuki',
    cellPhone: '23218123',
    birthPlace: 'Beograd',
    birthDay: '1995-08-09 04:05:02',
    imageUrl: 'http://www.loasle.png.com',
    email: 'luka.simjanovic@gmas.com',
    countyArr: [3, 6],
    skillsArr: [2, 3, 6],
    hasCerificates: true,
    score: 7,
    instagramLink: 'https://www.instagram.com/scrfitness/',
    facebookLink: 'https://www.facebook.com/djokovic.official/',
  },
  {
    password: 'a1213#%^11',
    firstName: 'Lecuki',
    lastName: 'Wiz Khaled',
    cellPhone: '232100112',
    birthPlace: 'Jagodina',
    birthDay: '1999-08-09 04:05:02',
    imageUrl: 'http://www.loksleloasle.png.com',
    email: 'wiz.khaledi@gmas.com',
    countyArr: [3, 2],
    skillsArr: [1, 6, 10],
    hasCerificates: true,
    score: 10,
    instagramLink: 'https://www.instagram.com/fitnessew/',
    facebookLink: 'https://www.facebook.com/kovic.official/',
  },
  {
    password: '90112231',
    firstName: 'Lea kis',
    lastName: 'Quavo',
    cellPhone: '0632200112',
    birthPlace: 'Krusedol',
    birthDay: '1987-08-09 04:05:02',
    imageUrl: 'http://www.mojkovac.png.com',
    email: 'mojkovax@gmas.com',
    countyArr: [1, 4],
    skillsArr: [2, 6, 9],
    hasCerificates: false,
    score: 2,
    instagramLink: 'https://www.instagram.com/fitnesolie/',
    facebookLink: 'https://www.facebook.com/officialee/',
  },
]
export const PersonTrainingSkillArr = [
  {
    trainingSkillId: 1,
    personClId: 1,
  },
  {
    trainingSkillId: 3,
    personClId: 1,
  },
  {
    trainingSkillId: 5,
    personClId: 1,
  },
  {
    trainingSkillId: 2,
    personClId: 2,
  },
  {
    trainingSkillId: 8,
    personClId: 2,
  },
  {
    trainingSkillId: 9,
    personClId: 2,
  },
  {
    trainingSkillId: 2,
    personClId: 3,
  },
  {
    trainingSkillId: 3,
    personClId: 3,
  },
  {
    trainingSkillId: 6,
    personClId: 3,
  },

]

export const TrainingSkillArr = [
  {
    trainSkillName: 'Bodybuilding',
  },
  {
    trainSkillName: 'Fitness',
  },
  {
    trainSkillName: 'Cross Fit',
  },
  {
    trainSkillName: 'Dizanje tegova'
  },
  {
    trainSkillName: 'Boks'
  },
  {
    trainSkillName: 'Kardio Boks',
  },
  {
    trainSkillName: 'Kik boks',
  },
  {
    trainSkillName: 'Kardio kik boks',
  },
  {
    trainSkillName: 'Muay Thai',
  },
  {
    trainSkillName: 'MMA'
  },
  {
    trainSkillName: 'Brazilski Jiu Jitsu'
  },
  {
    trainSkillName: 'Grapling',
  },
  {
    trainSkillName: 'Judo',
  },
  {
    trainSkillName: 'Kung Fu',
  },
  {
    trainSkillName: 'Wing Chun',
  },
  {
    trainSkillName: 'Krav Maga'
  },
  {
    trainSkillName: 'Karate'
  },
  {
    trainSkillName: 'Atletika',
  },
  {
    trainSkillName: 'Gimnastika',
  },
  {
    trainSkillName: 'Veslanje',
  },
  {
    trainSkillName: 'Triaton',
  },
  {
    trainSkillName: 'Biciklizam'
  },
  {
    trainSkillName: 'Tenis'
  },
  {
    trainSkillName: 'Fudbal',
  },
  {
    trainSkillName: 'Kosarka'
  },
  {
    trainSkillName: 'Ragbi',
  },
  {
    trainSkillName: 'Americki fudbal',
  },
  {
    trainSkillName: 'Rukomet',
  },
  {
    trainSkillName: 'Vaterpolo',
  },
  {
    trainSkillName: 'Odbojka'
  },
  {
    trainSkillName: 'Hokej'
  },
  {
    trainSkillName: 'Klizanje',
  },
  {
    trainSkillName: 'Skijanje',
  },
  {
    trainSkillName: 'Skijaski skokovi',
  },
  {
    trainSkillName: 'Snowboarding',
  },
  {
    trainSkillName: 'Alpinizam'
  },
  {
    trainSkillName: 'Sportsko penjanje'
  },
  {
    trainSkillName: 'Taekwondo',
  },
  {
    trainSkillName: 'Sambo',
  },
]
export const CityArr = [
  {
    cityName: 'Beograd',
  },
  {
    cityName: 'Novi Sad',
  },
]
export const CountyArr = [
  {
    countyName: 'Mirijevo',
    cityId: 1,
  },
  {
    countyName: 'Savski venac',
    cityId: 1,
  },
  {
    countyName: 'Zvezdara',
    cityId: 1,
  },
  {
    countyName: 'Cukarica',
    cityId: 1,
  },
  {
    countyName: 'Borca',
    cityId: 1,
  },
  {
    countyName: 'Jerkovic',
    cityId: 1,
  },
  {
    countyName: 'Palilula',
    cityId: 1,
  }
];
export const PersonCountyHelper = [
  {
    personClId: 3,
    countyId: 1,
    price: 6200,
    groupTraining: false,
    address: 'Veljka Vlahovica 3a',
  },
  {
    personClId: 3,
    countyId: 1,
    price: 3200,
    groupTraining: true,
    address: 'Veljka Vlahovic 3a',

  },
  {
    personClId: 1,
    countyId: 1,
    price: 2200,
    groupTraining: false,
    address: 'Veljka Vlahovica 3a',
  },
  {
    personClId: 1,
    countyId: 1,
    price: 3200,
    groupTraining: true,
    address: 'Veljka Vlahovica 3a',
  },
  {
    personClId: 3,
    countyId: 5,
    price: 3200,
    groupTraining: false,
    address: 'Palmira Toljatija 25',
  },
  {
    personClId: 3,
    countyId: 5,
    price: 1200,
    groupTraining: true,
    address: 'Palmira Toljatija 25',
  },
  {
    personClId: 1,
    countyId: 2,
    price: 3200,
    groupTraining: false,
    address: 'Teodora Mirijevskog 7v',
  },
  {
    personClId: 1,
    countyId: 2,
    price: 2200,
    groupTraining: true,
    address: 'Teodora Mirijevskog 7v',
  },
  {
    personClId: 3,
    countyId: 2,
    price: 1200,
    groupTraining: false,
    address: 'Teodora Mirijevskog 7v',
  },
  {
    personClId: 3,
    countyId: 5,
    price: 4200,
    groupTraining: true,
    address: 'Jurija Gagarina 7v',
  },
  {
    personClId: 3,
    countyId: 5,
    price: 3200,
    groupTraining: false,
    address: 'Jurija Gagarina 7b',
  },
  {
    personClId: 4,
    countyId: 1,
    price: 3200,
    groupTraining: true,
    address: 'Brace Jerkovic 21',
  },
  {
    personClId: 4,
    countyId: 1,
    price: 1800,
    groupTraining: false,
    address: 'Brace Jugovic 21',
  },
  {
    personClId: 5,
    countyId: 4,
    price: 2400,
    groupTraining: true,
    address: 'Zmaja od Nocaja 2s',
  },
  {
    personClId: 5,
    countyId: 4,
    price: 1200,
    groupTraining: false,
    address: 'Zmaja od Nocaja 2s',
  },
  {
    personClId: 5,
    countyId: 1,
    price: 2200,
    groupTraining: true,
    address: 'Brace Jerkovic 22a',
  },
]
