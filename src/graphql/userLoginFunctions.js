import jwt from 'jsonwebtoken';
import socialApi from './socialApi';
import db from '../../db/db';

async function userLogin(args) {
  if (args.fbToken) {
    const fbId = await socialApi.checkSocialToken('facebook', args.fbToken);
    console.log('FBIIDDD ', fbId);
    if (fbId.success) {
      const fbInfo = await socialApi.fbGetInfo(fbId.id, args.fbToken);
      console.log('JA SAM FB INFO ', fbInfo);
      const user = await db.models.userCl.findOne({ where: { email: fbInfo.email } });
      if (user) {
        const payload = {
          id: user.id,
          name: user.firstName,
          email: user.email,
          userType: user.userTypeId,
          channel: user.channel,
        };
        const token = jwt.sign(payload, 'nasasifra');
        user.token = token;
        return user;
      }
      const userId = await db.models.userCl.findOne({ where: { facebook_id: fbId.id } });
      if (userId) {
        const payload = {
          id: userId.id,
          name: userId.firstName,
          email: userId.email,
          userType: user.userTypeId,
          channel: user.channel,
        };
        const token = jwt.sign(payload, 'nasasifra');
        userId.token = token;
        return userId;
      }
      const profileImage = await socialApi.fbGetProfileImage(fbId.id);
      const personProfile = await db.models.userCl.create({ profileImageUrl: profileImage.data.url });
      if (personProfile) {
        const payload = {
          id: personProfile.id,
          name: personProfile.firstName,
          email: personProfile.email,
        };
        const token = jwt.sign(payload, 'nasasifra');
        personProfile.token = token;
        return personProfile;
      }
    } else {
      return { error: fbId.id };
    }
  } else if (args.gToken) {
    const gId = await socialApi.checkSocialToken('google', args.gToken);
    if (gId.success) {
      const gInfo = await socialApi.googleGetInfo(args.gToken);
      const user = await db.models.person.findOne({ where: { email: gInfo.email } })
      if (user) {
        const payload = {
          id: user.id,
          name: user.firstName,
          email: user.email,
        };
        const token = jwt.sign(payload, 'nasasifra');
        user.token = token;
        return user;
      }
      const personProfile = await db.models.userProfile.create({ profileImageUrl: gInfo.picture })
      if (personProfile) {
        const payload = {
          id: personProfile.id,
          name: personProfile.firstName,
          email: personProfile.email,
        };
        const token = jwt.sign(payload, 'nasasifra');
        personProfile.token = token;
        return personProfile;
      }
    }
  } else {
    return { error: 'Invalid access' };
  }
  return { error: 'Invalid access' };
}

export default {
  userLogin,
};

