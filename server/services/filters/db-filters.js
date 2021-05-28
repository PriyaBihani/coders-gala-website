exports.sanitizeUser = (user) => {
  return {
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    points: user.points,
    role: user.role,
    referCode: user.referCode,
    email: user.email,
    unLockedTopics: user.unLockedTopics,
    likedArticles: user.likedArticles
  };
};
