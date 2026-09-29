import * as migration_20260929_192952_initial from './20260929_192952_initial';

export const migrations = [
  {
    up: migration_20260929_192952_initial.up,
    down: migration_20260929_192952_initial.down,
    name: '20260929_192952_initial'
  },
];
