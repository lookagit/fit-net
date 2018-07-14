
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
import EditUser from '../Routes/EditUser';
import EditFisio from '../Routes/EditFisio';
import UploadCertificates from '../Forms/UploadCertificates';
import UploadCertificatesPerson from '../Forms/UploadCertificatesPerson';
import RegisterFisio from '../Forms/RegisterFisio';
import RegisterClub from '../Forms/RegisterClub';
import RegisterMoreSkillsFisio from '../Forms/RegisterMoreSkillsFisio';
import UserLogedIn from '../Routes/UserLogedIn';
import css from '../styles/styles.scss';
import RegisterMoreSkillsContainer from '../Forms/RegisterMoreSkillsContainer';
import EditUserCertificates from '../Routes/EditUserCertificates';
import EditFisioCertificates from '../Routes/EditFisioCertificates';
import EditUserPriceAndLocation from '../Routes/EditUserPriceAndLocation';
import EditFisioPriceAndLocation from '../Routes/EditFisioPriceAndLocation';
import WorkTimeClubs from '../Routes/WorkTimeClubs';
import HomePage from '../Routes/HomePage';

export default () => (
  <div className={css.mainWrapper}>
    <MuiThemeProvider>
      <Helmet>
        <title>Fit Net</title>
        <meta name="description" content="Fit-Net Sport kakav zaista jeste!" />
        {/* <base href="http://localhost:8081/" /> */}
      </Helmet>
      <Header />
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
        <Route path="/register-fisio" component={RegisterFisio} />
        <Route path="/register-club" component={RegisterClub} />
        <Route path="/moreSkills/:id" component={RegisterMoreSkillsContainer} />
        <Route path="/moreSkillsFisio/:id" component={RegisterMoreSkillsFisio} />
        <Route path="/profile-choose" component={ChooseProfileMake} />
        <Route path="/user-loged-in/:userId" component={UserLogedIn} />
        <Route path="/edit-user" component={EditUser} />
        <Route path="/edit-fisio" component={EditFisio} />
        <Route path="/edit-user-certificates" component={EditUserCertificates} />
        <Route path="/edit-fisio-certificates" component={EditFisioCertificates} />
        <Route path="/edit-user-price-location" component={EditUserPriceAndLocation} />
        <Route path="/edit-fisio-price-location" component={EditFisioPriceAndLocation} />
        <Route path="/work-times-club/:clubId" component={WorkTimeClubs} />
        <Redirect from="/old/path" to="/new/path" />
        <Route component={WhenNotFound} />
      </Switch>
    </MuiThemeProvider>
  </div>
);
