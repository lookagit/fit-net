// Demonstrates several components on one page, each with their own `export`.
//
// These are smaller components that <Main> imports, and changes depending
// on the page route (via React Router).
//
// <WhenNotFound> demonstrates the use of <NotFound>, a ReactQL helper
// component that signals to our web server that we have a 404 error, to handle
// accordingly

// ----------------------
// IMPORTS

/* NPM */

// React
import React from 'react';

/* ReactQL */

// NotFound 404 handler for unknown routes
import { NotFound } from 'kit/lib/routing';
import Uppy from './Uppy';
// ----------------------

// We'll display this <Home> component when we're on the / route
export const Home = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
    <h1 style={{ fontSize: '70px' }}>FITNET KIDA...</h1>
  </div>
);
export const Proba = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
    jebena proba
  </div>
);
// Helper component that will be conditionally shown when the route matches.
// This gives you an idea how React Router v4 works -- we have a `match`
// prop that gives us information on the route we can use within the component
export const Page = ({ match }) => (
  <h1>DOBRODOSLI NA {match.params.name}</h1>
);

// Create a route that will be displayed when the code isn't found
export const WhenNotFound = () => (
  <NotFound>
    <h1>Unknown route - the 404 handler was triggered!</h1>
  </NotFound>
);
