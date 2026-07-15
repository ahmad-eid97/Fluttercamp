//= Components
import Navbar from "@/components/Common/Navbar";
import SignupForm from '@/components/Auth/Signup';
import Footer from "@/components/Common/Footer";

export async function generateMetadata() {
  return {
    title: `FlutterCamp - Signup`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

async function SignupPage() {
  return (
    <>
      <Navbar />
      <SignupForm />
      <Footer />
    </>
  );
};


export default SignupPage;
