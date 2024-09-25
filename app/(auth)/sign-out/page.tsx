import AuthForm from '@/app/components/AuthForm'

const SignOut = () => {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm 
      type="sign-out"
      />
    </section>
  )
}

export default SignOut