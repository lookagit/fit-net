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

export const PersonCl = new GraphQLObjectType({
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

export const TrainingSkill = new GraphQLObjectType({
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

export const County = new GraphQLObjectType({
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

export const PersonCounty = new GraphQLObjectType({
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

export const Certification = new GraphQLObjectType({
  name: 'Certificates',
  description: 'Person and Fisio certificates for sport',
  fields() {
    return {
      id: {
        type: GraphQLString,
        resolve(cert) {
          return cert.id;
        },
      },
      name: {
        type: GraphQLString,
        resolve(cert) {
          return cert.name
        },
      },
      certUrl: {
        type: GraphQLString,
        resolve(cert) {
          return cert.certUrl;
        },
      },
    }
  }
})

export const TrainingPersonSkill = new GraphQLObjectType({
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
