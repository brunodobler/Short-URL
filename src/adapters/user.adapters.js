export const userAdapter = (firebaseUser) => {
    if(!firebaseUser) return null;

    return{
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        accessToken: firebaseUser.accessToken,
    }
}