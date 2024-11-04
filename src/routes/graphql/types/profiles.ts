import {GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLBoolean, GraphQLString} from 'graphql';
import {UUIDType} from './uuid.js';
import {MemberType} from './members-types.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: {type: new GraphQLNonNull(UUIDType)},
    userId: {type: new GraphQLNonNull(UUIDType)},
    isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
    yearOfBirth: {type: new GraphQLNonNull(GraphQLInt)},
    memberTypeId: {type: new GraphQLNonNull(GraphQLString)},
    memberType: {type: new GraphQLNonNull(MemberType)},
  },
});