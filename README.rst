|Build Status| |Codecov| |npm_version| |npm_downloads| |license| |semantic-release| ## As many of these as you'd like to include, or others if you wish!

frontend-app-exams-dashboard
==============================

Please tag **@edx/masters-devs-cosmonauts** on any PRs or issues.  Thanks!

Introduction
------------

This micro-frontend provides instructors with a view to manage exams.

Installation
------------

1. Clone your new repo:

  ``git clone https://github.com/openedx/frontend-app-exams-dashboard.git``

2. Use node v12.x.

   The micro-frontend build scripts support node 12.  Using other major versions of node *may* work, but is unsupported.  For convenience, this repository includes an .nvmrc file to help in setting the correct node version via `nvm <https://github.com/nvm-sh/nvm>`_.

3. Install npm dependencies:

  ``cd frontend-template-application && npm install``

4. Update the application port to use for local development:

   Default port is 8080. If this does not work for you, update the line `PORT=8080` to your port in all .env.* files

5. Start the dev server:

  ``npm start``

The dev server is running at `http://localhost:8080 <http://localhost:8080>`_ or whatever port you setup.

==============================

References (for authors of the README; delete this section before publishing)

* https://github.com/openedx/frontend-app-library-authoring/blob/master/README.rst has many of the above discussed
  sections and implements them well

* https://opencraft.com/blog/introducing-open-edx-publisher/#how-does-it-work is an example of explaining when
  env variables/settings are required
