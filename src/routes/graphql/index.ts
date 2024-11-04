import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox';
import {createGqlResponseSchema, gqlResponseSchema} from './schemas.js';
import {DocumentNode, graphql, GraphQLSchema, parse, validate} from 'graphql';
import {Query} from "./query/query.js";
import {Mutation} from "./mutations/mutation.js";
import {ERRORS} from "./types/global.js";
import depthLimit from 'graphql-depth-limit';

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});


const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const {prisma} = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const {query, variables} = req.body

      const document: DocumentNode = parse(query);
      const isValidBody = validate(schema, document, [depthLimit(5)]);

      if (isValidBody.length > 0) {
        return {errors: isValidBody.map((err) => ({message: err.message}))};
      }

      try {
        const result = await graphql({
          schema,
          source: query,
          contextValue: {prisma},
          variableValues: variables,
        });
        return {data: result.data, errors: result.errors || null};
      } catch (error) {
        fastify.log.error(error);
        return {errors: [{message: ERRORS.SERVER_ERROR_500}]};
      }
    },
  });
};

export default plugin;
