import ormconfig from '@appormconfig';

const ormseedconfig = {
  ...ormconfig,
  migrations: ['src/seeds/*.ts'],
};
export default ormseedconfig;
