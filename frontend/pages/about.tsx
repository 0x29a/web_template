import Link from "next/link";

const About = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 sm:px-6">
      <p>About page</p>
      <Link href="/">See the homepage.</Link>
    </div>
  );
};

export default About;
