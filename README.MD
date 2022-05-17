## About the project
An API where registered user can post new jobs and manage how the jobs recruitment flows. User can create, update, delete, and view jobs with  the API token assigned to the user. Unregistered users can search for available jobs and view the jobs details.


## models and database
    
 1. Api contains a user model which stores the details of each job owner or job provider, this model has field like:
    * username  ,
    * email(unique) and
    * password

 2. Api contains a job model which defines the structure of each job details like:
    * job title
    * job description
    * company
    * job status
    * job type (remote, hybrid, or onsite)
    * use timestamp to add createdAt and updatedAt
    * a field for storing the user id who created the job

## security packages
 * helmet
 * core
 * xss-clean
 * express-rate-limiter

 ## extra packaged 
  * jwt for api token
  * bycriptjs for hashing user password
  * http-status-codes for constant http status codes 
  * Mongoonese for database interaction
  * express-swagger-ui for serving api docs UI
  * yamljs for working with yaml files exclusively used for the api docs in this project


## controllers
 * auth.js for handling registration and login
 * job.js for handling different job query logic
 * searchJob.js controller for job seekers who want to look for available jobs

## middlewares 
 * notFound.js for unresolved route
 * errorHandler.js for handling different error occurence in the server
 * authMiddleware.js for authenticating users before having access to job route 

## errro classes
   * customApiError
   * AuthenticationError (sub class of customApiError for handling api authentication related issues )
   * BadRequest(sub class of customApiError for handling api bad request related issues )
   * NotFound (sub class of customApiError for handling api unresolved resource or unknown related issues )

## routers 
 * job.js for handling routes for job query logics
 * auth.js for handling routes related to user management
 * searchJob.js for handling routes related to job searchers requests

        

## Built with

  * Nodejs
  * javascript 
  * express js
  * MongoDb
  * Mongoonese


## Usage

  [docs] <>   

## Contact

   [Email] <yusuforiade1616@gmail.com> 
   [twitter] <https://twitter.com/oye_sholatel>
   [linkedin] <https://www.linkedin.com/in/yusuf-sholadoye-7468081a3/>
 
