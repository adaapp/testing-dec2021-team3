<div align="center">

![Component 13(3)](https://user-images.githubusercontent.com/54673205/148420510-0fd3cdb6-042f-4aa6-9518-140793801cdd.png)

[![Issues][issues-badge]][issues-url]
[![Contributors][contributors-badge]][contributors-url]
[![Forks][forks-badge]][forks-url]
[![Stargazers][stars-badge]][stars-url]
[![MIT License][license-badge]][license-url]
[![Coverage][coverage-badge]][coverage-url]


![look feel](https://user-images.githubusercontent.com/54673205/148524396-0582a4b3-0a7f-4ea2-a9b7-54e24dd68579.png)  

</div>

# Why mélodie?

The most popular online DAWs and virtual instruments are plagued with advertisements and a lack of key features required by musicians. Our virtual piano is the start of an idea to revolutionise the creation of music and beautiful melodies, all from your browser. Here are some of the key features we are aiming to bring to the table:

- [x] A tuneful and rich Piano sample
- [x] Being able to play using your keyboard!
- [x] Volume control
- [x] Key visualisation
- [x] Built-in configurable metronome

## :trophy: Team members

![Component 1 (12)](https://user-images.githubusercontent.com/90607671/149822239-f2c2952b-7f25-4f42-9cdd-0acbddced7d7.png)


## :heavy_exclamation_mark: UI Designs and UX Testing

In order to begin our project, we began conceptualising the design of our virtual keyboard in Figma. Figma is a cloud-based design tool that provides real-time and simultaneous collaboration which is essential for our team of 5. This meant that during our initial designs where we all created a design, we were all able to transparently see and adjust each other's interpretation of a virtual keyboard and mélodie's theme. We then collaborated on a Google meeting on the best features, colours, layouts and structured of each team members design and in the end, we formalised our preferances into 2 designs.

Design 1                   |  Design 2
:-------------------------:|:-------------------------:
![design 1](https://user-images.githubusercontent.com/54673305/149911704-59a77e06-e0d5-4a91-944e-ee0a2559b3c6.png) |  ![design 2](https://user-images.githubusercontent.com/54673305/149911790-efbf0554-84c9-4c1d-872a-b5fe4b1a7f80.png)

### 📖 React Testing library 
![react testing library image](https://user-images.githubusercontent.com/90607602/149968583-1f49f002-711b-4ca7-9be0-a31edd29d1e8.png)

The react testing library is used for testing the UI. Jest (standalone) is utilised to test the logic of the application. Jest is an javascript testing framework designed with simplicity in mind. Jest supports projects coded using Babel, Typescript, **Node**, React, Angular, Vue and more. Making Jest an ideal testing framework for our project. Using Jest, the team worked together to produce testing blocks that lead to 90-100% code coverage.

### Coveralls
![Coveralls logo](https://user-images.githubusercontent.com/90607602/149969963-61ec1cbe-d202-4dfc-983f-c8152c6ded97.png)
![Coveralls interface](https://user-images.githubusercontent.com/90607602/149975572-80f89898-6a21-4665-81b0-70f5fc127534.png)

Coveralls is a web service that allows us to track the code coverage of our digital piano website over time in order to optimize the effectiveness of our unit tests. Coveralls also assist the team in making sure that all of the code is well tested and it allows the team to check the code coverage over time. Coveralls does this by collecting code coverage data and analyses it for issues that the user normally wouldn't find until there some sort of an error. Coveralls will produce a summary of this data in a simplified interface where you can see the trends and changes for coverage on all of the source files used. Coveralls also gives the user a badge that has been added to the readme to provide up-to-date information about our coverage status from viewable github.


### A/B Testing of Initial Designs 

In order to decide out of the 2 designs which is the most suitable, we agreed to implement A/B testing. This is a method of comparing an original and alternative version of a webpage or webpage element against each other to determine which one performs better and is more aligned with the project objectives or themes. Usually, this is measured through conversion rates, however, we decided to ask users from our cohort as well as work colleagues which design they liked the most and to provide any additional feedback. The additional feedback is crucial to ensure that the design and functionality are well-suited and comfortable for the end-users. We did this through a [Google Form](https://forms.gle/oGP2Z5ya8JYSQ3oj8) ![](https://user-images.githubusercontent.com/54673305/149938128-5a80d437-f65a-4e59-b875-6128e7b320d8.png) and the [results](https://docs.google.com/spreadsheets/d/10MxjZOEHTrxK1OWae4IZZT18MHrDF0U7FuKx6qBaNYE/edit?resourcekey#gid=733658812) of the form demonstrate that Design 2 has had more success which means that as a team, we will work towards achieving this design in the final product.

|                          |                          |
:-------------------------:|:-------------------------:
<img width="710" alt="Screenshot 2022-01-18 at 12 53 36" src="https://user-images.githubusercontent.com/54673305/149941036-a5cc3dff-bab8-470e-933e-b53221d6e121.png"> | <img width="714" alt="Screenshot 2022-01-18 at 12 53 16" src="https://user-images.githubusercontent.com/54673305/149941104-537de179-eea0-4f5f-b206-88d10946172e.png">

### Usability Testing of Final Product

Whilst gathering any feedback from the previous form and discussions and incorporating it into the final product, we decided to construct a [Google Form](https://forms.gle/RzfgZcjYtmJ8q9Aq6) ![](https://user-images.githubusercontent.com/54673305/149938128-5a80d437-f65a-4e59-b875-6128e7b320d8.png) that would test the usability of the final product's design. Usability testing is a technique to evaluate a device or product, such as a web form or webpage. By testing our product on real users, we were able to identify issues regarding navigation, accessibility as wells as problems that automated tools may not find as well. Those issues can then be translated into Github issues which as a team, we can later resolve. 

screenshot of results... pending... waiting for bruno to commit the new splash screen...

### Accessibility Testing

In order to improve the quality of our webpage, we used the Google Lighthouse tool to generate a report containing a summary of the quality of our application. Lighthouse is a free and open-source tool that can be accessed through the development console for Chromium-based browsers. In order to improve the quality of our webpage, we used the Google Lighthouse tool to generate a report containing a summary of the quality of our application. Lighthouse is a free and open-source tool that can be accessed through the development console for Chromium-based browsers. There are 4 metrics which we have focussed on which were: 

- Performance which is an aggregation of how the page progressed in aspects such as loading speed, time taken for loading basic frames and displaying meaningful content. 
- Accessibility which is an aggregation of how accessible the website is through audio captions, button names and 'aria-' attributes.
- Best Practices which is an aggregation of many practices that have been deemed 'best' such as use of HTTPS and avoiding the use of deprecated code.
- SEO which is an aggregation of scores in features such as meta description, presence of titles, legible font sizes.

![image 6 (1)](https://user-images.githubusercontent.com/54673305/149948691-0b5389cc-fe86-4b4b-be74-fadd1c521871.png)



## :heavy_exclamation_mark: Prerequisites

This project requires npm to execute the files, so ensure that it is installed.

<details><summary><b>Stuck? Press here to view instructions :arrow_heading_down:</b></summary>

1. Ensure node and npm are installed by running the following commands in your terminal:

    ```sh
    $ node -v
    $ npm -v
    ```
    If they are not installed, follow the steps on [npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

2. Afterwards, clone this repo:

    ```sh
    $ git clone https://github.com/adaapp/testi![Uploading unnamed.png…]()
ng-dec2021-team3.git
    ```
  
</details>

## :book: Getting Started

In the project directory, you can run:

  ```sh
  $ npm start
  ```

Runs the app in the development mode. :point_up_2: \
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

  ```sh
  $ npm test
  ```
  
Launches the test runner in the interactive watch mode. :point_up_2: \
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  ```sh
  $ npm run build
  ```
Builds the app for production to the `build` folder. :point_up_2: \
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

  ```sh
  $ npm run eject
  ```
**Note: this :point_up_2: is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
  
[issues-badge]: https://img.shields.io/github/issues/adaapp/testing-dec2021-team3.svg?style=for-the-badge
[issues-url]: https://github.com/adaapp/testing-dec2021-team3/issues
[contributors-badge]: https://img.shields.io/github/contributors/adaapp/testing-dec2021-team3.svg?style=for-the-badge
[contributors-url]: https://github.com/adaapp/testing-dec2021-team3/graphs/contributors
[forks-badge]: https://img.shields.io/github/forks/adaapp/testing-dec2021-team3.svg?style=for-the-badge
[forks-url]: https://github.com/adaapp/testing-dec2021-team3/network/members
[stars-badge]: https://img.shields.io/github/stars/adaapp/testing-dec2021-team3.svg?style=for-the-badge
[stars-url]: https://github.com/adaapp/testing-dec2021-team3/stargazers
[license-badge]: https://img.shields.io/github/license/adaapp/testing-dec2021-team3.svg?style=for-the-badge
[license-url]: https://github.com/adaapp/testing-dec2021-team3/blob/master/LICENSE.txt
[coverage-badge]: https://img.shields.io/coveralls/github/adaapp/testing-dec2021-team3?style=for-the-badge
[coverage-url]: https://coveralls.io/github/adaapp/testing-dec2021-team3
