
import CredentialsSignIn from '../auth-components/credentials-signin'
import GoogleSignIn from '../auth-components/google-signin'
import Link from 'next/link';

export default async function LoginPage() {

  return (
    <div className='flex flex-col items-center justify-center'>
      <CredentialsSignIn />
      <GoogleSignIn logType='Sign in'/>
      <p>Don&apos;t have an account? <Link href='/register' className='underline text-blue-500'>Register</Link></p>
    </div>
  )
}
