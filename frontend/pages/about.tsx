import Link from "next/link";

const About = () => {
  return (
    <div>
      <p>About page</p>
      <Link href="/">
        <a>See the homepage.</a>
      </Link>
    </div>
  );
};

export default About;
