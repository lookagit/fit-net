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
    GraphQLNonNull,
    GraphQLBoolean,
} from 'graphql';
import db from '../../db/db';
import { 
  PersonCl, 
  TrainingSkill, 
  County, 
  PersonCounty, 
  Certification, 
  TrainingPersonSkill 
} from './PersonClForSchema';

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
        }
      },
      address: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.address;
        }
      },
      email: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.email;
        }
      },
      phone: {
        type: GraphQLString,
        resolve(clubs) {
          return clubs.phone;
        }
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
          return clubs.instagramLink
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
          return await db.models.gallery.findAll({
            where: {
              clubClId: clubs.id,
            },
          });
        },
      },
      clubCounty: {
        type: County,
        async resolve(clubs) {
          return await db.models.county.findOne({
            where: {
              id: clubs.countyId,
            },
          });
        },
      },
      memberShipsFees: {
          type: new GraphQLList(MemberShip),
          async resolve(clubs) {
            return await db.models.membershipFees.findAll({
              where: {
                clubClId: clubs.id,
              },
            });
          },
        },
      clubWorkingTime: {
        type: WorkingTimes,
        async resolve(clubs) {
          return await db.models.workingTimeClub.findOne({
            where: {
              clubClId: clubs.id,
            },
          });
        },
      },
    };
  }
})

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
})

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
          return await db.models.trainingSkill.findOne({
            where: {
              id: memberShip.trainingSkillId,
            },
          });
        },
      },
    }
  }
})

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
    }
  }
})

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
      counties: {
        type: new GraphQLList(County),
        async resolve(root) {
          return await db.models.county.findAll();
        },
      },
      trainingCategories: {
        type: new GraphQLList(TrainingSkill),
        async resolve(root) {
          return await db.models.trainingSkill.findAll();
        }
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
        async resolve(root, {skillIds, countyId}) {
          let findClub = await db.models.clubCl.findAll({
            where: {
              skillsArr: {
                $overlap: skillIds
              },
              countyId,
            },
            order: [
              ['score', 'DESC'],
            ]
          });
          return findClub;
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
          }
        },
        async resolve(root, {id, skillIds, priceFrom, priceTo, countyId, groupTraining, certified, page}) {
          if(typeof id == 'undefined') {
            const offset = 3;
            let pageLocal = page * offset;
            let b = await db.models.personCounty.findAll({
              where: {
                price: {
                  [db.Op.gte]: priceFrom,
                  [db.Op.lte]: priceTo,
                },
                countyId,
                groupTraining,
              }
            });
            let ids = b.map(item => item.personClId);
            let findPerson = await db.models.personCl.findAll({
              where: {
                id: {
                  [db.Op.or]: ids,
                },
                hasCerificates: certified,
                skillsArr: {
                  $overlap: skillIds
                }
              },
            });
            let addCounterfindPersons = findPerson.map(i => {
              i['counter'] = 0;
              i.skillsArr.map(imp => {
                if(skillIds.includes(imp)) {
                  i['counter'] += 1;
                }
              })
              return i
            })
            return addCounterfindPersons.sort((a,b) => a.counter - b.counter)
            .reverse();
          } else {
            let findPerson = await db.models.personCl.findAll({
              where: {
                id,
              },
            });
            return findPerson;
          }
        }
      }
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation for fitnet.com',
  fields() {
    return {
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
            type: GraphQLString
          },
          imageUrl: {
            type: GraphQLString,
          },
          skillsArr: {
            type: new GraphQLList(GraphQLInt),
          },
        },
        async resolve(root, {email, ...args}){
          let findOrCreateUser = await db.models.personCl.findOne({
            where: {
              email,
            }
          });
          if(findOrCreateUser) {
            return {error: "We have user with that email"};
          } else {
            let createPersonCl = await db.models.personCl.create({
              email,
              ...args,
            });
            if(createPersonCl) {
              return createPersonCl;
            } else {
              return {error: "Database issue"};
            }
          }
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
          let createCounty = await db.models.personCounty.create({
            ...args,
          });
          if(createCounty) {
            return createCounty;
          } else {
            return { error: "Database issue, check createCounty" };
          }
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
        },
        async resolve(root, {name, certUrl, personClId}) {
          let createCertificate = await db.models.certification.create({
            name,
            certUrl,
            personClId,
          });
          if(createCertificate) {
            return createCertificate;
          } else {
            return {error: "Database issue, check createCertificate"};
          }
        }
      },  
    }
  }
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
