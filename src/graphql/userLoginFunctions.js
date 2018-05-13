import jwt from 'jsonwebtoken';
import socialApi from './socialApi';
import db from '../../db/db';

async function userLogin(args) {
  if (args.fbToken) {
    const fbId = await socialApi.checkSocialToken('facebook', args.fbToken);
    if (fbId.success) {
      const fbInfo = await socialApi.fbGetInfo(fbId.id, args.fbToken);
      const user = await db.models.userCl.findOne({ where: { email: fbInfo.email } });
      if (user) {
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
        const token = jwt.sign(payload, 'nasasifra');
        user.token = token;
        return user;
      }
      const userId = await db.models.userCl.findOne({ where: { fbId: fbId.id } });
      if (userId) {
        const payload = {
          id: userId.id,
          firstName: userId.firstName,
          lastName: userId.lastName,
          email: userId.email,
          userType: user.userTypeId,
        };
        const token = jwt.sign(payload, 'nasasifra');
        userId.token = token;
        return userId;
      }
      const profileImage = await socialApi.fbGetProfileImage(fbId.id);
      const personProfile = await db.models.userCl.create({
        imageUrl: profileImage.data.url,
        email: fbInfo.email,
        lastName: fbInfo.last_name,
        firstName: fbInfo.first_name,
      });
      if (personProfile) {
        const payload = {
          id: personProfile.id,
          firstName: personProfile.firstName,
          lastName: personProfile.lastName,
          email: personProfile.email,
          imageUrl: personProfile.imageUrl,
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
    console.log('JKA SAM G ID ', gId);
    if (gId.success) {
      const gInfo = await socialApi.googleGetInfo(args.gToken);
      console.log('JA SAM GINFO ', gInfo);
      const user = await db.models.userCl.findOne({ where: { email: gInfo.email } });
      if (user) {
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          imageUrl: user.picture,
        };
        const token = jwt.sign(payload, 'nasasifra');
        user.token = token;
        return user;
      }
      const personProfile = await db.models.userCl.create({
        imageUrl: gInfo.picture,
        email: gInfo.email,
        lastName: gInfo.lastName,
        firstName: gInfo.firstName,
      });
      if (personProfile) {
        const payload = {
          id: personProfile.id,
          firstName: personProfile.firstName,
          lastName: personProfile.lastName,
          imageUrl: personProfile.imageUrl,
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

