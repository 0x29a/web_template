# Frontend upgrade

1. Check `Dockerfile` for the frontend service and update [node](https://hub.docker.com/_/node) container version if needed.
2. Stop `frontend` service:

        make frontend.stop

3. Re-build the container:

        make frontend.build

4. Start the container:

        make frontend.up

5. Create a fresh CRA project, and see what dependencies can be upgraded. Also, check CRA migration guide for a new version:

        make frontend.bash
        cd && npx create-react-app dependencies --template typescript

6. If any dependencies need to be upgraded:

        make set_frontend_permissions_back
        vim package.json # update versions
        make set_frontend_permissions
        make frontend.restart

7. Upgrade other packages:

        yarn upgrade react-bootstrap bootstrap @reduxjs/toolkit --upgrade
