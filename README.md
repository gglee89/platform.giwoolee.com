# movie-platform

Movie selection platform with two simple pages. Home and Movie page (ie. Detail view)

# Deployment

- [DNS Resolution] AWS Route53
- [Distribution] AWS Cloudfront
- [Continuous Deployment] Github Action
- [Host] AWS S3 Static Website

# UI Prototype / Styleguide / Static Assets

- [Invision high fidelity prototype](https://invis.io/K6GW19Z3FP8#/291216728_1-Search)
- [Styleguide](https://invis.io/5JGW1AFQHUX#/291309274_1-type)
- [Assets](https://drive.google.com/file/d/1odVI0RZrai1PLyajf0w3sWMz9TTGTsWR/view?usp=sharing)

# Platform

**[Frontend Development]**  
ReactJS / Redux Toolkit / Axios

**[UI Framework]**  
MaterialUI

# APIs

**Movies categories**  
http://www.omdbapi.com/

# How to start

- For production access:
- [TBD] `Open browser` to access the link https://**\*\*\***.**\*\*\***
- For development access:
- `git clone` this repository into your local
- Run `npm install` to install all node packages in `package.json`
- Run `npm start`

# How to run tests

- Run `npm run test` to execute `react-scripts test`

# Development strategy

A more detailed explained on the steps I've taken to go about the development of the application.  
[Link to the file DEVELOPMENT.md](./docs/DEVELOPMENT.md)

# Tips

- [x] Write a good README with basic information (e.g.: how to start the project and how to build it);
- [] There's no screens designed for the mobile version, but if you build a responsive app it's a big plus. We would love to see your design skills as well!
- [] Feel free to work and improve on the available designs. Think of them as guidelines.
- [] There's a "like" button on the details page. It would be great if this information is persistent!
  - I was going to use `localStorage` to save users' "preferences". But due to the time constraint I've skipped.
- [x] Prefer to use a css methodology, such as BEM, ITCSS, etc;
- [x] Use any CSS extension like LESS or SASS;
  - I've used MaterialUI instead.
- [x] Asking questions is good. We will not penalize you for asking questions;
  - Didn't have enough time to ask questions.
  - I'd ask questions on if whether there's a need to have this application deployed with (Dev, Staging, QA, and Production) environments.
- [] The API server is sometimes slow, so think about loading and empty states throughout your application;
  - Just handled asynchronous calls
- [] We're looking for signs you understand concepts such as events, promises, and reactivity, and how those concepts are implemented in Javascript;
- [] Unit testing will be greatly valued;
  - Couldn't expand much on this due to the time.
- [x] The git history will be evaluated;
- [x] Your code will be evaluated by: semantics, structure, legibility, size, elegance (among other factors);

# Author

**Giwoo Gustavo Lee**  
Frontend Development  
[Linkedin](https://linkedin.com/in/leegiwoo)
