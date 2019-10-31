# SampleProject

Github profile list project is made with github api and angular. Make sure there is node.js in your computer and run "npm install" before you compile the project. "ng serve" will be enough to make this project work. There is something different, while typing in the seach box, results will be seen real-time. Because of that, if there is added user to favourite, there will not be unfollow button. 

In search side there is a window alert if there is the user which is added before instead of unfollow button. This situation is first problem of project. But it because of long search for loops in the project so this code part is deleted from project. The second problem is about github api. Requesting too many times at the same time is not allowed by git. So there can be an error about loading results. Every words starting a search so there are too many requests to git. The response is these error results is "forbidden request".
