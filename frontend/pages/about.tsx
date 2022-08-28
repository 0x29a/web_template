import Link from "next/link";

const About = () => {
  return (
    <div className="grid">
      <p>About page</p>
      <Link href="/">
        <a>See the homepage.</a>
      </Link>
    </div>
  );
};

export default About;
