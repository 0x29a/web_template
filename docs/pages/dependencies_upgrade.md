# Dependencies upgrade

To upgrade python dependencies:

1. Create or activate Python 3.9.9 virtual environment:

        pyenv activate web_template

2. Re-compile dependencies:

        make upgrade

3. Rebuild containers and restart services:

        make stop
        make build
        make up

4. Test that everything works.
5. Commit changes to the `requirements/*`.
