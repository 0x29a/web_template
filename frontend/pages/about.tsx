import { backendApi } from "../lib/backendApi";
import { wrapper } from "../lib/store";

const About = () => {
    return <div>Hello, World!</div>
}

export default About;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(backendApi.endpoints.loginCreate.initiate({
      login: {
        email: 'test@example.com',
        password: 'test'
      }
    }))
    await Promise.all(backendApi.util.getRunningOperationPromises());

    return {
      props: {},
    };
  }
);