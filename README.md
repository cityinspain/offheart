# offheart

<b>off</b>ice <b>heart</b>beat

my office has had an unreliable internet connection, so i threw this together.

a client makes a POST request to the API with its current download/upload speed, which is then logged on the server and displayed on the frontend.

while this seems to work fine, this is obviously a fairly primitive version, and there's a lot of room for improvement.

## to do
- [ ] use an actual database rather than writing directly to a file.
- [ ] include some form of pre-shared key or device identifier to differentiate clients.
- [ ] improve the frontend.
- [ ] dockerize, probably?
- [ ] create a client side tool to perform the heartbeat, rather than using cron.
- [ ] ???
