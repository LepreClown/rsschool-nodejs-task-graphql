import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId } from '../types/members-types.js';
import { ProfileType } from '../types/profiles.js';
import { PostType } from '../types/posts.js';
import { UserType } from '../types/users.js';
import { Context } from '../types/global.js';
import { UUIDType } from '../types/uuid.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_, { id }: { id: string }, { prisma }: Context) =>
        prisma.user.findUnique({ where: { id } }),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: (_, __, { prisma }) => prisma.user.findMany(),
    },
    profile: {
      type: ProfileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_, { id }: { id: string }, { prisma }: Context) =>
        prisma.profile.findUnique({ where: { id } }),
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(ProfileType)),
      resolve: (_, __, { prisma }: Context) => prisma.profile.findMany(),
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_, { id }: { id: string }, { prisma }: Context) =>
        prisma.post.findUnique({ where: { id } }),
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: (_, __, { prisma }: Context) => prisma.post.findMany(),
    },
    memberType: {
      type: MemberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
      resolve: (_, { id }: { id: string }, { prisma }: Context) =>
        prisma.memberType.findUnique({ where: { id } }),
    },
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: (_, __, { prisma }: Context) => prisma.memberType.findMany(),
    },
  },
});
