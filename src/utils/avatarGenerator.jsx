import { AvatarGenerator } from 'random-avatar-generator';
// Create an instance of the avatar generator
const avatar = new AvatarGenerator();

export const generateAvatarUrl = (user) => {
  // Generate a unique avatar URL based on the user's name
  const avatarUrl = avatar.generateRandomAvatar(user);
  return avatarUrl;
};