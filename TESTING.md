INTEGRATION TESTS (part 4):
- Refresh test: refreshed and the page reloaded correctly

- Edit test: clicked an existing card, changed its name, and saved.  The card updates in its place and does not duplicate or break.

- Status change test: opened a task in "In Progress", changed its status to "Won't do", and saved.  It effects the changes made without breaking.

- Delete + empty column test: deleted every task in one column. "Nothing here yet" shows up.

- Cancel test: opened a task, changed the name and clicked the x button instead of save.  The task stays unchanged.

- Rapid actions: added a task, deleted it and added another one.  There were no duplicates or errors.

- Corrupted storage test: in the DevTools console, typed "localStorage.setItem("tasks", "bad json{{{", then localStorage.getItem("tasks") and refreshed the page, to simulate breaking the data, but it was handled by "part1.js"'s try/catch block. 