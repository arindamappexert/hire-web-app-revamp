import firebase from 'firebase/app';


export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();

export const handleSSOAuth = async (provider: firebase.auth.AuthProvider) => {
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (!result.user) {
      throw new Error('No user data returned');
    }

    return {
      status: true,
      data: {
        uid: result.user.uid,
        email: result.user.email,
        fullName: result.user.displayName,
        profileData: {
          email: result.user.email,
          fullName: result.user.displayName,
          phoneNumber: result.user.phoneNumber || '',
          photoURL: result.user.photoURL || '',
          providerId: result.user.providerData[0]?.providerId || '',
        },
      },
    };
  } catch (error: any) {
    console.error(error);
    return {
      status: false,
      error: error.message,
    };
  }
};
