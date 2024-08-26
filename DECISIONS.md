## Approach

1. Add all the types from the API documentation. Ideally these interfaces would be auto 
generated from a .yaml file using something like `openapi-generator`. Additionally, the 
API endpoints could be auto generated from the `.yaml` file to create "API Services" and
guarantee contracts are in sync between the front and backend anytime either side makes a change. 
2. Set up the websocket connection. To start, created a singleton service called `connection.service.ts`
and tested a simple hard coded implementation to verify connection to the backend services.
3. Set up API endpoints. Since we mostly using websockets here, there was not a lot to set up so pretty
straightforward. 
4. At this point, I have to decided what my application structure is going to look like. In a real
world scenario, I would add Nx. I would then create libs following Nx's recommended library structure. So
for example, something along the lines of:
    ```
        libs/
            live-feed/
                feature/
                data-access/
                ui/
                utils/
    ```
    I would follow this for each feature of the application, keeping reusability across applications in mind for the future. For this implementation, I went with a more straightforward approach of `core`, `features`, and `shared` which I think is a nice balance. Core contains the singleton services that can be used across the application. Features holds the state services, and the smart / presentational components where the state services hosts the state and contains the business logic, the presentational components contains the UI logic, and the smart components connect the two. 
5.  Once I have the application structure decided, it's just a matter of building out the features, making sure to keep in mind best practices for Angular and RxJS. 
    1. Things to note: I would typically implement loaders into the state but the connection here during local development was so quick it really just made elements flicker and did not provide any real value. I've kept a customer RxJS operator in utils to show how I would easily add them in the future if needed. 
    2. I would love to break apart `GamesService`. I don't necessarily love how large it is and how it has to init listeners so it can update it's state. I would probably move this up a level to core. 