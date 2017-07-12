Credit Card Payment Component

Write-Up

1. How long did you spend working on the problem? How much time did you spend thinking about the design before writing your code?

I spent about 4-5 hours total on this assignment. Before I started coding, I spent about 30 minutes thinking about the design, drawing out the logic for the validations, and considering all the edge cases and user stories. The main user story I came up with was "As a customer, I want to enter my credit card information so that I can continue checking out to to purchase my order." I also wanted to make sure that my solution was accessible to people who can only use the keyboard, and color-blind or blind people.


2. What are the UI/UX usability features you implemented, or thought about implementing? How do they help validate the user input?
In addition to validating the user's inputs with JavaScript, I also implemented error messages that appear and disappear depending on what kind of input error the user made. If they left any field blank, the error message would tell them that that field is required. If the user did not enter a valid credit card, I urge them to enter a valid one. If the user entered a valid Visa or American Express credit card number but not a valid CVV2, I tell them the correct number of digits that the CVV2 should have based on the kind of card they entered, since users are oftentimes confused by CVV2s. Lastly, if the user enters an expired card, I tell them that their card is expired and that they should use an unexpired one instead. Additionally, I allow users to enter the year as either 2 or 4 digits, since it's a good idea to give users as many possible options to accomplish a tast easily as possible. 

I designed the JavaScript to render all relevant errors at once, as opposed to the HTML5 default of only rendering one error at a time, because my research showed that giving the users as much information about how to accurately fill in a form is preferrable to only presenting one error to them at a time when they in fact made multiple errors. 

My solution is also tab-able, so it is accessible in that way.

I thought about putting a stricter validation on the name field by validating that the user enter their first and last name. However, I realized that this might not be the best idea because there is a lot of name variation in the world due to cultural variety. Also, there were too many edge cases to consider for a project of this scope, such as the fact that many people have a middle initial on their card, or have hyphenated last names, etc.

In order to make the form accessible to the blind, I added a `aria-describedby` tag to each form input field. Since the mockup calls for the description of each field to just be placeholder text, I wanted to make sure that blind users who use screen readers could still tell which field is which. I then put descriptions of each field in divs and placed them off the screen so that they do not affect sighted users' experiences.


3. What would a form submission/API payload of this look like? How would you deal with validation errors that may come from that API response?

If I were to implement my solution with API calls, I would send a POST request with the credit card information to the credit card company's servers, making sure that the data in that request is encrypted securely and PCI compliant. The credit card server would then send a single-use token back to the client, representing the payment information. The client would then submit the form with the token to my server using a software development kit (SDK). Finally, my server would send the charge token to the credit card company server, where the charge would be made.

If any API errors occur, I would want to display them to the user in ways that they would understand, and advise them about how to best deal with those errors. For example, if the user gets back a 400 (Bad Request) error, I would try to advise them about how to enter their data in a way that the API will accept, such as by saying something like "Your credit card did not go through. This could be because the name you entered does not match the name on your card, you hit your credit limit, or your card may be expired or cancelled. Try entering the information again, or try another card if you have one." If the API sends back a 500 (Internal Server Error), I would tell the user that the credit card processing system appears to be down, and to try again later. If the user receives a 403 (Forbidden) error, I would try to tell them why their actions with the form are forbidden without compromising security.


4. How would you test this component?

If I were to test this component, I would write some unit and regression tests. I would validate that when certain values are entered into the form that they produce the correct outcome, i.e. successful submission or whichever error message would be expected in that case. I would also write tests that deal with multiple conditions, such as the expiration month and year, and the credit card number and CVV2. If the year that the user entered is the current year, we need to check to see that the month they entered has not passed. Depending on what kind of card the user entered, the CVV2 could be either valid or invalid as well. If I were to test this input form using Ruby on Rails, I would write all the same validations I wrote in JavaScript on the back end (i.e. in the model code), and I would write unit tests and make sure they pass. I would likely use the gems MiniTest, Factory Girl and/or shoulda matchers.


5. What are some styling and layout considerations for these types of form inputs?

With forms that deal with sensitive information like credit cards, I see little need to go beyond simple, modern styling in most cases. If this component were to go on a page, I would try to match that page's visual design as much as possible. However, for a reusable component, simple is oven preferred. Bootstrap's default styling worked quite well for this, although I did use some vanilla CSS to edit margins and the color of the error text. I chose red for the error message text because it is a standard error message color, and since I am usig a white background it should still be readable to color blind people. If I had more time, I would have loved to make the error messages more stylized, or maybe add a light, not-too-obtrusive red box around any invalid field.

In regards to interaction design, I wanted to make sure my design was fully responsive. Therefore, on the smaller breakpoints, the expiration month and year text fields end up being on top of each other instead of next to each other. The credit card image is also responsive, and is hosted on Cloudinary to optimize browser loading time. If I were to iterate on the given wireframe, I would have made the CVV2 field much smaller, since it is only a 3-4 digit field, and I would have likely put it on the same line as the expiration month and year. I also would have added a little information icon next to the CVV2 field to explain to the user what that is, because users sometimes don't know what that is, and I've seen that convention on other ecommerce sites as well.
