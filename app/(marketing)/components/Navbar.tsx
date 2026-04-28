
import Link from 'next/link';
import MyContainer from './MyContainer';

const Navbar = () => {
  return (
    <nav className="bg-brand-dark ">
      <MyContainer className="text-brand-white py-4 px-6 flex justify-between items-center">
 <div className="text-xl font-bold">CODEZY</div>
      
      <div className="space-x-6 hidden md:flex">
        <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
        <Link href="/courses" className="text-brand-gray hover:text-brand-white transition-colors">Courses</Link>
      </div>

      <Link href="/register" className="bg-brand-gold text-brand-white px-5 py-2 
      rounded-lg font-semibold hover:bg-opacity-90 transition-all">
        Register
      </Link>
      </MyContainer>
     
    </nav>
  );
};

export default Navbar;