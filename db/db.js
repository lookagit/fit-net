import Sequelize from 'sequelize';

import {
  TrainingSkillArr,
  PersonArr,
  CountyArr,
  CityArr,
  PersonTrainingSkillArr,
  PersonCountyHelper,
} from './HelperArrays';

import {
  ClubsHelperArr,
  MembershipFeesArr,
  WorkingTimesArr,
  ClubGalleryArr,
} from './ClubsHelper';

import {
  FisioCategoriesArr,
  FisioArr,
  FisioCountyArr,
} from './FisioArray';

var db;

if (process.env.NODE_ENV == 'production') {
  db = new Sequelize('postgres://xkiwtpkezxmdyr:211fd7770bb926a741e6084b5ffb6036ceca414bf5110d7f96387b3b7eb9509a@ec2-54-217-218-80.eu-west-1.compute.amazonaws.com:5432/deurq5499j4r5r');
} else {
  db = new Sequelize('postgres://xkiwtpkezxmdyr:211fd7770bb926a741e6084b5ffb6036ceca414bf5110d7f96387b3b7eb9509a@ec2-54-217-218-80.eu-west-1.compute.amazonaws.com:5432/deurq5499j4r5r', {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  });
}

const UserCl = db.define('userCl', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  fbId: {
    type: Sequelize.STRING,
  },
  gmailId: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

const PersonCl = db.define('personCl', {
  password: {
    type: Sequelize.STRING,
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
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
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
    type: Sequelize.STRING,
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
  },
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
  },
});

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


const TrainingSkill = db.define('trainingSkill', {
  trainSkillName: {
    type: Sequelize.STRING,
  },
});

const PersonTrainingSkill = db.define('personTrainingSkill');

TrainingSkill.hasMany(PersonTrainingSkill);
PersonCl.hasMany(PersonTrainingSkill);
/**CLUBS TABLES */

const ClubsCl = db.define('clubCl', {
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
  },
  webAddress: {
    type: Sequelize.STRING,
  },
  facebookLink: {
    type: Sequelize.STRING,
  },
  instagramLink: {
    type: Sequelize.STRING,
  },
  profileImageUrl: {
    type: Sequelize.STRING,
  },
  score: {
    type: Sequelize.FLOAT,
  },
  about: {
    type: Sequelize.STRING,
  },
  skillsArr: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  imgsArr: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
});

County.hasMany(ClubsCl);

const MembershipFees = db.define('membershipFees', {
  price: {
    type: Sequelize.FLOAT,
  },
});

ClubsCl.hasMany(MembershipFees);
TrainingSkill.hasMany(MembershipFees);

const Gallery = db.define('gallery', {
  fileUrl: {
    type: Sequelize.STRING,
  },
});

ClubsCl.hasMany(Gallery);

const WorkingTimeClub = db.define('workingTimeClub', {
  workDayFrom: {
    type: Sequelize.INTEGER,
  },
  workDayTo: {
    type: Sequelize.INTEGER,
  },
  satFrom: {
    type: Sequelize.INTEGER,
  },
  satTo: {
    type: Sequelize.INTEGER,
  },
  sunFrom: {
    type: Sequelize.INTEGER,
  },
  sunTo: {
    type: Sequelize.INTEGER,
  },
});

ClubsCl.hasMany(WorkingTimeClub);
/** CLUBS TABLES */

/**FISIO TABLES */
const FisioCl = db.define('fisioCl', {
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
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
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
  fisioSkillsArr: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  countyArr: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  comesHome: {
    type: Sequelize.BOOLEAN,
  },
  score: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  }
});

const FisioCategories = db.define('fisioCategories', {
  fisioSkillName: {
    type: Sequelize.STRING,
  },
});

const FisioCounty = db.define('fisioCounty', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saloonName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

FisioCl.hasMany(FisioCounty);
FisioCategories.hasMany(FisioCounty);
County.hasMany(FisioCounty);

const Certification = db.define('certification', {
  name: {
    type: Sequelize.STRING,
  },
  certUrl: {
    type: Sequelize.STRING,
  },
});

PersonCl.hasMany(Certification);
FisioCl.hasMany(Certification);

if (process.env.NODE_ENV === 'production') {
  db.sync({ force: true }).then(() => {
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
    });
    PersonCountyHelper.map(async item => {
      await PersonCounty.create(item);
    });
    ClubsHelperArr.map(async item => {
      await ClubsCl.create(item);
    });
    MembershipFeesArr.map(async item => {
      await MembershipFees.create(item);
    });
    WorkingTimesArr.map(async item => {
      await WorkingTimeClub.create(item);
    });
    ClubGalleryArr.map(async item => {
      await Gallery.create(item);
    });
    FisioArr.map(async item => {
      await FisioCl.create(item);
    });

    FisioCategoriesArr.map(async item => {
      await FisioCategories.create(item);
    });

    FisioCountyArr.map(async item => {
      await FisioCounty.create(item);
    });
  });
}

export default db;
