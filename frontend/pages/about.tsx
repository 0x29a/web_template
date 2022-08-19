import { backendApi, useLogoutCreateMutation } from "../lib/backendApi";
import { wrapper } from "../lib/store";
import Link from "next/link";

const About = () => {
    const [logoutCreation, status] = useLogoutCreateMutation();
    return <div>
        <Link href="/"><a>Go Home</a></Link>
        <button onClick={() => {logoutCreation()}}>Hello, World!</button>
      </div>
}

export default About;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(backendApi.endpoints.userRetrieve.initiate())
    await Promise.all(backendApi.util.getRunningOperationPromises());

    return {
      props: {},
    };
  }
);