import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const SignInButton = () => {
  return (
    <Link to="/auth/login">
      <Button className="p-6 ombre bg-pink-400 hover:bg-pink-500 font-bold">
        Sign In
      </Button>
    </Link>
    )
  }

export default SignInButton