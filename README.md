# Week-Long-Puzzle

## Seciont 1: Project Description

A web and email-based puzzle game that has users interfacing with various services available in AWS. Users will be required to subscribe to the program with their email at no cost in order to receive notifications about the next steps to the puzzle after the initial step’s completion. Each day, the user will be given a puzzle that increases in complexity that will require them to investigate various pieces of information given to them such as elements on a web-page, figuring out how to directly connect to a publicly hosted server for more information, understanding how to search for ciphers and where to recognize when are where to use them, and various other techniques.

### Revision History
|Date|Comment|Author|
|--|--|--|

## Section 2: Overview
### 2.1 Purpose
* Teach people various bits of information about ciphers, inspecting web pages, file handling, and other miscellaneous information related to interfacing with resources online
* Teaching is done through puzzles that progressively grow in complexity as they are completed
* The puzzles will be paced with each one given a day after the previous one has been completed in order to not overwhelm users with the amount of information that is immediately available with each step
### 2.2 Scope
* Information hosted on a website running on AWS servers
* Teaching how to, then requiring the user to search for resources online
* Emails will be given in order to give users the next step in progressing the puzzle
  * This requires users to subscribe to the email message service
* Potentially the ability to progress through each step on their own without receiving the email
  * Allows them to press a button to not receive the upcoming email
### 2.3 Requirements
- Feature 1: Website hosted through AWS
- Feature 2: Emails sent for the duration of only one week
- Feature 3: Pages that can be navigated to, each with information on how to interface with the puzzle
- Feature 4: Hidden components on the web page that are components of puzzles
- Feature 5: A total of Seven puzzles for each day, each puzzle may take multiple steps
- Feature 6: Tracking user progress on puzzles in order to trigger emails being sent
- Feature 7: Unsubscribing from emails

#### 2.3.1 Functional Requirements
1) Users are capable of signing up for the service with an email, password, and name to be referred as
2) Reading user input through buttons and text fields
3) Web page caches user information to load which page needs to be loaded at any given time for the puzzle
4) Hidden information on the web page for the sake of the puzzle to be found when the user inspects the page

#### 2.3.2 Non-Functional Requirements
1) The system is capable of almost instantly sending messages between the website and the server when prompts are sent
2) Any user-inputs are controlled to prevent potential errors

#### 2.3.3 Technical Requirements
* AWS services
* Others unknown for the moment

#### 2.3.4 Secutirty Requirements
* AWS services
* Web page only pulls information from the logged in user
* User input cannot be read as executable code

#### 2.3.5 Estimates
|# |Description|Hrs. Est.|
|--|--|--|
|1|Create html web page|5|

#### 2.3.6 Traceability Matrix
|SRS Requirement| SDD Module|
|--|--|

## Section 3: System Architecture
### 3.1 Overview
1. AWS EC2 services hosts the website
   a. Website created through java/html
   b. Visuals created with various tools
     i. GIMP
     ii. Blender     
2. User provides email, password, and desired name to the website
   a. This information is sent to the AWS server and processed through the S3 bucket
   b. SNS services are registered to the user email
   c. The user must subcribe to the SNS service
3. User is capable of accessing website functions
   a. Text field user input

### 3.2 Architectural Diagrams

![One Week Puzzle Diagrams](https://github.com/user-attachments/assets/a97fa3a5-86f7-4f70-817d-92bd70ec083e)

## Section 4: Data Dictionary
### User Data
|Field|Notes|Type|
|--|--|--|
|ID|Unique identifier of users that have joined the service|Int|
|Name|The name provided by the user, to be used in the email|String|
|Email|The destination that emails will be sent to|String|
|Progress|Shows which step the user has completed when loading the web page|Int|


## Section 5: Data Design
### 5.1 Persistent/Static Data
* User Data
#### 5.1.1 Dataset
a) User
- Attributes: ID, Name, Email, Progress
- Relationships: Singular point of interest of app

## Section 6: User Interface Design
### 6.1 User Interface Design Overview
![User Interface Mockup](https://github.com/user-attachments/assets/f230aa32-ee2d-4c35-bf48-8a7c019d7828)

### 6.2 User Interface Navigation Flow

### 6.3 Use Cases
