# Travel Guide

## Overview

We want to build a web app to manage and share POI using google map.

## Functional requirements

### Authentication and authorization

The application can only be accessed by authenticated users. 
There are two type of users that are recognized by the system: normal users and admin users.

In order to use the application a user has to authenticate using an email address and the password.

### Users management (Admin only)

The users are created in the application by an ‘admin user’ providing the following information:  
- First Name
- Last Name
- Email address
- User Type (admin - normal)
- Password

The admin should be able to create/edit/delete and view the list of users. 
Additionally, the admin should be able to set a normal user as an admin user.

### Location management (Admin only)

The locations are created in the application by an ‘admin user’ providing the following information:
- Name
- Tags (Hike, Historical, View, Experience, Food)
- Description
- Picture(s) - one of them should be used as caption/thumbnail

The admin should be able to create/edit/delete and view the list of locations.

### Location overview 

#### Display Locations on Map 
Show full screen the Google map centered on the current location and load all the POIs in the boundaries of the current view.

#### Display Location in a list
Show a paginated list with all the locations loaded in the current view. This must be kept in sync with what is loaded on the map.
For each loaction display the basic information: Title, Caption picture, Tags.
The list should be presented in a toggle panel on the left side of the map.

#### Display Location details
Display a popup with all the details of a location by double clicking on a POI on the map or on the item in the left side location list.
In the details display the caption picture, title, description, tags and a list with all the other pictures.

#### Search locations
In the displayed locations (list and map) there should be a possibility to filter the result by a text, or by tags

#### Highlight Location on map
The user should be able to select am item in the list or on the map. 
The selected item should be reflected on the map and in the list at the same time.  

#### Navigate to location

For a selected item a button should appear that will allow the user to navigate to the selected destination using Google Maps

## Technical details
- C# .net 5  
- react 
- google map 
- SQL Server
- linux hosting 

