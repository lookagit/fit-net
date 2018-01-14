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
console.log("EVO I MENE ", db);
// ----------------------
// GraphQL can handle Promises from its `resolve()` calls, so we'll create a
// simple async function that returns a simple message.  In practice, `resolve()`
// will generally pull from a 'real' data source such as a database
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
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.lastName;
        }
      },
      facebookLink: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.facebookLink;
        }
      },
      instagramLink: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.instagramLink;
        }
      },
      cellPhone: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.cellPhone;
        }
      },
      about: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.about;
        }
      },
      birthPlace: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.birthPlace;
        }
      },
      hasCerificates: {
        type: GraphQLBoolean,
        resolve(personCl) {
          return personCl.hasCerificates;
        }
      },
      confirmed: {
        type: GraphQLBoolean,
        resolve(personCl) {
          return personCl.confirmed;
        }
      },
      imageUrl: {
        type: GraphQLString,
        resolve(personCl) {
          return personCl.imageUrl;
        }
      },
      skillsArr: {
        type: new GraphQLList(GraphQLInt),
        resolve(personCl) {
          return personCl.skillsArr;
        }
      },
      counter: {
        type: GraphQLInt,
        resolve(personCl) {
          return personCl.counter;
        }
      },
      trainingPersonSkills: {
        type: new GraphQLList(TrainingPersonSkill),
        async resolve(personCl) {
          return await db.models.trainingSkill.findAll({
            where: {
              id: {
                [db.Op.or]: personCl.skillsArr,
              }
            }
          })
        }
      }
    };
  },
});

const TrainingSkill = new GraphQLObjectType({
  name: 'TrainingSkill',
  description: 'Training Skill List',
  fields() {
    return {
      trainSkillName: {
        type: GraphQLString,
        resolve(trainingSkill) {
          return trainingSkill.trainSkillName;
        }
      }
    }
  },
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
// Message type.  Imagine this like static type hinting on the 'message'
// object we're going to throw back to the user
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

// Root query.  This is our 'public API'.
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
          page: {
            type: GraphQLInt,
          },
          id: {
            type: GraphQLInt,
          }
        },
        async resolve(root, {id, skillIds, page}) {
          if(typeof id == 'undefined') {
            const offset = 3;
            let pageLocal = page * offset;
            let findPerson = await db.models.personCl.findAll({
              where: {
                skillsArr: { $overlap: skillIds}
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

export default new GraphQLSchema({
  query: Query,
});
