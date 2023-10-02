# event_notifier

a simple cli tool that notifies me about upcoming events.

## the problem I'm solving

I want to get notified about future one off events
and recurring events like friends and families birthdays.

I want a simple cli tool and JSON file to represent these
events. I will simply modify the JSON file directly to add new
events.

When I log into my computer this cli tool will be launched via
.bashrc creating notifications with `node-notifier`.

## how it works.

* install via github
* cd ./event_notifier && npm i && sudo npm link
* edit your `events.json` with your actual data
* update your ./.bashrc with `(sleep 180 && event_notifier) &`

upon logging in you should see notifications for:

* events that are happening today
* upcoming events in exactly 7 days
* all upcoming events in the next 30 days.

## disclaimer

* only designed and test for debian linux systems
