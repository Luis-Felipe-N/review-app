'use client'

import { getRedirectResult, signInWithRedirect } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, provider } from '@/lib/firebase'

export default function LogIn() {
  const router = useRouter()

  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return
      }

      console.log(userCred)

      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.push('/protected')
        }
      })
    })
  }, [])

  function signIn() {
    signInWithRedirect(auth, provider)
  }

  return (
    <>
      <button onClick={() => signIn()}>Sign In</button>
    </>
  )
}
