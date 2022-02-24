# FPT-Sample Project

FPT - For Public Transport, Trial Web Application Project (html + css + javascript + meteor js + mongodb + twilio)

This Application is mainly designed to provide driver and taxi details,search functionality, ratings and availability information directly to users.

Project APK:

Home Page View:

!["Home Page View Image"](/Screenshots/Homepage_view.png)

Search Result modal form:

!["Search Result modal form"](/Screenshots/Search_result_modal_form.png)

User need to only share contact number to view detailed info not register it: 

!["User contact sharing view"](/Screenshots/Screenshot_(342).png)

Main Page (user) view:

!["Main Page (user) view"](/Screenshots/Mainpage(user)_view.png)

Business page register form view:

!["Business page register form view"](/Screenshots/Business_register_form.png)
  
Business client login:

!["Business client login"](/Screenshots/Business_Login_Modal_Form.png)

Main page (Buisness client) view:

!["Main page (Buisness client) view"](/Screenshots/Mainpage_(Business_client)_view.png)

Database:

Meteor Mongo database 

- User Table => {_id, phone, lastVisited}

!["User Table"](/Screenshots/User_table.png)

- Driver Table => {_id, name, phone, location, license, email, password, charges, rating, createdAt}

!["Driver Table"](/Screenshots/Driver_table.png)

- Taxi Table => {_id, name, phone, location, taxiNo, taxiModel, email, password, charges, rating, createdAt}

!["Taxi Table"](/Screenshots/Taxi_table.png)

- Available Table => {_id, driverAvailable, taxiAvailable, lastEdited}

!["Available Table"](/Screenshots/Availability_table.png)
