import path from 'node:path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync(path.join(__dirname), { extensions: ['graphql'] });
export const typeDefs = mergeTypeDefs(typesArray);
