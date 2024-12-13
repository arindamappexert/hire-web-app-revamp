import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/stores/useUserStore'

export const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(true)
  const { setUser, clearUser } = useUserStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true)
      if (firebaseUser) {
        const idTokenResult = await firebaseUser.getIdTokenResult()
        const user = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          role: idTokenResult.claims.role || 'USER',
          permissions: idTokenResult.claims.permissions || []
        }
        setUser(user)
      } else {
        clearUser()
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, clearUser])

  return { loading }
}