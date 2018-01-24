// Schema for sample GraphQL server.

// ----------------------
// IMPORTS
// GraphQL schema library, for building our GraphQL schema
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
} from 'graphql';
import db from '../../db/db';

async function getMessage() {
  return {
    text: `SREĆAN POČETAK FIT-NET @ ${new Date()}
    SVE NAIBOLJE`,
  };
}


const PersonCl = new GraphQLObjectType({
  name: 'PersonCl',
  description: 'Client coach or physio',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(personCl) {
          return personCl.id;
        },
      },
      email: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.email;
        },
      },
      firstName: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.firstName;
        },
      },
      lastName: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.lastName;
        },
      },
      facebookLink: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.facebookLink;
        },
      },
      instagramLink: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.instagramLink;
        },
      },
      cellPhone: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.cellPhone;
        },
      },
      about: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.about;
        },
      },
      birthPlace: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.birthPlace;
        },
      },
      hasCerificates: {
        type: GraphQLBoolean,
        resolve(personCl) {
          return personCl.hasCerificates;
        },
      },
      confirmed: {
        type: GraphQLBoolean,
        resolve(personCl) {
          return personCl.confirmed;
        },
      },
      imageUrl: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.imageUrl;
        },
      },
      skillsArr: {
        type: new GraphQLList(GraphQLInt),
        resolve(personCl) {
          return personCl.skillsArr;
        },
      },
      counter: {
        type: GraphQLInt,
        resolve(personCl) {
          return personCl.counter;
        },
      },
      trainingPersonSkills: {
        type: new GraphQLList(TrainingPersonSkill),
        async resolve(personCl) {
          return await db.models.trainingSkill.findAll({
            where: {
              id: {
                [db.Op.or]: personCl.skillsArr,
              },
            },
          });
        },
      },
      personCounties: {
        type: new GraphQLList(PersonCounty),
        async resolve(personCl) {
          return await db.models.personCounty.findAll({
            where: {
              personClId: personCl.id,
            },
          });
        },
      },
    };
  },
});

const TrainingSkill = new GraphQLObjectType({
  name: 'TrainingSkill',
  description: 'Training Skill List',
  fields() {
    return {
      id: {
        type: GraphQLString,
        resolve(trainingSkill) {
          return trainingSkill.id;
        }
      },
      trainSkillName: {
        type: GraphQLString,
        resolve(trainingSkill) {
          return trainingSkill.trainSkillName;
        },
      },
    };
  },
})

const County = new GraphQLObjectType({
  name: 'County',
  description: 'County names',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(county) {
          return county.id;
        },
      },
      countyName: {
        type: GraphQLString,
        resolve(county) {
          return county.countyName;
        },
      },
    }
  },
})

const PersonCounty = new GraphQLObjectType({
  name: 'PersonCounty',
  description: 'All counties and prices for person training',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(personCounty) {
          return personCounty.id;
        },
      },
      price: {
        type: GraphQLInt,
        resolve(personCounty) {
          return personCounty.price;
        },
      },
      groupTraining: {
        type: GraphQLBoolean,
        resolve(personCounty) {
          return personCounty.groupTraining;
        },
      },
      address: {
        type: GraphQLString,
        resolve(personCounty) {
          return personCounty.address;
        },
      },
      county: {
        type: County,
        async resolve(personCounty) {
          return await db.models.county.findOne({
            where: {
              id: personCounty.countyId,
            },
          });
        },
      },
    }
  }
})

const Certification = new GraphQLObjectType({
  name: 'PersonCertificates',
  description: 'Person certificates for sport',
  fields() {
    return {
      id: {
        type: GraphQLString,
        resolve(personCert) {
          return personCert.id;
        },
      },
      name: {
        type: GraphQLString,
        resolve(personCert) {
          return personCert.name
        },
      },
      certUrl: {
        type: GraphQLString,
        resolve(personCert) {
          return personCert.certUrl;
        },
      },
    }
  }
})

const TrainingPersonSkill = new GraphQLObjectType({
  name: 'TrainingPersonSkill',
  description: 'Training Skill for search',
  fields() {
    return {
      trainSkillName: {
        type: GraphQLString,
        resolve(trainingPersonSkill) {
          return trainingPersonSkill.trainSkillName;
        }
      }
    }
  },
})

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
      trainingCategories: {
        type: new GraphQLList(TrainingSkill),
        async resolve(root) {
          return await db.models.trainingSkill.findAll();
        }
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
                  [db.Op.gte]: 1000,
                  [db.Op.lte]: 7000,
                },
                countyId: 1,
                groupTraining: false,
              }
            });
            let ids = b.map(item => {
              return item.personClId;
            })
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
              order: [
                ['skillsArr', 'DESC'],
              ]
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

            let findSort = addCounterfindPersons.sort((a,b) => {
              return a.counter - b.counter;
            }).reverse().slice(pageLocal , offset)
            return findSort;
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
