import { auth } from './FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";

export const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
}

export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
}

export const logout = async () => {
    await signOut(auth);
}

export const getCurrentUser = (): User | null => {
    return auth.currentUser;
}