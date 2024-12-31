import CONFIG from "../../../utils/api";
import { Button } from "../../ui/Button";

export function SignUpForm() {

  const googleLogin = () => {
    window.location.href = `${CONFIG.apiUrl}/auth/google`;
  };

  const githubLogin = () => {
    window.location.href = `${CONFIG.apiUrl}/auth/github`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <Button onClick={googleLogin}>Google login</Button>
        <Button onClick={githubLogin}>Github login</Button>
      </div>
      <div></div>
    </div>
  );
}
