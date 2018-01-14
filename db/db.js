import Sequelize from 'sequelize';
import {TrainingSkillArr} from './HelperArrays';
const db = new Sequelize('postgres://xkiwtpkezxmdyr:211fd7770bb926a741e6084b5ffb6036ceca414bf5110d7f96387b3b7eb9509a@ec2-54-217-218-80.eu-west-1.compute.amazonaws.com:5432/deurq5499j4r5r');

console.log("EVO MENE OVDEEE ", db);
const PersonCl = db.define('personCl', {
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  facebookLink: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  instagramLink: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    }
  },
  cellPhone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  about: {
    type: Sequelize.STRING,
  },
  birthPlace: {
    type: Sequelize.STRING,
  },
  hasCerificates: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,

  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  skillsArr: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  }
});

const Certification = db.define('certification', {
  name: {
    type: Sequelize.STRING,
  },
  certUrl: {
    type: Sequelize.STRING,
  }
})

PersonCl.hasMany(Certification);

const TrainingSkill = db.define('trainingSkill', {
  trainSkillName: {
    type: Sequelize.STRING,
  },
})
const PersonTrainingSkill = db.define('personTrainingSkill');
TrainingSkill.hasMany(PersonTrainingSkill);
PersonCl.hasMany(PersonTrainingSkill);


const PersonTrainingSkillArr = [
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


const PersonArr = [
  {
    password: '2131SDA1',
    email: 'luka.simjanovic@gma.com',
    firstName: 'Luki',
    lastName: 'Muki',
    cellPhone: '2133123',
    imageUrl: 'http://www.locale.png.com',
    skillsArr: [1,3,5],
    instagramLink: 'https://www.instagram.com/golazohub/',
    facebookLink: 'https://www.facebook.com/jordanyeohfitness/',
  },
  {
    password: '23!!!23',
    email: 'simjanovic@gma.com',
    firstName: 'Tuki',
    lastName: 'Ruki',
    cellPhone: '122133123',
    imageUrl: 'http://www.locale.jbg.com',
    skillsArr: [2,8,9],
    instagramLink: 'https://www.instagram.com/heartrunnergirl/',
    facebookLink: 'https://www.facebook.com/arnold/'
  },
  {
    password: '213#%^11',
    firstName: 'Zuki',
    lastName: 'Jang Kuki',
    cellPhone: '23218123',
    imageUrl: 'http://www.loasle.png.com',
    email: 'luka.simjanovic@gmas.com',
    skillsArr: [2,3,6],
    instagramLink: 'https://www.instagram.com/scrfitness/',
    facebookLink: 'https://www.facebook.com/djokovic.official/',
  },
]
db.sync({force: true}).then(() => {
  PersonArr.map(async item => {
    await PersonCl.create(item);
  });
  TrainingSkillArr.map(async item => {
    await TrainingSkill.create(item);
  })
  PersonTrainingSkillArr.map(async item => {
    await PersonTrainingSkill.create(item);
  })
});

export default db;
