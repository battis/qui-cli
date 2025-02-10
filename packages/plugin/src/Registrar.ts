import { Container } from './Container.js';

export interface Registrar {
  register(plugin: Container): void;
}
