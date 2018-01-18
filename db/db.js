import Sequelize from 'sequelize';
import {
  TrainingSkillArr,
  PersonArr,
  CountyArr,
  CityArr,
  PersonTrainingSkillArr,
  PersonCountyHelper,
} from './HelperArrays';
let sqlUrl = "";
if(process.env.NODE_ENV === 'production') {
  sqlUrl = 'postgres://xkiwtpkezxmdyr:211fd7770bb926a741e6084b5ffb6036ceca414bf5110d7f96387b3b7eb9509a@ec2-54-217-218-80.eu-west-1.compute.amazonaws.com:5432/deurq5499j4r5r';
}else {
  sqlUrl = 'postgres://fitnetmaster:jebemtimater123@fitnetdb.c1xl4fohydwy.us-east-2.rds.amazonaws.com/fitnetdb';
}
const db = new Sequelize(sqlUrl);
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
    allowNull: false,
  },
  birthDay: {
    type: Sequelize.DATE,
    allowNull: false,
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
  },
  countyArr: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  score: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  }
});

const County = db.define('county', {
  countyName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const City = db.define('city', {
  cityName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

City.hasMany(County);

const PersonCounty = db.define('personCounty', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  groupTraining: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

PersonCl.hasMany(PersonCounty);
County.hasMany(PersonCounty);

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
});

const PersonTrainingSkill = db.define('personTrainingSkill');

TrainingSkill.hasMany(PersonTrainingSkill);
PersonCl.hasMany(PersonTrainingSkill);



db.sync({force: true}).then(() => {
  PersonArr.map(async item => {
    await PersonCl.create(item);
  });
  TrainingSkillArr.map(async item => {
    await TrainingSkill.create(item);
  });
  PersonTrainingSkillArr.map(async item => {
    await PersonTrainingSkill.create(item);
  });
  CityArr.map(async item => {
    await City.create(item);
  });
  CountyArr.map(async item => {
    await County.create(item);
  })
  PersonCountyHelper.map(async item => {
    await PersonCounty.create(item);
  })
});

export default db;
