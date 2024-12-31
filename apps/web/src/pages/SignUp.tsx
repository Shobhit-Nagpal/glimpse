import { SignUpForm } from "../components/features/auth/SignUp";
import { Logo } from "../components/global/Logo";
import authBg from "../assets/auth-bg.jpg";

export default function SignUp() {
  return (
    <section className="w-full h-screen flex">
      <div className="w-1/2 h-full">
        <img
          src={authBg}
          alt="Auth side image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-1/2 h-full flex-col flex justify-center items-center p-6">
        <Logo className="h-24 w-24" />

        <div className="text-center">
          <h3 className="font-bold text-lg">Discover, Trade, Thrive</h3>
          <p>Unlock Your Digital Assets on Glimpse</p>
        </div>

        <SignUpForm />
      </div>
    </section>
  );
}
