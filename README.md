# 🚀 Digital Culture Manager

## 📦 Installation

Clone the repository and install the dependencies:

    git clone https://github.com/Nicolas14200/DCM.git



## 🏃‍♂️ Execution

To init the application:
`cd DCM`
`make setup`

## 🧪 Testing

To run the tests:

`make test`

## 🐳 Db

Build and execute mongoDb using Docker:

`make mongo-start`
`make mongo-kill`

## 🏛️ Architecture

This program adheres as closely as possible to the principles of clean architecture. It is composed of three main layers:

- **domain**: The heart of the application containing the business logic. This layer includes entities, use-cases, and interfaces.
- **adapter**: This layer integrates all external tools, independent from the application, such as databases and service providers. A mapper for standardizing raw data input is also present.
- **app**: Acts as a bridge between the core and the adapters.CLI and the implementation of use-cases by the adapters are defined here.


## 🧐 Testing Details

The program's layers are tested with Jest. You will find:

- Unit Tests in the domain.
- Integration Tests in the adapter.

## 🔚 Conclusion

The program is structured for easy maintenance and scalability. 
For potential improvment, add end to end tests for the CLI.
