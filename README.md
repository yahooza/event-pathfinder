Event Pathfinder (event-pathfinder)
============

Given a set of events, find and log the full path (relative to the body) of the target.


##Bookmarklet##
If you want to inspect any website, add this Bookmark (Tested only w/ the latest versions of Firefox and Chrome):
```
javascript:%20(function%20()%20%7B%20var%20s%20%3D%20document.createElement('script')%3B%20s.setAttribute('src'%2C%20'https%3A%2F%2Fraw.github.com%2Fyahooza%2Fevent-pathfinder%2Fmaster%2Fjs%2Fevent-pathfinder.js')%3Bdocument.body.appendChild(s)%3B%20%7D())%3B
```

Open up your Firebug console or Chrome Developer Tools to view the log. Every DOM element click event will generate a log entry. CLICK AWAY!
