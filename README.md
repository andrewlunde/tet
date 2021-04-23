# TET

TET is a proof of concept of pay-per-minute online classes powered by Theta. A demo is available on [tet.university](https://tet.university).

To run locally,

```
git clone https://github.com/waylad/tet.git

cd tet

yarn install

cd src/api

**Rename .env.example as .env and fill RECAPTCHA_SECRET_KEY with your recaptcha secret key and MONGO_URL with your MongoDB SRV connection string**

cd ../frontend

**Rename .env.example as .env and fill REACT_APP_RECAPTCHA_SITE_KEY with your recaptcha key**

cd ../..

yarn run start
```
