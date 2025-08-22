// Authentication service functions
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth'
import { getFirebaseAuth } from './firebase'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
}

export const signIn = async (email: string, password: string): Promise<AuthUser> => {
  const auth = getFirebaseAuth()
  if (!auth) {
    throw new Error('Firebase no está configurado')
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  }
}

export const signOutUser = async (): Promise<void> => {
  const auth = getFirebaseAuth()
  if (!auth) {
    throw new Error('Firebase no está configurado')
  }

  await signOut(auth)
}

export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  const auth = getFirebaseAuth()
  if (!auth) {
    callback(null)
    return () => {}
  }

  return onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      })
    } else {
      callback(null)
    }
  })
}

export const getCurrentUser = (): AuthUser | null => {
  const auth = getFirebaseAuth()
  if (!auth) {
    return null
  }

  const user = auth.currentUser
  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }
  }
  return null
}
