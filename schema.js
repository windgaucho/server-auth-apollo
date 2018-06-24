import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import authSchena from './graphql/auth/schema';
import authResolvers from './graphql/auth/resolvers';
import commonSchema from './graphql/common/schema';
import commonResolvers from './graphql/common/resolvers';

const rootSchema = [`
type Query {
  user: User
}

type Mutation {
  registrar(userId: String!, password: String!, apellido: String!, nombre: String!): User
  login(userId: String!, password: String!): User
  logout: User
}

schema {
  query: Query,
  mutation: Mutation
}
`];

const schema = [...rootSchema, ...authSchena, ...commonSchema];
const resolvers = merge(authResolvers, commonResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
