# Dependencies upgrade

To upgrade python dependencies:

1. Re-compile dependencies:

        make upgrade

2. Rebuild containers and restart services:

        make stop
        make build
        make up

3. Test that everything works.
4. Commit changes to the `backend/requirements/*`.
