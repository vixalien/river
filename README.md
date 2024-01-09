# river

A simple photo stream web app that fetches photos from [VSCO]. Hugely inspired
and based on [photo-stream].

### Setup

Before setting up the project, you'll need to create a `.env` file in the root
directory. This file should contain the configuration for the project. The
default options are set in `.env.defaults` and you should overwrite options as
necessary.

```ini
TITLE=My photo stream

# these options are *required* and should probably be kept secret
API_TOKEN=a-vsco-api-token
USER_ID=your-vsco-user-id
```

Using a user ID helps to avoid resolving the user ID from the username every
time.

To get your VSCO user ID, you can run the following command **after** you've set
your API token:

```sh
deno task get-id your-username
```

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Contributing

river is available under the MIT license. See the [LICENCE] file for more info.
Pull requests are welcome! If you have a feature request, please open an issue.

[vsco]: https://vsco.co
[photo-stream]: https://github.com/waschinski/photo-stream
[licence]: ./LICENCE
