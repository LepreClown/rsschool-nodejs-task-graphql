import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from '../types/users.js';

import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/posts.js';
import { ProfileType } from '../types/profiles.js';
import {
  ChangePostInputType,
  ChangeProfileInputType,
  ChangeUserInputType,
  CreatePostInputType,
  CreateProfileInputType,
  CreateUserInputType,
} from '../types/inputs.js';
import { Context } from '../types/global.js';
import { CreatePostDto, PostDto, ProfileDto, UserDto } from './dto/dto.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInputType) },
      },
      resolve: async (_, { dto }: { dto: UserDto }, { prisma }: Context) =>
        prisma.user.create({ data: dto }),
    },
    createProfile: {
      type: ProfileType,
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInputType) },
      },
      resolve: async (_, { dto }: { dto: ProfileDto }, { prisma }) =>
        prisma.profile.create({ data: dto }),
    },
    createPost: {
      type: PostType,
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInputType) },
      },
      resolve: async (_, { dto }: { dto: CreatePostDto }, { prisma }) =>
        prisma.post.create({ data: dto }),
    },
    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInputType) },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: PostDto },
        { prisma },
      ) => prisma.post.update({ where: { id }, data: dto }),
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: ProfileDto },
        { prisma },
      ) => prisma.profile.update({ where: { id }, data: dto }),
    },
    changeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInputType) },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: UserDto },
        { prisma },
      ) => prisma.user.update({ where: { id }, data: dto }),
    },
    deleteUser: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, { prisma }) => {
        await prisma.user.delete({ where: { id } });
      },
    },
    deletePost: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, { prisma }) => {
        await prisma.post.delete({ where: { id } });
      },
    },
    deleteProfile: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, { prisma }) => {
        await prisma.profile.delete({ where: { id } });
      },
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _,
        { userId, authorId }: { userId: string; authorId: string },
        { prisma },
      ) => {
        await prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId: authorId,
          },
        });

        return 'Subscribed';
      },
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _,
        { userId, authorId }: { userId: string; authorId: string },
        { prisma },
      ) => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId: authorId,
            },
          },
        });

        return 'Unsubscribed';
      },
    },
  },
});
