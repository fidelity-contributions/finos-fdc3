# FDC3 1.2 Conformance Test Cases

## 1. System / User Channels 

### User Channels Broadcast (Basic)

| App | Step               | Details                                                                                                                                                        |
|-----|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A   | addContextListener |Call `fdc3.addContextListener(null, handler)`<br>Check listener object returned<br>Check that there is an `unsubscribe` function on the returned object  |
| A   | joinChannel        |`fdc3.getSystemChannels()`<br>Check channels are returned.<br>Call `fdc3.joinChannel()` on first non-global channel                                      |
| B   | joinChannel        | `fdc3.getSystemChannels()`<br>Check channels are returned.<br>Call `fdc3.joinChannel()` on first non-global channel                                      |
| B   | Broadcast          | `fdc3.broadcast(<some instrument>)`                                                                                                                          |
| A   | Receive Context    | Instrument object matches the one broadcast in 2 above.                                                                                                    |

-  `UC Basic Usage 1` Perform above test 
-  `UC Basic Usage 2` Perform above test, but join channel first and then `fdc3.addContextListener()`
-  `UC Basic Usage 3` Do the app B steps first to populate the channel with context, check that A will receive the context after joining
-  `UC Basic Usage 4` Do the app B steps first but in reverse order to populate the channel with context, check that A will receive the context after joining

### User Channels Broadcast (Filtered Context)

| App | Step               | Details                                                                                                                                                              |
|-----|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A   | addContextListener | Call `fdc3.addContextListener("fdc3.instrument", handler)`<br>Check listener object returned<br>Check that there is an `unsubscribe` function on the returned object |
| A   | joinChannel        | `fdc3.getSystemChannels()`<br>Check channels are returned.<br>Call `fdc3.joinChannel()` on first non-global channel                                                  |
| B   | joinChannel        | `fdc3.getSystemChannels()`<br>Check channels are returned.<br>Call `fdc3.joinChannel()` on first non-global channel                                                  |
| B   | Broadcast          | `fdc3.broadcast()` the instrument context.<br>`fdc3.broadcast()` a contact context.                                                                                  |
| A   | Receive Context    | Instrument object matches the one broadcast in 2 above.<br>Check that the contact is not received.                                                                   |

-  `UC Filtered Context 1`: Perform above test 

| App | Step               | Details                                                                                                                                                              |
|-----|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A   | addContextListener | Call `addContextListener (“fdc3.instrument”, handler)`<br>Check listener object returned<br>Check that there is an unsubscribe function on the returned object<br>Call `addContextListener (“fdc3.contact”, handler)`<br>Check listener object returned<br>Check that there is an unsubscribe function on the returned object                                                                                                                                                                                   |
| A   | joinChannel        | Check that there is an unsubscribe function on the returned object                                                                                                                                                                                                                                                                                |
| B   | joinChannel        | `fdc3.getSystemChannels()`<br>Check channels are returned.<br>Call `fdc3.joinChannel()` on first non-global channel                                                                                                                                                                                                                               |
| B   | Broadcast          | `fdc3.broadcast()` the instrument context.<br>`fdc3.broadcast()` a contact context.                                                                                                                                                                                                                                                               |
| A   | Receive Context    | Instrument object matches the one broadcast in 2 above.<br>Contact object matches the one broadcast in 2 above.                                                                                                                                                                                                                                   |

-  `UC Filtered Context 2`: Perform above test
-  `UC Filtered Context 3`: Perform above test, except joining a _different_ channel. Check that you _don't_ receive anything.
-  `UC Unsubscribe`: Perform above test, except that after joining, **A** then `unsubscribe()`s the channel. Check that **A** _doesn't_ receive anything.
-  `UC Filtered Context 4`: Perform above test, except that after joining, **A** changes channel with a further _different_ channel.  Check that **A** _doesn't_ receive anything.
-  `UC Filtered Context 5`: Perform above test, except that after joining, **A** calls `fdc3.leaveChannel()` and doesn't receive anything.
-  `UC Invalid Broadcast 1` (1.2 ONLY): Broadcast is sent either without type field / invalid object structure.  NOT DELIVERED, no other errors.
-  `UC Invalid Broadcast 2` (2.0 ONLY): Broadcast is sent either without type field / invalid object structure.  NOT DELIVERED, promise is rejected.
-  `UC Current Channel`: A call to `fdc3.getCurrentChannel()` returns _null_ if called prior to any `joinChannel`.

## 2. App Channels 

### App Channels Broadcast (Basic)

| App | Step               | Details                                                                                                                                                        |
|-----|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A   | joinChannel        |`fdc3.getOrCreateChannel("test-channel")`       |
| A   | addContextListener |Call `testChannel.addContextListener(null, handler)`<br>Check listener object returned<br>Check that there is an `unsubscribe` function on the returned object  |
| B   | joinChannel        | `fdc3. getOrCreateChannel("test-channel")`   |
| B   | Broadcast          | `testChannel.broadcast(<some instrument>)`   |
| A   | Receive Context    | Instrument object matches the one broadcast in 2 above.      |

-  `AC Basic Usage 1` Perform above test 
-  `AC Basic Usage 2` Perform above test, but join channel first and then `testChannel.addContextListener()`
-  `AC Basic Usage 3` Do the app B steps first but in reverse order to populate the channel with context, check that A will receive the context after joining

### App Channels Broadcast (Filtered Context)

| App | Step               | Details                                                                                                                                                              |
|-----|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A   | joinChannel        |`fdc3.getOrCreateChannel("test-channel")`       |
| A   | addContextListener | Call `testChannel.addContextListener("fdc3.instrument", handler)`<br>Check listener object returned<br>Check that there is an `unsubscribe` function on the returned object |
| B   | joinChannel        | `fdc3. getOrCreateChannel("test-channel")`   |
| B   | Broadcast          | `testChannel.broadcast()` the instrument context.<br>`testChannel.broadcast()` a contact context. |
| A   | Receive Context    | Instrument object matches the one broadcast in 2 above.<br>Check that the contact is not received.                                                                   |

-  `AC Filtered Context 1`: Perform above test 

-  `AC Filtered Context 2`: Perform above test, except joining a _different_ channel. Check that you _don't_ receive anything.
-  `AC Unsubscribe`: Perform above test, except that after joining, **A** then `unsubscribe()`s the channel. Check that **A** _doesn't_ receive anything.
-  `AC Filtered Context 3`: Perform above test, except that after joining, **A** changes channel with a further _different_ channel.  Check that **A** _doesn't_ receive anything.
-  `AC Filtered Context 4`: Perform above test, except that after joining, **A** calls `fdc3.leaveChannel()` and doesn't receive anything.
-  `AC Invalid Broadcast 1` (1.2 ONLY): Broadcast is sent either without type field / invalid object structure.  NOT DELIVERED, no other errors.
-  `AC Invalid Broadcast 2` (2.0 ONLY): Broadcast is sent either without type field / invalid object structure.  NOT DELIVERED, promise is rejected.

### App Channel History

| App | Step               | Details                                                                                                                                                              |
|-----|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A   | joinChannel        |`fdc3.getOrCreateChannel("test-channel")`       |
| B   | joinChannel        | `fdc3. getOrCreateChannel("test-channel")`   |
| B   | Broadcast          | `testChannel.broadcast()` the instrument context.<br>`testChannel.broadcast()` a contact context. |
| A   | Receive Context    | `testChannel.getCurrentContext('fdc.instrument')` returns the last instrument<br>testChannel.getCurrentContext('fdc.contact')` returns the last broadcast contact                                                              |

-  `AC Context History Typed`: Perform above test.
-  `AC Context History Multiple`: **B** Broadcasts multiple history items of both types.  Only the last version of each type is received by **A**.
-  `AC Context History Last`: **A** calls `testChannel.getCurrentContext()` retrieves the last broadcast context item

## 3. Open API 

### A Opens B

- `AOpensB1`:  **A** calls `fdc3.open(‘app B Name’)`, check app **B** opens
- `AOpensB2`:  **A** calls `fdc3.open({name: “<app B Name>”})`, check app **B** opens
- `AOpensB3`:  **A** calls `fdc3.open({name: “<app B Name>”, appId: “<app B ID”})`, check app **B** opens

### A Fails To Open B

- `AFailsToOpenB1-3`:  Run the above 4 tests again with a non-existent app name/app id.  Should return “App Not Found” Error from https://fdc3.finos.org/docs/api/ref/Errors#openerror

### A Opens B With Context

| App | Step            | Description                                              |
|-----|-----------------|----------------------------------------------------------|
| A   | Opening App     | various open methods as in `AOpensB1-3` except with a `<context>` argument of type `fdc3.testReceiver` <br>check app opens    |
| B   | Context present | `fdc3.addContextListener()`<br>- receives `<context>` from **A** |

-  `AOpensBWithContext1-3`: Perform above tests
-  `AOpensBWithSpecificContext`: Perform above but replace **B**s call with `fdc3.addContextListener('fdc3.testReceiver`)`


### Specific Context


| App | Step            | Description                                                                                                                   |
|-----|-----------------|-------------------------------------------------------------------------------------------------------------------------------|
| A   | Opening App     | `fdc3.open(‘app Name’, <contact context>)` <br>check app opens                                                                |
| B   | Context present | fdc3.addContextListener()<br>- receives <context> from A                                                                      |
| A   | Promise         | - receives a rejection from the open promise with “App Timeout’ from <br>https://fdc3.finos.org/docs/api/ref/Errors#openerror |

-  `AOpensBWithWrongContext`: As above
-  `AOpensBNoListen`: Skip `fdc3.addContextListener() above. 
-  `AOpensBMultipleListen`:  **B** performs `fdc3.addContextListener('fdc3.instrument') prior to the existing `addContextListener`.  The correct context listener should receive the context, and the promise completes successfully
-  `AOpensBMalformedContext`: **A** tries to pass malformed context to **B**.  Context listener receives nothing, promise completes successfully.



## 4. Intents

### Setup

You will need to pre-populate the AppDirectory with the following items:

| App | Required Metadata                                                                                                                                    |
|-----|------------------------------------------------------------------------------------------------------------------------------------------------------|
| A   | A’s AppD Record contains: `aTestingIntent` (with context type `testContextX`, `testContextZ`) and `sharedTestingIntent1` (with context type `testContextX`)    |
| B   | B’s AppD Record contains `bTestingIntent` (with context type `testContextY`) and `sharedTestingIntent1` (with context types `testContextX` and `testContextY`) |
| C   | C’s AppD Record contains `cTestingIntent` (with context type `testContextX`)                                                                             |

Also we assume a fourth app **D** that is going to discover the intents in the other 3.

### Find Intent From AppD

-  `IntentAppD`: Calls `fdc3.findIntent(‘aTestingIntent’)`.  Receives promise containing an appIntent with metadata containing `aTestingIntent` and only **A** app metadata.
-  `WrongIntentAppD`: Calls `fdc3.findIntent(‘nonExistentIntent’)`. Rejects with no apps found error https://fdc3.finos.org/docs/api/ref/Errors#resolveerror
-  `IntentAppDRightContext`: Calls `fdc3.findIntent(‘aTestingIntent’, ‘fdc3.testContextX’)`.  Receives promise containing an appIntent with metadata containing `aTestingIntent` and only **A** app metadata.
-  `IntentAppDWrongContext`: Calls `fdc3.findIntent(‘aTestingIntent’, ‘fdc3.testContextY’)`.  Rejects with no apps found error https://fdc3.finos.org/docs/api/ref/Errors#resolveerror
-  `IntentAppDMultiple1`: Calls `fdc3.findIntent(‘sharedTestingIntent1’)`.  Receives promise containing an appIntent with metadata containing `sharedTestingIntent` and only **A** and **B** app metadata.
-  `IntentAppDMultiple2`: Calls `fdc3.findIntent(‘sharedTestingIntent1’, 'testContextX`)`.  Receives promise containing an appIntent with metadata containing `sharedTestingIntent` and only **A** and **B** app metadata.
-  `IntentAppDMultiple3`: Calls `fdc3.findIntent(‘sharedTestingIntent1’, 'testContextY`)`.  Receives promise containing an appIntent with metadata containing `sharedTestingIntent` and only **B** app metadata.

### Find Intents By Context

-  `SingleContext`: Call `fdc3.findIntentsByContext(‘fdc3.testContextX’)`.  Should return `aTestingIntent` (app **A**), `sharedTestingIntent` (**A**, **B**) and `cTestingIntent` (**C**) AND nothing else.
-  `NoContext`: Call `fdc3.findIntentsByContext()`. Throws error of some kind?

### Raise Intent

| App | Step           | Details                                                                                           |
|-----|----------------|---------------------------------------------------------------------------------------------------|
| D   | Raise          | `fdc3.raiseIntent(‘sharedTestingIntent1’, {testContextY})`<br>starts app B.                       |
| B   | Gather Context | `fdc.addIntentListener(‘sharedTestingIntent1’)`<br>Receives testContextY, matching that sent by D |

-  `SingleResolve1`: Perform above test
-  `TargetedResolve1`: Use `fdc3.raiseIntent(‘aTestingIntent’, {testContextX}, <A’s App Name>)` to start app A, otherwise, as above
-  `TargetedResolve2,3,4` Use the other ways of addressing apps (via ID, metadata) as described at the start of #18 
-  `FailedResolve1-4` As above, but use `fdc3.raiseIntent(‘aTestingIntent’, {testContextY}, <A’s App Name>)` and variations.  You will receive No Apps Available Resolve Error
-  `FailedResolve5-8` As above, but use `fdc3.raiseIntent(‘aTestingIntent’, {testContextX}, <C’s App Name>)` and variations.  You will receive No Apps Available Resolve Error