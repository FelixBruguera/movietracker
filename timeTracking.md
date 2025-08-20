# Time Tracker

|    Day     | Hours | Task                                                                                                                                                                                        |
| :--------: | :---- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 26.06.2025 | 2     | Implement the /movies endpoint to the API and add tests                                                                                                                                     |
| 26.06.2025 | 0.5   | Add pagination to the movies endpoint, update the output of the movies pipeline, refactor the query params parsing and update the tests                                                     |
| 30.06.2025 | 2     | Install next, tailwind and shadcn, remove vite, add the total pages to the output of the movies endpoint. Update the tests to work with pagination, Add the index component with pagination |
| 1.07.2025  | 2     | Refactor the pagination, Add the header and navlinks, Add the movieMenu component that handles the sorting and filtering of movies                                                          |
| 2.07.2025  | 3     | Refactor the movies endpoint to  allow min and max values for range parameters, Add  filters to the main page                                                          |
| 3.07.2025  | 4     | Implement movie search and enhance error handling, Add text search functionality for movies, Add error handling for filters, Refactor moviesFilter and moviesMenu for better readability, Simplify API sorting by removing less common fields                                                          |
| 4.07.2025  | 4     | Add cast and directors as parameters to the movies endpoint, Add tests for all the search parameters, Refactor tests to use the new range parameter format, Add the pipeline for the /movies/:id endpoint, Add the pipeline for the /reviews endpoint, Add a loading state to the index route                                                         |
| 7.07.2025  | 6     | Refactor the movie and reviews pipelines and pages. Move the review fetching exclusively to the reviews endpoint and the reviews pipeline to it's own file. Add the /movies/:id page that renders a detailed view of a movie and the Reviews and review components that render a list of reviews and a review respectively. Move repeated code into reusable components, remove unused imports |
| 7.07.2025  | 0.5     | Add the SelectSortBy and MovieLinkList components |
| 9.07.2025  | 6     | Install playwright and add tests, add the /users/create endpoint and tests, add the Poster component that handles broken images, refactor the reviews component to only show pagination when there's more than 1 page and refactor the movies pipeline to allow sorting by the release date |
| 10.07.2025  | 3     | Add dark and light mode toggle and update the styles of the components to support both modes. Add the average rating to the output of reivewsPipeline and display it in the reviews component, update the styling of the review component and add a loading skeleton to the movies/id route
| 12.07.2025  | 3     | Implement authentication with Better Auth, add the Toaster component to display notifications and the login and signup routes
| 13.07.2025  | 6     | Add tests with a logged in user, implement review creation in the frontend and the api, add validation to the AuthInput fields, add the UserDropdown component that renders a list of options for logged in users, refactor the sign-up tests
| 14.07.2025  | 3     | Refactor the movies pipeline to improve code readability, moving the definition of valid options and settings to a single object and improving the creation of the match stage for ranges, add the currentUser's ID to the reviews query so it refetches the reviews when the user status changes, fix the pagination buttons hover in dark mode
| 15.07.2025  | 6     | Add the users route, index endpoint and index component. Add responsive styles to most components. Add two error handling components, one for route erros and the other for fetch errors and moved the functions that handle sort by and sort order changes to their respective components
| 16.07.2025  | 6     | Implement the ui and api endpoint of user profiles. Refactor parts of the reviews component into smaller components
| 18.07.2025  | 4     | Implement the diary tab in the user profile and refactor some parts of the reviews component into reusable components
| 20.07.2025  | 5     | Refactor the reviews ui and endpoint. Implement review editing and removal. Add tests for creating, editing and deleting reviews
| 21.07.2025  | 6     | Implement log creation, updating and removal and tests for each
| 22.07.2025  | 1     | Refactor the users endpoint and routes
| 22.07.2025  | 2     | Add responsive styles to the new components
| 23.07.2025  | 3     | Restyle the movies index, add more responsive styles and fix light mode. Improve validation in the api and add more tests
| 25.07.2025  | 8     | Add the lists and lists/[id] api endpoints. Add the lists and list ui components. Refactor the LogDialog component to make it reusable
| 28.07.2025  | 7     | Added the forms and mutations to update and delete lists and added tests. Moved the form for creating lists into it's own component. Refactor the DialogTriggerWrap component to make it compatible with Dialogs and AlertDialogs. Added the default icon sizing to globals.css. Changed the import paths from relative to absolute
| 29.07.2025  | 2     | Minor refactors, moved all the image sizing to the poster component and add a "read more" function to movies with long descriptions
| 01.08.2025  | 10     | Implement the lists tab on profiles. Add dynamic titles. Refactor the profile pipelines to handle users with no reviews or logs. Refactor the login logic
| 04.08.2025  | 8     | - Add images to users with gravatar. Add the count of reviews to each user document and the count of movies to each list. Add transactions for creating and deleting a review and adding and removing movies from a list. Add more tests for lists and reviews
| 06.08.2025  | 6     | Implement list following, fixes and refactors 
| 08.08.2025  | 5     | Implement list search and filtering by followed lists. Add api tests for the lists endpoint. Refactor the styles of the list and user cards. Add tests for following and unfollowing lists
| 11.08.2025  | 8     | Refactor the api validation with zod and add more tests for lists and movies
| 12.08.2025  | 5     | Refactor the profiles, lists, users and styles
| 14.08.2025  | 4     | Add the stats tab to profiles. Add the /stats endpoint and a pipeline for review stats
| 15.08.2025  | 3     | Add diary stats, refactors and style changes
| 16.08.2025  | 5     | Add charts for most movies watched in a month, most watched movies, and rated higher than imdb and refactor the styles of charts and skeletons
| 18.08.2025  | 8     | Change colors, update styles, refactor the filters form and charts. Add the rated lower than imdb stat
| 20.08.2025  | 8     | Add the option to create a log when writing a review, remove the minimun length of the reviews comment, add more sorting options to the lists in profiles, modify styles, add more tests



