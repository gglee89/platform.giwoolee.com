# Development Strategy

# Foundational must-have app features

1. [x] Setup ReactJS app w/ Typescript as a single page application (SPA)
2. [x] Setup `react-redux` and `redux` store
   - note: This is NOT fully necessary for this app current scale.
3. [x] Setup basic **action** and **reducer** for movies
   - **src/features/movies**
4. [x] Setup API access module in services **(src/services)**
5. [x] Setup pages **Web Components**
   - Home page (eg. src/pages/Home)
   - Movie page (eg. src/pages/Movies)
6. [x] Setup `react-router-dom` to handle app routing
   - Home page (eg. <URL>/)
   - Movie page (eg. <URL>/movies/<movie-id>)
   - Not Found page (eg. <URL>/\*)
7. [x] Setup `axios` with maybe `redux-thunk`
8. [x] Implement basic unit testing functionality for with Jest for `pages` and `components`
9. [x] Add `search box component` for movie search
10. [x] Add `card box component` for movies
11. [x] Add `button box component` for `Add to favorites` functionality
12. [x] Add `movies filtering` functionality
13. [x] (Asynchonous API request) Fetch movies from OMDB with search key

# Enhancement good-to-have app features

- [] Develop using the `mobile-first` approach with **media-queries**
- [] Persist `user likes` in `localStorage`
- [] Implement react's `lazy` functionality with `Suspense` to handle asynchonous API calls responding with list objects
- [] Add `loading` spinner OR `placeholders` while API is fetching results

# Optional enhancement features

- [] IF there's time left, add `load more` functionality when users scroll to the bottom of the page
- [] Add `elastic search` functionality for text `auto-completion` in search box
