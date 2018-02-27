// Main React component, that we'll import in `src/app.js`
//
// Note a few points from this file:
//
// 1.  We're using the format `main/index.js` for this file, which means we
// can simply import 'src/components/main', which will auto-default to index.js.
// This is a useful pattern when you have styles/images to pull from, and you
// want to keep the component tree organised.
//
// 2.  We import SASS and a logo SVG file directly.  Classnames will be hashed
// automatically, and images will be compressed/optimised in production.  File
// names that are made available in the import variable will be identical on
// both the server and browser.
//
// 3.  We're introducing React Router in this component.  In RR v4, routes are
// not defined globally-- they're defined declaratively on components, so we
// can respond to route changes anywhere.
//
// 4.  We're using `react-helmet`, which allows us to set <head> data like
// a <title> or <meta> tags, which are filtered up to the main <Html> component
// before HTML rendering.

// ----------------------
// IMPORTS

/* NPM */

// React
import React from 'react';

// Routing via React Router
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';

// <Helmet> component for setting the page title/meta tags
import Helmet from 'react-helmet';

/* ReactQL */

// NotFound 404 handler for unknown routes, and the app-wide `history` object
// we can use to make route changes from anywhere
import { Redirect, history } from 'kit/lib/routing';

/* App */

// Child React components. Note:  We can either export one main React component
// per file, or in the case of <Home>, <Page> and <WhenFound>, we can group
// multiple components per file where it makes sense to do so
import GraphQLMessage from 'components/graphql';
import { Home, Page, WhenNotFound } from 'components/routes';
import ReduxCounter from 'components/redux';
import Stats from 'components/stats';
import Styles from 'components/styles';
import Header from '../header';
import Coaches from '../coaches';
import Fizio from '../fizio';
import Clubs from '../clubs';
import FilteredCoaches from '../filteredCoaches';
import FilteredClubs from '../filteredClubs';
import FilteredFizio from '../filteredFizio';
import CoachesOne from '../CoachesOne';
import Proba from '../proba';
import RegisterPerson from '../Forms/RegisterPerson';
// Styles
import css from '../styles/styles.scss';

// Get the ReactQL logo.  This is a local .svg file, which will be made
// available as a string relative to [root]/dist/assets/img/
import logo from './reactql-logo.svg';

// ----------------------

// Example function to show that the `history` object can be changed from
// anywhere, simply by importing it-- use this in Redux actions, functions,
// React `onClick` events, etc.
function changeRoute() {
  history.push('/page/about');
}

export default () => (
  <div className={css.mainWrapper}>
    <Helmet>
      <title>ReactQL application</title>
      <meta name="description" content="ReactQL starter kit app" />
      {/* <base href="http://localhost:8081/" /> */}
    </Helmet>
    <Header />
    {/* <GraphQLMessage /> */}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/page/coaches" component={Coaches} />
      <Route path="/page/fizio" component={Fizio} />
      <Route path="/page/clubs" component={Clubs} />
      <Route path="/listofcoaches" component={FilteredCoaches} />
      <Route path="/listOfClubs" component={FilteredClubs} />
      <Route path="/listOfFizio" component={FilteredFizio} />
      <Route path="/coaches-one/:id" component={CoachesOne} />
      <Route path="/proba" component={Proba} />
      <Route path="/register" component={RegisterPerson} />
      <Redirect from="/old/path" to="/new/path" />
      <Route component={WhenNotFound} />
    </Switch>
  </div>
);
