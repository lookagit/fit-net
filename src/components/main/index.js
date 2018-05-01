
import React from 'react';

// Routing via React Router
import {
  Route,
  Switch,
} from 'react-router-dom';

// <Helmet> component for setting the page title/meta tags
import Helmet from 'react-helmet';

/* ReactQL */

// NotFound 404 handler for unknown routes, and the app-wide `history` object
// we can use to make route changes from anywhere
import { Redirect } from 'kit/lib/routing';

import { Home, WhenNotFound } from 'components/routes';

import Header from '../header';
import Coaches from '../coaches';
import Fizio from '../fizio';
import Clubs from '../clubs';
import FilteredCoaches from '../filteredCoaches';
import FilteredClubs from '../filteredClubs';
import FilteredFizio from '../filteredFizio';
import CoachesOne from '../CoachesOne';
import FisioOne from '../FisioOne';
import Proba from '../proba';
import RegisterPerson from '../Forms/RegisterPerson';
import UploadCertificates from '../Forms/UploadCertificates';
import UploadCertificatesPerson from '../Forms/UploadCertificatesPerson';
import RegisterFisio from '../Forms/RegisterFisio';
import RegisterMoreSkillsPerson from '../Forms/RegisterMoreSkillsPerson';
import RegisterMoreSkillsFisio from '../Forms/RegisterMoreSkillsFisio';
// Styles
import css from '../styles/styles.scss';

export default () => (
  <div className={css.mainWrapper}>
    <Helmet>
      <title>Fit Net</title>
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
      <Route path="/fisio-one/:id" component={FisioOne} />
      <Route path="/proba" component={Proba} />
      <Route path="/register" component={RegisterPerson} />
      <Route path="/register-certificate/:userId" component={UploadCertificates} />
      <Route path="/register-certificate-person/:userId" component={UploadCertificatesPerson} />
      <Route path="/registerFisio" component={RegisterFisio} />
      <Route path="/moreSkills/:id" component={RegisterMoreSkillsPerson} />
      <Route path="/moreSkillsFisio/:id" component={RegisterMoreSkillsFisio} />
      <Redirect from="/old/path" to="/new/path" />
      <Route component={WhenNotFound} />
    </Switch>
  </div>
);
