import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
describe("App Testing", () => it("should compile at runtime", () => expect(App).toBeDefined()));