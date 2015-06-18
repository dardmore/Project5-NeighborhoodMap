# Neighborhood Map

# Project Overview
You will develop a single page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add additional functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

# Why this Project?
The neighborhood tour application is complex enough and incorporates a variety of data points that it can easily become unwieldy to manage. There are a number of frameworks, libraries and APIs available to make this process more manageable and many employers are looking for specific skills in using these packages.

# What will I Learn?
You will learn how design patterns assist in developing a manageable codebase. You’ll then explore how frameworks can decrease the time required developing an application and provide a number of utilities for you to use. Finally, you’ll implement third-party APIs that provide valuable data sets that can improve the quality of your application.

# How does this help my Career?
Interacting with API servers is the primary function of Front-End Web Developers 
Use of third-party libraries and APIs is a standard and acceptable practice that is encouraged 

# How will I complete this Project?
1. Review our course JavaScript Design Patterns. 
2. Download the Knockout framework. 
3. Write code required to add a full-screen map to your page using the Google Maps API. 
4. Write code required to add map markers identifying a number of locations your are interested in within this neighborhood. 
5. Implement the search bar functionality to search and filter your map markers. There should be a filtering function on markers that already show up. Simply providing a search function through a third-party API is not enough. 
6. Implement a list view of the identified locations. 
7. Add additional functionality using third-party APIs when a map marker, search result, or list view entry is clicked (ex. Yelp reviews, Wikipedia, Flickr images, etc). If you need a refresher on making AJAX requests to third-party servers, check out our Intro to AJAX course. 


NOTES:
> The code is started by opening Project5.html.  On load, a map of Niagara Falls will be shown with data points on the map, a list of the data points to the side of the map and a search bar.

Each of the map markers is clickable and when clicked will display a map info window the name of the location and any wikipedia link associated with that name.

The list of location is also clickable and when clicked will open the associated map marker info window.  To indicate that these are clickable, the list of locations are highlighted and the mouse pointer is changed when the mouse hovers over that specific location name in the list.

The search bar is used by typing any text string.  This string will then be matched with the location names in the list.  Any location that does not match the typed text string will be hidden from the user so only relevant location names are displayed to the user.


Future Improvements:
> Only wikipedia was used for additional information about the different locations.  Some locations did not match any wikipedia links and therefore it would be useful if there was another data source (such as YELP) to provide information about that site.


Resources Used:
Udacity User Forum
knockoutjs.com
jQuery.com
developers.google.com (for Google Maps)
w3schools.com
stackoverflow.com
kilianvalkhof.com/2010/javascript/how-to-build-a-fast-simple-list-filter-with-jquery/
