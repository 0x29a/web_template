import Link from "next/link";

import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 sm:px-6">
      <p>Sign-in</p>
      <Link href="/">See the homepage.</Link>
      <div>
        <button className="btn">Try Sign In</button>
        <button className="btn">Execute the lazy query</button>
      </div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register("firstName")} />
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <p>Last name is required.</p>}
        <input {...register("age", { pattern: /\d+/ })} />
        {errors.age && <p>Please enter number for age.</p>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default SignIn;
