// Schema for sample GraphQL server.

// ----------------------
// IMPORTS
// GraphQL schema library, for building our GraphQL schema
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import db from '../../db/db';
import {
  PersonCl,
  TrainingSkill,
  County,
  PersonCounty,
  Certification,
  // TrainingPersonSkill,
} from './PersonClForSchema';
import userControll from './userLoginFunctions';

async function getMessage() {
  return {
    text: `SREĆNA FIZIO I PERSON BAZA  FIT-NET @ ${new Date()}
    SVE NAIBOLJE`,
  };
}

const Message = new GraphQLObjectType({
  name: 'Message',
  description: 'GraphQL server message',
  fields() {
    return {
      text: {
        type: GraphQLString,
        resolve(msg) {
          return msg.text;
        },
      },
    };
  },
});

const FisioCategories = new GraphQLObjectType({
  name: 'FisioCategories',
  description: 'Fisio Categories',
  fields() {
    return {
      id: {
        type: GraphQLInt,
      },
      fisioSkillName: {
        type: GraphQLString,
      },
    };
  },
});

const FisioCounty = new GraphQLObjectType({
  name: 'FisioCounty',
  description: 'Counties nad prices for fisio',
  fields() {
    return {
      id: {
        type: GraphQLInt,
      },
      price: {
        type: GraphQLFloat,
      },
      address: {
        type: GraphQLString,
      },
      fisioCounty: {
        type: County,
        async resolve(fisioCounty) {
          return db.models.county.findOne({
            where: {
              id: fisioCounty.countyId,
            },
          });
        },
      },
    };
  },
});

const FisioCl = new GraphQLObjectType({
  name: 'FisioCl',
  description: 'Query for Fisos',
  fields() {
    return {
      id: {
        type: GraphQLInt,
      },
      password: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      facebookLink: {
        type: GraphQLString,
      },
      instagramLink: {
        type: GraphQLString,
      },
      imageUrl: {
        type: GraphQLString,
      },
      cellPhone: {
        type: GraphQLString,
      },
      about: {
        type: GraphQLString,
      },
      birthPlace: {
        type: GraphQLString,
      },
      birthDay: {
        type: GraphQLString,
      },
      hasCerificates: {
        type: GraphQLBoolean,
      },
      allCertificates: {
        type: new GraphQLList(Certification),
        resolve(fisioCl) {
          return db.models.certification.findAll({
            where: {
              fisioClId: fisioCl.id,
            },
          });
        },
      },
      fisioSkillsArr: {
        type: new GraphQLList(GraphQLInt),
      },
      comesHome: {
        type: GraphQLBoolean,
      },
      score: {
        type: GraphQLFloat,
      },
      countyArr: {
        type: new GraphQLList(GraphQLInt),
      },
      fisioCounties: {
        type: new GraphQLList(FisioCounty),
        async resolve(fisioCl) {
          return db.models.fisioCounty.findAll({
            where: {
              fisioClId: fisioCl.id,
            },
          });
        },
      },
      fisioSkillsNames: {
        type: new GraphQLList(FisioCategories),
        async resolve(fisioCl) {
          return db.models.fisioCategories.findAll({
            where: {
              id: {
                [db.Op.or]: fisioCl.fisioSkillsArr,
              },
            },
          });
        },
      },
    };
  },
});

const GalleryImgs = new GraphQLObjectType({
  name: 'GalleryImgs',
  description: 'Images for clubs',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(gallery) {
          return gallery.id;
        },
      },
      fileUrl: {
        type: GraphQLString,
        resolve(gallery) {
          return gallery.fileUrl;
        },
      },
    };
  },
});


const WorkingTimes = new GraphQLObjectType({
  name: 'WorkingTimes',
  description: 'Working time for clubs',
  fields() {
    return {
      id: {
        type: GraphQLInt,
      },
      workDayFrom: {
        type: GraphQLInt,
      },
      workDayTo: {
        type: GraphQLInt,
      },
      satFrom: {
        type: GraphQLInt,
      },
      satTo: {
        type: GraphQLInt,
      },
      sunFrom: {
        type: GraphQLInt,
      },
      sunTo: {
        type: GraphQLInt,
      },
    };
  },
});

const MemberShip = new GraphQLObjectType({
  name: 'MemberShip',
  description: 'Memberships for clubs',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(memberShip) {
          return memberShip.id;
        },
      },
      price: {
        type: GraphQLFloat,
        resolve(memberShip) {
          return memberShip.price;
        },
      },
      trainingSkill: {
        type: TrainingSkill,
        async resolve(memberShip) {
          return db.models.trainingSkill.findOne({
            where: {
              id: memberShip.trainingSkillId,
            },
          });
        },
      },
    };
  },
});

const ClubCl = new GraphQLObjectType({
  name: 'ClubCl',
  description: 'Query struct for clubs',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(clubs) {
          return clubs.id;
        },
      },
      password: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.password;
        },
      },
      name: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.name;
        },
      },
      address: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.address;
        },
      },
      email: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.email;
        },
      },
      phone: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.phone;
        },
      },
      webAddress: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.webAddress;
        },
      },
      facebookLink: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.facebookLink;
        },
      },
      instagramLink: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.instagramLink;
        },
      },
      profileImageUrl: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.profileImageUrl;
        },
      },
      score: {
        type: GraphQLFloat,
        resolve(clubs) {
          return clubs.score;
        },
      },
      about: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.about;
        },
      },
      skillsArr: {
        type: new GraphQLList(GraphQLInt),
        resolve(clubs) {
          return clubs.skillsArr;
        },
      },
      imgsArr: {
        type: new GraphQLList(GraphQLInt),
        resolve(clubs) {
          return clubs.imgsArr;
        },
      },
      galleryImages: {
        type: new GraphQLList(GalleryImgs),
        async resolve(clubs) {
          return db.models.gallery.findAll({
            where: {
              clubClId: clubs.id,
            },
          });
        },
      },
      clubCounty: {
        type: County,
        async resolve(clubs) {
          return db.models.county.findOne({
            where: {
              id: clubs.countyId,
            },
          });
        },
      },
      memberShipsFees: {
        type: new GraphQLList(MemberShip),
        async resolve(clubs) {
          return db.models.membershipFees.findAll({
            where: {
              clubClId: clubs.id,
            },
          });
        },
      },
      clubWorkingTime: {
        type: WorkingTimes,
        async resolve(clubs) {
          return db.models.workingTimeClub.findOne({
            where: {
              clubClId: clubs.id,
            },
          });
        },
      },
    };
  },
});

const UserCl = new GraphQLObjectType({
  name: 'UserCl',
  description: 'User Type',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(userCl) {
          return userCl.id;
        },
      },
      firstName: {
        type: GraphQLString,
        resolve(userCl) {
          return userCl.firstName;
        },
      },
      lastName: {
        type: GraphQLString,
        resolve(userCl) {
          return userCl.lastName;
        },
      },
      imageUrl: {
        type: GraphQLString,
        resolve(userCl) {
          return userCl.imageUrl;
        },
      },
      email: {
        type: GraphQLString,
        resolve(userCl) {
          return userCl.email;
        },
      },
      password: {
        type: GraphQLString,
        resolve(userCl) {
          return userCl.password;
        },
      },
      isCouch: {
        type: GraphQLInt,
        resolve(userCl) {
          return userCl.isCouch;
        },
      },
      isClub: {
        type: GraphQLInt,
        resolve(userCl) {
          return userCl.isClub;
        },
      },
      token: {
        type: GraphQLString,
        resolve(userCl) {
          return userCl.token;
        },
      },
    };
  },
});

const City = new GraphQLObjectType({
  name: 'City',
  description: 'City Type',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(city) {
          return city.id;
        },
      },
      cityName: {
        type: GraphQLString,
        resolve(city) {
          return city.cityName;
        },
      },
    };
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields() {
    return {
      message: {
        type: Message,
        resolve() {
          return getMessage();
        },
      },
      getCities: {
        type: new GraphQLList(City),
        async resolve() {
          const cities = await db.models.city.findAll();
          return cities;
        },
      },
      getCounties: {
        type: new GraphQLList(County),
        async resolve(root) {
          return db.models.county.findAll();
        },
      },
      userLogin: {
        type: UserCl,
        args: {
          email: {
            type: GraphQLString,
          },
          password: {
            type: GraphQLString,
          },
          fbToken: {
            type: GraphQLString,
          },
          gToken: {
            type: GraphQLString,
          },
        },
        resolve(parrentValue, args) {
          return userControll.userLogin(args);
        },
      },
      
      allCertificates: {
        type: new GraphQLList(Certification),
        async resolve() {
          const certificates = await db.models.certification.findAll();
          return certificates;
        },
      },
      oneFisioCl: {
        type: FisioCl,
        args: {
          fisioClId: {
            type: GraphQLInt,
          },
        },
        async resolve(root, { fisioClId }) {
          const fisio = await db.models.fisioCl.findOne({
            where: {
              id: fisioClId,
            },
          });
          if (fisio) {
            return fisio;
          }
          return {};
        },
      },
      onePresonCl: {
        type: PersonCl,
        args: {
          personClId: {
            type: GraphQLInt,
          },
        },
        async resolve(root, { personClId }) {
          const person = await db.models.personCl.findOne({
            where: {
              id: personClId,
            },
          });
          if (person) {
            return person;
          }
          return {};
        },
      },
      fisioCategories: {
        type: new GraphQLList(FisioCategories),
        async resolve() {
          return db.models.fisioCategories.findAll();
        },
      },
      counties: {
        type: new GraphQLList(County),
        async resolve() {
          return db.models.county.findAll();
        },
      },
      trainingCategories: {
        type: new GraphQLList(TrainingSkill),
        async resolve() {
          return db.models.trainingSkill.findAll();
        },
      },
      clubCl: {
        type: new GraphQLList(ClubCl),
        args: {
          skillIds: {
            type: new GraphQLList(GraphQLInt),
          },
          countyId: {
            type: GraphQLInt,
          },
        },
        async resolve(root, { skillIds, countyId }) {
          const findClub = await db.models.clubCl.findAll({
            where: {
              skillsArr: {
                $overlap: skillIds,
              },
              countyId,
            },
            order: [
              ['score', 'DESC'],
            ],
          });
          return findClub;
        },
      },
      clubClFindAll: {
        type: new GraphQLList(ClubCl),
        async resolve(root) {
          const findClub = await db.models.clubCl.findAll({
            limit: 10,
            order: [
              ['score', 'DESC'],
            ],
          });
          return findClub;
        },
      },
      personClFindAll: {
        type: new GraphQLList(PersonCl),
        async resolve(root) {
          const findPerson = await db.models.personCl.findAll({
            limit: 10,
            order: [
              ['score', 'DESC'],
            ],
          });
          return findPerson;
        },
      },
      fisoClFindAll: {
        type: new GraphQLList(FisioCl),
        async resolve(root) {
          const findFisio = await db.models.fisioCl.findAll({
            limit: 10,
            order: [
              ['score', 'DESC'],
            ],
          });
          return findFisio;
        },
      },
      fisoCl: {
        type: new GraphQLList(FisioCl),
        args: {
          skillIds: {
            type: new GraphQLList(GraphQLInt),
          },
          priceFrom: {
            type: GraphQLInt,
          },
          priceTo: {
            type: GraphQLInt,
          },
          countyId: {
            type: GraphQLInt,
          },
          comesHome: {
            type: GraphQLBoolean,
          },
          hasCerificates: {
            type: GraphQLBoolean,
          },
        },
        async resolve(root, {
          skillIds,
          priceFrom,
          priceTo,
          countyId,
          comesHome,
          hasCerificates,
        }) {
          const fisioQuery = await db.models.fisioCounty.findAll({
            where: {
              price: {
                [db.Op.gte]: priceFrom,
                [db.Op.lte]: priceTo,
              },
              countyId,
            },
          });
          const findedIds = fisioQuery.map(item => item.fisioClId);
          const findFisio = await db.models.fisioCl.findAll({
            where: {
              id: {
                [db.Op.or]: findedIds,
              },
              comesHome,
              hasCerificates,
              fisioSkillsArr: {
                $overlap: skillIds,
              },
            },
          });
          if (findFisio.length) {
            const addCounterfindFisio = findFisio.map(i => {
              i['counter'] = 0; // eslint-disable-line
              i.fisioSkillsArr.map(imp => {  // eslint-disable-line
                if (skillIds.includes(imp)) {
                  i['counter'] += 1; // eslint-disable-line
                }
              });
              return i;
            });
            return addCounterfindFisio.sort((a, b) => a.counter - b.counter).reverse();
          }
          return findFisio;
        },
      },
      getAllUsers: {
        type: new GraphQLList(UserCl),
        async resolve(root) {
          return db.models.userCl.findAll();
        },
      },
      personCl: {
        type: new GraphQLList(PersonCl),
        args: {
          skillIds: {
            type: new GraphQLList(GraphQLInt),
          },
          priceFrom: {
            type: GraphQLInt,
          },
          priceTo: {
            type: GraphQLInt,
          },
          countyId: {
            type: GraphQLInt,
          },
          groupTraining: {
            type: GraphQLBoolean,
          },
          certified: {
            type: GraphQLBoolean,
          },
          page: {
            type: GraphQLInt,
          },
          id: {
            type: GraphQLInt,
          },
        },
        async resolve(root, {
          id,
          skillIds,
          priceFrom,
          priceTo,
          countyId,
          groupTraining,
          certified,
        }) {
          if (typeof id === 'undefined') {
            // const offset = 3;
            // const pageLocal = page * offset;
            const b = await db.models.personCounty.findAll({
              where: {
                price: {
                  [db.Op.gte]: priceFrom,
                  [db.Op.lte]: priceTo,
                },
                countyId,
                groupTraining,
              },
            });
            const ids = b.map(item => item.personClId);
            const findPerson = await db.models.personCl.findAll({
              where: {
                id: {
                  [db.Op.or]: ids,
                },
                hasCerificates: certified,
                skillsArr: {
                  $overlap: skillIds,
                },
              },
            });
            const addCounterfindPersons = findPerson.map(i => {
              i['counter'] = 0; // eslint-disable-line
              i.skillsArr.map(imp => { // eslint-disable-line
                if (skillIds.includes(imp)) {
                  i['counter'] += 1; // eslint-disable-line
                }
              });
              return i;
            });
            return addCounterfindPersons.sort((ax, bx) => ax.counter - bx.counter)
              .reverse();
          }
          const findPerson = await db.models.personCl.findAll({
            where: {
              id,
            },
          });
          return findPerson;
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation for fitnet.com',
  fields() {
    return {
      updateUserCertificates: {
        type: PersonCl,
        args: {
          userId: {
            type: GraphQLInt,
          },
          hasCerificates: {
            type: GraphQLBoolean,
          },
        },
        async resolve(root, { hasCerificates, userId }) {
          const findUser = await db.models.personCl.update({ hasCerificates },
            {
              where: {
                id: userId,
              },
            });
          return findUser;
        },
      },
      updateFisioCertificates: {
        type: FisioCl,
        args: {
          fisioId: {
            type: GraphQLInt,
          },
          hasCerificates: {
            type: GraphQLBoolean,
          },
        },
        async resolve(root, { hasCerificates, fisioId }) {
          const findUser = await db.models.fisioCl.update({ hasCerificates },
            {
              where: {
                id: parseInt(fisioId),
              },
            });
          return findUser;
        },
      },
      updateOrCreateUser: {
        type: PersonCl,
        args: {
          email: {
            type: GraphQLString,
          },
          password: {
            type: GraphQLString,
          },
          firstName: {
            type: GraphQLString,
          },
          lastName: {
            type: GraphQLString,
          },
          facebookLink: {
            type: GraphQLString,
          },
          instagramLink: {
            type: GraphQLString,
          },
          cellPhone: {
            type: GraphQLString,
          },
          birthPlace: {
            type: GraphQLString,
          },
          birthDay: {
            type: GraphQLString,
          },
          hasCerificates: {
            type: GraphQLBoolean,
          },
          about: {
            type: GraphQLString,
          },
          imageUrl: {
            type: GraphQLString,
          },
          personClub: {
            type: GraphQLString,
          },
          skillsArr: {
            type: new GraphQLList(GraphQLInt),
          },
        },
        async resolve(root, { email, password, firstName, lastName, imageUrl, ...args }) {
          const findOrCreateUser = await db.models.personCl.findOne({
            where: {
              email,
            },
          });
          if (findOrCreateUser) {
            return { error: 'We have user with that email' };
          }
          const createPersonCl = await db.models.personCl.create({
            email,
            password,
            imageUrl,
            firstName,
            lastName,
            ...args,
          });
          if (createPersonCl) {
            await db.models.userCl.upsert({
              email,
              password,
              firstName,
              lastName,
              imageUrl,
              isCouch: 1,
            });
            return createPersonCl;
          }
          return { error: 'Database issue' };
        },
      },
      PersonCountyCreate: {
        type: PersonCounty,
        args: {
          price: {
            type: GraphQLInt,
          },
          groupTraining: {
            type: GraphQLBoolean,
          },
          address: {
            type: GraphQLString,
          },
          personClId: {
            type: GraphQLInt,
          },
          countyId: {
            type: GraphQLInt,
          },
        },
        async resolve(root, args) {
          const createCounty = await db.models.personCounty.create({
            ...args,
          });
          if (createCounty) {
            return createCounty;
          }
          return { error: 'Database issue, check createCounty' };
        },
      },
      certificateCreate: {
        type: Certification,
        args: {
          name: {
            type: GraphQLString,
          },
          certUrl: {
            type: GraphQLString,
          },
          personClId: {
            type: GraphQLInt,
          },
          fisioClId: {
            type: GraphQLInt,
          },
        },
        async resolve(root, { name, certUrl, personClId, fisioClId }) {
          const createCertificate = await db.models.certification.create({
            name,
            certUrl,
            personClId,
            fisioClId,
          });
          if (createCertificate) {
            return createCertificate;
          }
          return { error: 'Database issue, check createCertificate' };
        },
      },
      updateOrCreateClub: {
        type: ClubCl,
        args: {
          name: {
            type: GraphQLString,
          },
          password: {
            type: GraphQLString,
          },
          address: {
            type: GraphQLString,
          },
          email: {
            type: GraphQLString,
          },
          phone: {
            type: GraphQLString,
          },
          webAddress: {
            type: GraphQLString,
          },
          facebookLink: {
            type: GraphQLString,
          },
          instagramLink: {
            type: GraphQLString,
          },
          profileImageUrl: {
            type: GraphQLString,
          },
          score: {
            type: GraphQLFloat,
          },
          about: {
            type: GraphQLString,
          },
          skillsArr: {
            type: new GraphQLList(GraphQLInt),
          },
          imgsArr: {
            type: new GraphQLList(GraphQLInt),
          },
          countyId: {
            type: GraphQLInt,
          },
        },
        async resolve(root, { email, ...args }) {
          const findOrCreateClub = await db.models.clubCl.findOne({
            where: {
              email,
            },
          });
          if (findOrCreateClub) {
            return { error: 'We have club with that email' };
          }
          const createClubCl = await db.models.clubCl.create({
            email,
            ...args,
          });
          if (createClubCl) {
            return createClubCl;
          }
          return { error: 'Database issue' };
        },
      },
      createMembershipFees: {
        type: MemberShip,
        args: {
          price: {
            type: GraphQLFloat,
          },
          clubClId: {
            type: GraphQLInt,
          },
          trainingSkillId: {
            type: GraphQLInt,
          },
        },
        async resolve(root, { price, clubClId, trainingSkillId }) {
          return db.models.membershipFees.create({
            price,
            clubClId,
            trainingSkillId,
          });
        },
      },
      createWorkingTimeClub: {
        type: WorkingTimes,
        args: {
          workDayFrom: {
            type: GraphQLInt,
          },
          workDayTo: {
            type: GraphQLInt,
          },
          satFrom: {
            type: GraphQLInt,
          },
          satTo: {
            type: GraphQLInt,
          },
          sunFrom: {
            type: GraphQLInt,
          },
          sunTo: {
            type: GraphQLInt,
          },
          clubClId: {
            type: GraphQLInt,
          },
        },
        async resolve(root, args) {
          return db.models.workingTimeClub.create(args);
        },
      },
      addImageInGalleryClub: {
        type: GalleryImgs,
        args: {
          fileUrl: {
            type: GraphQLString,
          },
          clubClId: {
            type: GraphQLString,
          },
        },
        async resolve(root, args) {
          return db.models.gallery.create(args);
        },
      },
      updateOrCreateFisio: {
        type: FisioCl,
        args: {
          password: {
            type: GraphQLString,
          },
          email: {
            type: GraphQLString,
          },
          firstName: {
            type: GraphQLString,
          },
          lastName: {
            type: GraphQLString,
          },
          facebookLink: {
            type: GraphQLString,
          },
          instagramLink: {
            type: GraphQLString,
          },
          imageUrl: {
            type: GraphQLString,
          },
          cellPhone: {
            type: GraphQLString,
          },
          about: {
            type: GraphQLString,
          },
          birthPlace: {
            type: GraphQLString,
          },
          birthDay: {
            type: GraphQLString,
          },
          hasCerificates: {
            type: GraphQLBoolean,
          },
          confirmed: {
            type: GraphQLBoolean,
          },
          fisioSkillsArr: {
            type: new GraphQLList(GraphQLInt),
          },
          countyArr: {
            type: new GraphQLList(GraphQLInt),
          },
          comesHome: {
            type: GraphQLBoolean,
          },
          score: {
            type: GraphQLFloat,
          },
        },
        async resolve(root, { email, password, firstName, lastName, imageUrl, ...args }) {
          let letsFindFisio = await db.models.fisioCl.findAll({
            where: {
              email,
            },
          });
          if (letsFindFisio.length) {
            return { error: 'We alredy have that fisio in DATABASE' };
          }
          await db.models.userCl.upsert({
            email,
            password,
            firstName,
            lastName,
            imageUrl,
            isFisio: 1,
          });
          let letsCreate = await db.models.fisioCl.create({
            email,
            password,
            firstName,
            lastName,
            imageUrl,
            ...args,
          });
          return letsCreate;
        },
      },
            createFisioCounty: {
                type: FisioCounty,
                args: {
                    price: {
                        type: GraphQLFloat,
                    },
                    address: {
                        type: GraphQLString,
                    },
                    fisioClId: {
                        type: GraphQLInt,
                    },
                    countyId: {
                        type: GraphQLInt,
                    },
                },
                async resolve(root, args) {
                    return await db.models.fisioCounty.create(args);
                },
            },
        };
    },
});

export default new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
