
import React from 'react';

// Routing via React Router
import {
  Route,
  Switch,
} from 'react-router-dom';

// <Helmet> component for setting the page title/meta tags
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
import ChooseProfileMake from '../ChooseProfileMake';
import FisioOne from '../FisioOne';
import Proba from '../proba';
import RegisterPerson from '../Forms/RegisterPerson';
import UploadCertificates from '../Forms/UploadCertificates';
import UploadCertificatesPerson from '../Forms/UploadCertificatesPerson';
import RegisterFisio from '../Forms/RegisterFisio';
import RegisterMoreSkillsFisio from '../Forms/RegisterMoreSkillsFisio';
import css from '../styles/styles.scss';
import RegisterMoreSkillsContainer from '../Forms/RegisterMoreSkillsContainer';


export default () => (
  <div className={css.mainWrapper}>
    <MuiThemeProvider>
      <Helmet>
        <title>Fit Net</title>
        <meta name="description" content="Fit-Net Sport kakav zaista jeste!" />
        {/* <base href="http://localhost:8081/" /> */}
      </Helmet>
      <Header />
      {/* <GraphQLMessage /> */}
      <Switch>
        <Route exact path="/" component={Coaches} />
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
        <Route path="/moreSkills/:id" component={RegisterMoreSkillsContainer} />
        <Route path="/moreSkillsFisio/:id" component={RegisterMoreSkillsFisio} />
        <Route path="/profile-choose" component={ChooseProfileMake} />
        <Redirect from="/old/path" to="/new/path" />
        <Route component={WhenNotFound} />
      </Switch>
    </MuiThemeProvider>
  </div>
);
