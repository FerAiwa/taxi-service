# taxi-service

2nd Hack a Bos Bootcamp Challenge - Taxi Service with user/admin views

## Resources

### Live Demo

- [Taxi-Service v.1.0](https://feraiwa.github.io/taxi-service/)

### Documentation

- [JSDoc Site](https://feraiwa.github.io/taxi-service/docs)

## What´s my goal here?

With this exercise I´m trying to understand patterns like MVC. Deep diving in concepts like componentes, modules, and the principle of single responsibility. Before going back to bundlers or frameworks... I realy want to learn about how to keep my code clean, flexible and scalable."
This is just a rookie exercise, so there are probably tons of mistakes around.
If you want to help me, I´m open to suggestions!


## Changelog

### Latest - 2019/3/11

**Documentation**

- Added some JSDoc' documentation to the code.

### Upcoming changes (week4)

Soon some code refactor of the controller part, and probably CSS boosting.

### Story 
Bootcamp Week 3: 2019/3/4 - 2019/3/10

#### Features

- Now Main module behaves diferently if you identify yourself as a 'admin' or a user,
  displaying diferent controls for the rides table.
  You can try playing around, by pseudo-login as 'admin', creating some rides, and relog as
  user. Changes are kept in localstorage and should be reflected in the view regardless the user role.

- **UI**

  - Admin controls are now fully implemented.
  - Added some icons for buy & edit buttons.
  - Added some Css to make the sort on click option more intuitive to the user.
  - Ride rows are now hidden when their cost is below the slider value.

- **Components:**
  - Table is now a separated component.
  - Implemented a ViewFactory to generate diferent views depending on configuration object.

#### Bug Fixes

- **UI:** Fixed slider controls & tableheader.
- **UI:** Rows now properly update on slider changes & clicks on table headers.
